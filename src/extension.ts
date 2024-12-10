import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.replaceIntWithInt64', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        if (editor.document.languageId !== 'cpp') {
            vscode.window.showErrorMessage('This extension only works with C++ files.');
            return;
        }
        const selection = editor.selection;

        if (selection.isEmpty) {
            vscode.window.showWarningMessage('Please highlight the replacement text.');
            return;
        }
        const text = editor.document.getText(selection);
        const updatedText = text.replace(/\bint\b/g, 'int64_t');

        await editor.edit((builder) => {
            builder.replace(selection, updatedText);
        });

        vscode.window.showInformationMessage('All int types have been replaced with int64_t in the highlighted area!');
    });

    context.subscriptions.push(disposable);
}


export function deactivate() {}
