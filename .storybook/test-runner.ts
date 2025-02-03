import { type TestRunnerConfig, getStoryContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
//@ts-ignore
import { waitForPageTrulyReadyPW } from './utils/playwright.ts';
// import { sleep } from '../packages/utils/src';

const customSnapshotsDir = `${process.cwd()}/.storybook/__snapshots__`;
const DEFAULT_VIEWPORT_SIZE = { width: 1920, height: 1080 };

const config: TestRunnerConfig = {
    logLevel: 'verbose',
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    // делаем takeSnapshot доступной в play функции
    // проверяем, есть ли play и тогда не делаем скриншот автоматически
    async preVisit(page, context) {
        globalThis.storyId = context.id;

        if (!(await page.evaluate(async () => 'takeScreenshot' in window))) {
            await page.exposeBinding('takeScreenshot', async (...args) => {
                const [{ page }, idProp] = args;

                const id = idProp
                    ? `${globalThis.storyId}-play-${idProp.replaceAll(' ', '-')}`
                    : globalThis.storyId;

                const image = await page.screenshot();

                expect(image).toMatchImageSnapshot({
                    customSnapshotsDir,
                    customSnapshotIdentifier: id,
                });
            });

            await page.exposeBinding('waitForPageTrulyReady', async ({ page }) => {
                return waitForPageTrulyReadyPW(page);
            });
        }

        page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    },
    async postVisit(page, context) {
        const storyContext = await getStoryContext(page, context);

        // не делаем скриншот
        // предполагаем, что будет вызван takeScreenshot в начале play или в другой момент
        if (storyContext.tags.includes('hasPlayFunction')) {
            return;
        }

        await waitForPageTrulyReadyPW(page);

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir,
            customSnapshotIdentifier: context.id,
        });
    },
    tags: { skip: ['skip-test-runner'] },
};

export default config;
