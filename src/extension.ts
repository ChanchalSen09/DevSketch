import * as vscode from "vscode";
import { DevSketchProvider } from "./providers/DevSketchProvider";
import { DevSketchEditorPanel } from "./panels/DevSketchEditorPanel";

export function activate(
  context: vscode.ExtensionContext
) : void {
  const outputChannel = vscode.window.createOutputChannel("DevSketch");
  const openBoard = (): void => {
    outputChannel.appendLine("[DevSketch] Opening new whiteboard editor panel.");
    void vscode.window.showInformationMessage("DevSketch: Opening new whiteboard...");
    DevSketchEditorPanel.createNew(context, outputChannel);
  };
  const provider = new DevSketchProvider(
    context.extensionUri,
    outputChannel,
    openBoard
  );

  context.subscriptions.push(
    outputChannel,
    vscode.window.registerWebviewViewProvider(
      DevSketchProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "devsketch.openBoard",
      openBoard
    )
  );
}

export function deactivate() {}
