declare module 'rc-dropdown' {
    import React from 'react';

    export default class BaseDropDown extends React.Component<DropdownProps> {}

    interface AlignType {
        /**
         * move point of source node to align with point of target node.
         * Such as ['tr','cc'], align top right point of source node with center point of target node.
         * Point can be 't'(top), 'b'(bottom), 'c'(center), 'l'(left), 'r'(right) */
        points?: string[];
        /**
         * offset source node by offset[0] in x and offset[1] in y.
         * If offset contains percentage string value, it is relative to sourceNode region.
         */
        offset?: number[];
        /**
         * offset target node by offset[0] in x and offset[1] in y.
         * If targetOffset contains percentage string value, it is relative to targetNode region.
         */
        targetOffset?: number[];
        /**
         * If adjustX field is true, will adjust source node in x direction if source node is invisible.
         * If adjustY field is true, will adjust source node in y direction if source node is invisible.
         */
        overflow?: {
            adjustX?: boolean | number;
            adjustY?: boolean | number;
        };
        /**
         * Whether use css right instead of left to position
         */
        useCssRight?: boolean;
        /**
         * Whether use css bottom instead of top to position
         */
        useCssBottom?: boolean;
        /**
         * Whether use css transform instead of left/top/right/bottom to position if browser supports.
         * Defaults to false.
         */
        useCssTransform?: boolean;
        ignoreShake?: boolean;
    }

    export interface DropdownProps {
        visible?: boolean;
        className?: string;
        trigger?: Array<string>;
        overlay?: (() => React.ReactElement) | React.ReactElement;
        overlayClassName?: string;
        onVisibleChange?: (visible: boolean) => boolean | void;
        minOverlayWidthMatchTrigger?: boolean;
        onOverlayClick?: (event: Event) => void;
        prefixCls?: string;
        transitionName?: string;
        openClassName?: string;
        animation?: string;
        align?: AlignType;
        overlayStyle?: React.CSSProperties;
        placement?: string;
        alignPoint?: boolean;
        showAction?: string[];
        hideAction?: string[];
        getPopupContainer?: (node: HTMLElement) => HTMLElement;
        defaultVisible?: boolean;
        destroyPopupOnHide?: boolean;
    }
}
