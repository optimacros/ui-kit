import { SidebarElement } from '../types.ts';
import { ResourceListElement } from 'components/ResourceList/types.ts';

export function getSidebarNestedList(
    rootElements: SidebarElement[],
    contentElements: SidebarElement[][],
    insideExpand = false,
): ResourceListElement[] {
    const nestedSidebarList: ResourceListElement[] = [];

    rootElements.forEach((rootElement) => {
        const shouldSetToRootStructure =
            (rootElement.rootId === null && !insideExpand) ||
            (rootElement.rootId !== null && insideExpand);

        if (!shouldSetToRootStructure) {
            return;
        }

        const rootElementChildren: ResourceListElement[] = [];
        const filterItems = (item: SidebarElement) => item.rootId === rootElement.id;

        // filter root elements by rootId to collect root elements that belong to the current root element
        const childrenRootElements = rootElements.filter(filterItems);

        if (childrenRootElements.length !== 0) {
            // recursive - to add nested (children) elements to children if necessary
            const childrenContent = getSidebarNestedList(
                childrenRootElements,
                contentElements,
                true,
            );
            rootElementChildren.push(...childrenContent);
        }

        contentElements.forEach((contentList) => {
            // filter content elements by rootId to collect elements that belong to the current root element
            // and update element structure (remove rootId, add opened and selected)
            const rootContentList = contentList.filter(filterItems).map((item) => {
                const { rootId, ...data } = item;

                return {
                    ...data,
                    opened: false,
                    selected: false,
                } as ResourceListElement;
            });
            rootElementChildren.push(...rootContentList);
        });

        const { rootId, ...data } = rootElement;

        nestedSidebarList.push({
            ...data,
            opened: false,
            selected: false,
            children: rootElementChildren,
        } as ResourceListElement);
    });

    return nestedSidebarList;
}
