import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as treemenu from '@zag-js/tree-view';

export const {
    RootProvider: Root,
    useApi,
    State,
} = createReactApiStateContext({
    api: null as treemenu.Api,
    id: 'tree-menu',
    machine: treemenu,
    initialState: {},
});

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

    return (
        <styled.div
            {...rest}
            {...api.getBranchProps(nodeProps)}
            data-scope="tree-menu"
            data-part="tree-node"
            ref={ref}
        />
    );
});

export const BranchIcon = forward<{}, 'span'>((props, ref) => {
    return <styled.span {...props} data-scope="tree-menu" data-part="branch-icon" ref={ref} />;
});

export const BranchText = forward<TreeNodeProps, 'span'>(({ node, indexPath, ...rest }, ref) => {
    const api = useApi();
    const nodeProps = { indexPath, node };

    return (
        <styled.span
            {...rest}
            {...api.getBranchTextProps(nodeProps)}
            data-scope="tree-menu"
            data-part="branch-text"
            ref={ref}
        />
    );
});

export const BranchIndicator = forward<TreeNodeProps, 'span'>(
    ({ node, indexPath, ...rest }, ref) => {
        const api = useApi();
        const nodeProps = { indexPath, node };

        return (
            <styled.span
                {...rest}
                {...api.getBranchTextProps(nodeProps)}
                data-scope="tree-menu"
                data-part="branch-indicator"
                ref={ref}
            />
        );
    },
);

export const BranchControl = forward<TreeNodeProps, 'div'>(({ node, indexPath, ...rest }, ref) => {
    const api = useApi();
    const nodeProps = { indexPath, node };

    return (
        <styled.div
            {...rest}
            {...api.getBranchControlProps(nodeProps)}
            data-scope="tree-menu"
            data-part="branch-control"
            ref={ref}
        />
    );
});

export const BranchContent = forward<TreeNodeProps, 'div'>(
    ({ node, indexPath, children, ...rest }, ref) => {
        const api = useApi();
        const nodeProps = { indexPath, node };

        return (
            <styled.div
                {...rest}
                {...api.getBranchContentProps(nodeProps)}
                data-scope="tree-menu"
                data-part="branch-content"
                ref={ref}
            >
                <div {...api.getBranchIndentGuideProps(nodeProps)} />
                {node.children?.map((childNode, index) => (
                    <TreeNode key={childNode.id} node={childNode} indexPath={[indexPath, index]} />
                ))}
            </styled.div>
        );
    },
);
