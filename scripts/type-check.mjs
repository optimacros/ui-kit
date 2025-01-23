import ts from 'typescript';
import path from 'path';

function compile(fileName, options) {
    const program = ts.createProgram(fileName, options);
    const emitResult = program.emit();

    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(
                diagnostic.file,
                diagnostic.start,
            );

            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

            console.info(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.info(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
        }
    });

    const exitCode = allDiagnostics.length > 0 ? 1 : 0;
    console.info(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

process.argv.slice(2).forEach((file) => {
    // TODO: fix all ts errors
    return;

    const configPath = ts.findConfigFile(file, ts.sys.fileExists, 'tsconfig.json');

    // Read tsconfig.json file
    const tsconfigFile = ts.readConfigFile(configPath, ts.sys.readFile);

    // Resolve extends
    const parsedTsconfig = ts.parseJsonConfigFileContent(
        tsconfigFile.config,
        ts.sys,
        path.dirname(configPath),
    );

    compile([file], parsedTsconfig.options);
});
