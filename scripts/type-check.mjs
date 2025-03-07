import ts from 'typescript';
import path from 'path';

const globalsPath = path.join(process.cwd(), 'scripts', 'import-globals.ts');

export const ignoreFiles = [];
export const ignoreDirectories = ['node_modules'];

export function compile(fileName, options) {
    const program = ts.createProgram([globalsPath, ...fileName], options);
    const emitResult = program.emit();
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    const filteredDiagnostics = allDiagnostics.filter(
        (d) => d.file && d.file.fileName === fileName[0],
    );

    const logs = filteredDiagnostics.map((diagnostic) => {
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
