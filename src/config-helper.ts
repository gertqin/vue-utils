import * as vscode from "vscode";

export function getTsFileExtension() {
  const config = vscode.workspace.getConfiguration();
  return config.get<string>("vueUtils.tsFileExtension");
}

export function getVueTemplate(componentName: string) {
  const tsFileExtension = getTsFileExtension();
  const config = vscode.workspace.getConfiguration();
  const vueTemplate = config.get<string[]>("vueUtils.vueTemplate");

  return vueTemplate?.join("\n").replace("{COMPONENT}", componentName + tsFileExtension) || "";
}

export function getTsTemplate(componentName: string) {
  const config = vscode.workspace.getConfiguration();
  const tsTemplate = config.get<string[]>("vueUtils.tsTemplate");

  return tsTemplate?.join("\n").replace("{COMPONENT}", componentName) || "";
}
