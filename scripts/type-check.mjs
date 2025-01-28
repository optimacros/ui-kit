import ts from 'typescript';
import path from 'path';

export function compile(fileName, options) {
    const program = ts.createProgram(fileName, options);
    const emitResult = program.emit();
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    const logs = allDiagnostics.map((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(
                diagnostic.file,
                diagnostic.start,
            );

            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

            return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
        } else {
            return ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        }
    });

    return logs;
}

export function parseTsConfig(tsPath) {
    const configPath = ts.findConfigFile(tsPath, ts.sys.fileExists, 'tsconfig.json');
    // Read tsconfig.json file
    const tsconfigFile = ts.readConfigFile(configPath, ts.sys.readFile);

    // Resolve extends
    const parsedTsconfig = ts.parseJsonConfigFileContent(
        tsconfigFile.config,
        ts.sys,
        path.dirname(configPath),
    );

    return parsedTsconfig;
}

export function checkFile(file) {
    const result = compile([file], parseTsConfig(file).options);

    if (result.length > 0) {
        console.info(result.join('\n'));
        process.exit(1);
    }

    process.exit(0);
}
