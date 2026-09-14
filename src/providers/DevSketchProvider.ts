import * as vscode from "vscode";
import {
  getDevSketchWebviewHtml,
  getWebviewDistUri,
} from "../webview/webviewHtml";

export class DevSketchProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = "devsketch.sidebar";

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly outputChannel: vscode.OutputChannel,
    private readonly openBoard: () => void
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView
  ): void {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      enableCommandUris: true,
      localResourceRoots: [getWebviewDistUri(this.extensionUri)],
    };

    webview.html = getDevSketchWebviewHtml({
      extensionUri: this.extensionUri,
      webview,
      surface: "sidebar",
    });
    webview.onDidReceiveMessage(
      (message: { type?: string }) => {
        this.outputChannel.appendLine(
          `[DevSketch] Sidebar message received: ${JSON.stringify(message)}`
        );
        if (message.type === "openBoard") {
          this.outputChannel.appendLine("[DevSketch] Sidebar requested opening whiteboard.");
          this.openBoard();
        }
      },
      undefined
    );
    this.outputChannel.appendLine("[DevSketch] Sidebar webview resolved.");
  }
}
