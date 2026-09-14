import * as vscode from "vscode";
import {
  getDevSketchWebviewHtml,
  getWebviewDistUri,
} from "../webview/webviewHtml";

export class DevSketchEditorPanel implements vscode.Disposable {
  private static readonly panels = new Map<string, DevSketchEditorPanel>();
  private static nextBoardNumber = 1;

  private readonly panel: vscode.WebviewPanel;
  private readonly boardId: string;
  private readonly disposables: vscode.Disposable[] = [];

  public static createNew(
    context: vscode.ExtensionContext,
    outputChannel: vscode.OutputChannel
  ): void {
    const boardNumber = DevSketchEditorPanel.nextBoardNumber++;
    const boardId = `board-${boardNumber}`;

    const panel = vscode.window.createWebviewPanel(
      "devSketchBoard",
      `DevSketch Whiteboard ${boardNumber}`,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [getWebviewDistUri(context.extensionUri)],
      }
    );

    const boardPanel = new DevSketchEditorPanel(
      panel,
      boardId,
      context.extensionUri,
      outputChannel
    );

    DevSketchEditorPanel.panels.set(boardId, boardPanel);
    outputChannel.appendLine(
      `[DevSketch] Created ${boardId}. Open panels: ${DevSketchEditorPanel.panels.size}.`
    );
  }

  private constructor(
    panel: vscode.WebviewPanel,
    boardId: string,
    private readonly extensionUri: vscode.Uri,
    private readonly outputChannel: vscode.OutputChannel
  ) {
    this.panel = panel;
    this.boardId = boardId;
    this.setWebviewHtml();

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    this.panel.onDidChangeViewState(
      ({ webviewPanel }) => {
        this.outputChannel.appendLine(
          `[DevSketch] ${this.boardId} active: ${webviewPanel.active}, visible: ${webviewPanel.visible}.`
        );
      },
      null,
      this.disposables
    );
  }

  public dispose(): void {
    DevSketchEditorPanel.panels.delete(this.boardId);

    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      disposable?.dispose();
    }

    this.outputChannel.appendLine(
      `[DevSketch] ${this.boardId} disposed. Open panels: ${DevSketchEditorPanel.panels.size}.`
    );
  }

  private setWebviewHtml(): void {
    this.panel.webview.html = getDevSketchWebviewHtml({
      extensionUri: this.extensionUri,
      webview: this.panel.webview,
      surface: "editor",
    });

    this.outputChannel.appendLine(`[DevSketch] ${this.boardId} HTML loaded.`);
  }
}
