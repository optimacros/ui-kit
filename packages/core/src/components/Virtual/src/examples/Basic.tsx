import { Virtual } from '..';

export const Basic = (props: Virtual.ListProps) => (
    <Virtual.Root
        style={{
            width: 300,
            height: 700,
        }}
        data-testid="root"
    >
        <Virtual.List {...props} data-testid="list">
            {({ id, value, style }) => (
                <Virtual.Item id={id} style={style}>
                    {value}
                </Virtual.Item>
            )}
        </Virtual.List>

        <Virtual.Footer data-testid="footer">i am footer</Virtual.Footer>
    </Virtual.Root>
);
