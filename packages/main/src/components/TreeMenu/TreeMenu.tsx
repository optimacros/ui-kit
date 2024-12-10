import { ComponentProps, PropsWithChildren } from 'react';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as treemenu from '@zag-js/tree-view';
import { collection } from './mock';

export const { RootProvider, useApi, State } = createReactApiStateContext({
    api: null as treemenu.Api,
    id: 'tree-menu',
    machine: treemenu,
    initialState: {},
    defaultContext: { collection },
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => (
    <RootProvider {...context}>
        {(api) => (
            <styled.div {...api.getRootProps()} ref={ref}>
                {children}
            </styled.div>
        )}
    </RootProvider>
));

export const Tree = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...props}
            {...api.getTreeProps()}
            data-scope="tree-menu"
            data-part="tree"
            ref={ref}
        />
    );
});

interface TreeNodeProps {
    node: Node;
    indexPath: number[];
}

export const TreeNode = forward<TreeNodeProps, 'div'>(({ node, indexPath, ...rest }, ref) => {
    const api = useApi();
    const nodeProps = { indexPath, node };
    const nodeState = api.getNodeState(nodeProps);

    if (nodeState.isBranch) {
        return (
            <styled.div
                {...rest}
                {...api.getBranchProps(nodeProps)}
                data-scope="tree-menu"
                data-part="tree-node"
                ref={ref}
            >
                <div {...api.getBranchControlProps(nodeProps)}>
                    []
                    <span {...api.getBranchTextProps(nodeProps)}>{node.name}</span>
                    <span {...api.getBranchIndicatorProps(nodeProps)}> {' >'} </span>
                </div>
                <div {...api.getBranchContentProps(nodeProps)}>
                    <div {...api.getBranchIndentGuideProps(nodeProps)} />
                    {node.children?.map((childNode, index) => {
                        return (
                            <TreeNode
                                key={childNode.id}
                                node={childNode}
                                indexPath={[...indexPath, index]}
                            />
                        );
                    })}
                </div>
            </styled.div>
        );
    }
    return <div {...api.getItemProps(nodeProps)}>[] {node.name}</div>;
});
