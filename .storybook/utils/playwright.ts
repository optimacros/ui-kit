import { waitForPageReady } from '@storybook/test-runner';
import type { Page } from 'playwright';

export const waitForPageTrulyReadyPW = async (page: Page) => {
    // вся эта срань потенциально нужна, чтобы дождаться загрузки всего, что загружается
    // например, лого оптимакроса в core/theme
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    await page.waitForLoadState('networkidle');

    await waitForPageReady(page);
    await page.evaluate(async () => {
        // TODO использовать sleep из utils
        // для этого нужно ежектировать конфиг джеста и добавить в него transformIgnorePatterns: ['lodash'] (вероятно)
        const sleep = (ms: number) =>
            new Promise((res) => {
                setTimeout(() => {
                    res(true);
                }, ms);
            });

        const images = [...document.images];
        const waitForAllImagesToLoad = (imageArray: HTMLImageElement[]): Promise<void> =>
            new Promise((res, rej) => {
                const timeout = setTimeout(rej, 10000);
                let loaded = false;
                while (!loaded) {
                    const notLoadedImage = imageArray.some(
                        ({ naturalWidth, complete }) => !naturalWidth || !complete,
                    );
                    if (!notLoadedImage) {
                        loaded = true;
                    }
                }
                clearTimeout(timeout);
                res();
            });
        await waitForAllImagesToLoad(images);
        // свг иконки загружаются с задержкой
        // TODO другие варианты определить загруженность свг??
        const hasIcon = document.querySelector('svg[data-scope="icon"][data-part="root"] use');
        if (hasIcon) {
            // да, 3 секунды
            await sleep(3000);
        }

        // нужно подождать окончания анимации (например, ховера)
        await sleep(300);
    });
};
