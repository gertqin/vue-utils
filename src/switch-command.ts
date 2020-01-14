import * as vscode from "vscode";
import { selectFile } from "./tools";
import { getTsFileExtension } from "./config-helper";

export function switchFiles() {
  const tsFileExtension = getTsFileExtension();
  if (!tsFileExtension) {
    vscode.window.showInformationMessage(`The setting vueUtils.tsFileExtension must be set.`);
    return false;
  }

  const activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor) {
    const fileName = activeTextEditor.document.fileName;
    if (fileName.endsWith(tsFileExtension)) {
      const vueFileName = fileName.substr(0, fileName.length - tsFileExtension.length) + ".vue";
      return selectFile(vueFileName);
    } else if (fileName.endsWith(".vue")) {
      return selectFile(fileName.substr(0, fileName.length - 4) + tsFileExtension);
    }
  }

  vscode.window.showInformationMessage(
    `This command only works with a .vue or ${tsFileExtension} file selected`
  );
  return false;
}
