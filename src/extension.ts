'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { switchFiles } from './switch-command';
import { createVueComponentFiles } from './create-command';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"vue-utils" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let switchCommand = vscode.commands.registerCommand('extension.switchBetweenVueAndTsFile', switchFiles);
    let createCommand = vscode.commands.registerCommand('extension.createVueComponent', async () => {
      await createVueComponentFiles();
    });
    let createFromExplorerCommand = vscode.commands.registerCommand('extension.createVueComponentFromExplorer', async (file: any) => {
      await createVueComponentFiles(file);
    });

    context.subscriptions.push(switchCommand);
    context.subscriptions.push(createCommand);
    context.subscriptions.push(createFromExplorerCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
