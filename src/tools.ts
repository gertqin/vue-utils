import * as vscode from "vscode";
import * as fs from "fs";

export function selectFile(filePath: string) {
  if (!fileExists(filePath)) {
    vscode.window.showInformationMessage(`File does not exist: ${filePath}`);
    return false;
  }

  const file = vscode.Uri.file(filePath);
  vscode.workspace.openTextDocument(file).then((doc: any) => {
    vscode.window.showTextDocument(doc);
  });
  return true;
}

export function fileExists(path: string) {
  return fs.existsSync(path);
}
