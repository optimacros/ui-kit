import { useApi } from '../../state';

export type SeparatorProps = {};

export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} />;
};
