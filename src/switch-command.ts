import * as vscode from 'vscode';

export function switchFiles() {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor) {
    const fileName = activeTextEditor.document.fileName;
    if (fileName.endsWith(".vue")) {
      selectFile(fileName + ".ts");
      return true;
    } else if (fileName.endsWith(".vue.ts")) {
      selectFile(fileName.substr(0, fileName.length - 3));
      return true;
    }
  } 

  vscode.window.showInformationMessage('This commands only works with a .vue or .vue.ts file selected');
  return false;
}

function selectFile(filePath: string) {
  var file = vscode.Uri.file(filePath);
  vscode.workspace.openTextDocument(file).then((doc: any) => {
    vscode.window.showTextDocument(doc);
  });
}