export const isVisibleInParentViewport = (parent: Element, element: Element) => {
    const rect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    return rect.x >= 0 && rect.x <= parentRect.width - parentRect.x;
};
