import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { selectFile, fileExists } from "./tools";
import { getVueTemplate, getTsFileExtension, getTsTemplate } from "./config-helper";

export async function createVueComponentFiles(file?: any) {
  let folderPath = "";
  if (file) {
    if (file.path) {
      folderPath = file.fsPath;
    } else {
      return;
    }
  } else if (vscode.window.activeTextEditor) {
    folderPath = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
  }
  folderPath = folderPath.replace(/\\/g, "/");
  vscode.window.showInformationMessage(folderPath);

  const componentName = await showComponentNameDialog();
  if (!componentName) {
    return;
  }

  const filePathBase = folderPath + "/" + componentName;

  const tsFilePath = filePathBase + getTsFileExtension();
  const tsFileSuccess = createFile(tsFilePath, getTsTemplate(componentName));

  const vueFilePath = filePathBase + ".vue";
  const vueFileSuccess = createFile(vueFilePath, getVueTemplate(componentName));

  if (tsFileSuccess) {
    selectFile(tsFilePath);
  } else if (vueFileSuccess) {
    selectFile(vueFilePath);
  }
}

async function showComponentNameDialog() {
  const question = "Component name";
  const defaultName = "MyComponent";
  const componentName = await vscode.window.showInputBox({
    prompt: question,
    value: defaultName
  });
  return componentName;
}

async function createFile(filePath: string, content: string = "") {
  const filename = filePath.substr(path.dirname(filePath).length + 1);
  if (fileExists(filePath)) {
    vscode.window.showInformationMessage(`The file ${filename} already exists`);
    return false;
  }

  return new Promise(resolve => {
    fs.appendFile(filePath, content, err => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
