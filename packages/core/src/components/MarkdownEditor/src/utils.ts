import { marked } from 'marked';

export const convertStringToMarkdown = (str: string) => marked(str, { sanitize: true });
