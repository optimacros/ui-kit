import { getSidebarNestedList } from './getSidebarNestedList.ts';
import { ResourceListElement } from '../../ResourceList';
import { SidebarElement } from '../types.ts';

export function getSidebarData(
    rootElements: SidebarElement[],
    ...contentElements: SidebarElement[][]
): ResourceListElement[] {
    const rootSidebarContent: SidebarElement[] = contentElements.flatMap((sidebarContentList) =>
        sidebarContentList.filter((item) => item.rootId === null),
    );

    const rootContent = rootSidebarContent.flatMap((rootContentItem) => {
        const { rootId, ...content } = rootContentItem;

        return {
            ...content,
            opened: false,
            selected: false,
        };
    });

    return [
        ...getSidebarNestedList(rootElements, contentElements),
        ...rootContent,
    ] as ResourceListElement[];
}
