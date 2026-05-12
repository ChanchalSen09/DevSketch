import * as vscode from "vscode";
import { DevSketchProvider } from "./providers/DevSketchProvider";

export function activate(
  context: vscode.ExtensionContext
) {
  const provider = new DevSketchProvider(
    context.extensionUri
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      DevSketchProvider.viewType,
      provider
    ),
    vscode.commands.registerCommand(
      "devsketch.open",
      async () => {
        await vscode.commands.executeCommand(
          "workbench.view.extension.devsketch"
        );

        await vscode.commands.executeCommand(
          `${DevSketchProvider.viewType}.focus`
        );
      }
    )
  );
}

export function deactivate() {}
