import React, { ComponentProps, PropsWithChildren } from 'react';
import * as treemenu from '@zag-js/tree-view';
import { tw } from '@optimacros-ui/utils';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';

interface Node {
    id: string;
    name: string;
    children?: Node[];
}

export const { RootProvider, useApi, State } = createReactApiStateContext({
    api: null as treemenu.Api,
    id: 'tree-view',
    machine: treemenu,
    initialState: {},
});

type MenuItems = ReturnType<typeof treemenu.collection<Node>>;
export type RootProps = PropsWithChildren<
    ComponentProps<typeof RootProvider> & {
        menuItems: MenuItems;
    }
>;

export const Root = forward<RootProps, 'div'>(({ children, menuItems, ...context }, ref) => {
    const collection = treemenu.collection<Node>(menuItems);

    return (
        <RootProvider {...context} collection={collection}>
            {(api) => (
                <styled.div {...api.getRootProps()} ref={ref}>
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const Tree = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...props}
            {...api.getTreeProps()}
            data-scope="tree-view"
            data-part="tree"
            ref={ref}
        />
    );
});

interface TreeNodeProps {
    node: Node;
    indexPath: number[];
}
const branchIndicatorClassName = tw`
inline-block data-[state='open']:transform data-[state='open']:rotate-90
`;
export const TreeNode = forward<TreeNodeProps, 'div'>(
    ({ node, indexPath, children, ...rest }, ref) => {
        const api = useApi();
        const nodeProps = { indexPath, node };
        const nodeState = api.getNodeState(nodeProps);
        const [indicator, branchControl, branchContent] = React.Children.toArray(children);

        if (nodeState.isBranch) {
            return (
                <styled.div
                    {...rest}
                    {...api.getBranchProps(nodeProps)}
                    data-scope="tree-view"
                    data-part="tree-node-is-branch"
                    ref={ref}
                >
                    <div
                        {...api.getBranchControlProps(nodeProps)}
                        data-scope="tree-view"
                        data-part="branch-control"
                    >
                        {branchControl}
                        <span
                            {...api.getBranchTextProps(nodeProps)}
                            data-scope="tree-view"
                            data-part="branch-text"
                        >
                            {node.name}
                        </span>
                        <span
                            {...api.getBranchIndicatorProps(nodeProps)}
                            data-scope="tree-view"
                            data-part="branch-indicator"
                            className={branchIndicatorClassName}
                        >
                            {indicator}
                        </span>
                    </div>
                    <div
                        {...api.getBranchContentProps(nodeProps)}
                        data-scope="tree-view"
                        data-part="branch-content"
                    >
                        <div {...api.getBranchIndentGuideProps(nodeProps)} />
                        {node.children?.map((childNode, index) => {
                            return (
                                <TreeNode
                                    key={childNode.id}
                                    node={childNode}
                                    indexPath={[...indexPath, index]}
                                >
                                    {...children}
                                </TreeNode>
                            );
                        })}
                    </div>
                </styled.div>
            );
        }
        return (
            <div
                {...api.getItemProps(nodeProps)}
                data-scope="tree-view"
                data-part="tree-node-no-branch"
            >
                {branchContent} {node.name}
            </div>
        );
    },
);
