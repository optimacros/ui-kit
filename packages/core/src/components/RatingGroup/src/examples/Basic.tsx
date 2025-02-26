import { Root, Item, Control } from '../parts';
import { Icon } from '@optimacros-ui/icon';
import { Api } from '../state';

export const Basic = (props) => {
    return (
        <Root {...props}>
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
