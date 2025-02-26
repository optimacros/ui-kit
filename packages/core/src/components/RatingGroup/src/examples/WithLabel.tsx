import { Root, Item, Control, Label } from '../parts';
import { Icon } from '@optimacros-ui/icon';
import { Api } from '../state';

export const WithLabel = (props) => {
    return (
        <Root {...props}>
            <Label>Rate:</Label>
            <Control>
                <Api>
                    {(api) => (
                        <>
                            {api.items.map((index) => {
                                return (
                                    <Item key={index} index={index}>
                                        <Icon value="star" />
                                    </Item>
                                );
                            })}
                        </>
                    )}
                </Api>
            </Control>
        </Root>
    );
};
