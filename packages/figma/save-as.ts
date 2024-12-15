import JSZip from 'jszip';

//TODO: move to other logic
export const saveAsZip = (files: [string, string][]) => {
    var zip = new JSZip();

    files.forEach(([fileName, fileValue]) => zip.file(fileName, fileValue));

    zip.generateInternalStream({ type: 'blob' }).on('data', (blob) => {
        console.log('blob');
        console.log(blob);
    });

    return Promise.resolve('');
};

export const saveAsFiles = (files: [string, string][]) => {
    files.forEach(([filename, data]) => {
        figma.ui.postMessage({
            type: 'download',
            data: {
                filename,
                data,
            },
        });
    });
};
