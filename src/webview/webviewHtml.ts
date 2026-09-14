import * as fs from "fs";
import * as vscode from "vscode";

export const WEBVIEW_DIST_SEGMENTS = ["webview", "dist"] as const;

export type DevSketchSurface = "sidebar" | "editor";

export interface DevSketchWebviewHtmlOptions {
  extensionUri: vscode.Uri;
  webview: vscode.Webview;
  surface: DevSketchSurface;
}

export function getWebviewDistUri(extensionUri: vscode.Uri): vscode.Uri {
  return vscode.Uri.joinPath(extensionUri, ...WEBVIEW_DIST_SEGMENTS);
}

export function getDevSketchWebviewHtml({
  extensionUri,
  webview,
  surface,
}: DevSketchWebviewHtmlOptions): string {
  const distUri = getWebviewDistUri(extensionUri);
  const indexUri = vscode.Uri.joinPath(distUri, "index.html");
  const rawHtml = fs.readFileSync(indexUri.fsPath, "utf-8");
  const webviewHtml = rewriteAssetUris(rawHtml, distUri, webview);
  const surfaceBootstrap = `<script>window.__DEVSKETCH_SURFACE__=${JSON.stringify(surface)};</script>`;

  if (webviewHtml.includes("<head>")) {
    return webviewHtml.replace("<head>", `<head>${surfaceBootstrap}`);
  }

  return `${surfaceBootstrap}${webviewHtml}`;
}

function rewriteAssetUris(
  html: string,
  distUri: vscode.Uri,
  webview: vscode.Webview
): string {
  return html.replace(/(src|href)="([^"]+)"/g, (_whole, attr: string, uri: string) => {
    if (isExternalOrSpecialUri(uri)) {
      return `${attr}="${uri}"`;
    }

    const assetUri = vscode.Uri.joinPath(distUri, uri);
    const webviewAssetUri = webview.asWebviewUri(assetUri);
    return `${attr}="${webviewAssetUri}"`;
  });
}

function isExternalOrSpecialUri(uri: string): boolean {
  return (
    uri.startsWith("http://") ||
    uri.startsWith("https://") ||
    uri.startsWith("command:") ||
    uri.startsWith("data:") ||
    uri.startsWith("#")
  );
}
