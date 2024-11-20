import { Button, ButtonProps } from '../ButtonV2';
export interface IconButtonProps extends ButtonProps {}

export const IconButton = (props: IconButtonProps) => {
    return <Button {...props} data-tag="icon-button" />;
};
