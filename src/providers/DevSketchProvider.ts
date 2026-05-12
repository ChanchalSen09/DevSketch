import * as vscode from "vscode";

export class DevSketchProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = "devsketch.sidebar";

  constructor(
    private readonly extensionUri: vscode.Uri
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView
  ) {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(
          this.extensionUri,
          "webview",
          "dist"
        ),
      ],
    };

    const distPath = vscode.Uri.joinPath(
      this.extensionUri,
      "webview",
      "dist"
    );

    const indexPath = vscode.Uri.joinPath(
      distPath,
      "index.html"
    );

    webview.html = this.getHtml(
      webview,
      indexPath,
      distPath
    );
  }

  private getHtml(
    webview: vscode.Webview,
    indexPath: vscode.Uri,
    distPath: vscode.Uri
  ) {
    let html = require("fs").readFileSync(
      indexPath.fsPath,
      "utf-8"
    );

    html = html.replace(
      /(src|href)="([^"]+)"/g,
      (_: string, type: string, url: string) => {
        const assetPath = vscode.Uri.joinPath(
          distPath,
          url
        );

        const webviewUri =
          webview.asWebviewUri(assetPath);

        return `${type}="${webviewUri}"`;
      }
    );

    return html;
  }
}
