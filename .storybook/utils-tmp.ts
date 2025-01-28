import { sleep } from '@optimacros-ui/utils';

// TODO waitForPageTrulyReadyPW не может быть в файле, который импортируется в preview (???)
// поэтому для waitForPageTrulyReadySB отдельный файл
// (0 , import_node_url.fileURLToPath) is not a function
export const waitForPageTrulyReadySB = async () => {
    // TODO add some actual checks
    await sleep(500);
};
