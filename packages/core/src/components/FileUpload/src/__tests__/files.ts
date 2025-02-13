export const getTextFile = (content = 'text content') =>
    new File([content], 'text.txt', { type: 'text/plain' });

export const getImgFile = (size = 1024) =>
    new File([new ArrayBuffer(size)], 'img.jpg', { type: 'image/jpeg' });
