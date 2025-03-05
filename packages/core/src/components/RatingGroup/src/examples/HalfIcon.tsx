import { Root, Item, Control } from '../parts';
import { Icon } from '@optimacros-ui/icon';
import { Api } from '../state';

export const HalfIcon = (props) => {
    return (
        <Root {...props}>
            <Control>
                <Api>
                    {(api) => (
                        <>
                            {api.items.map((index) => {
                                const state = api.getItemState({ index });
                                return (
                                    <Item key={index} index={index}>
                                        {state.half ? (
                                            <Icon value="star_half" />
                                        ) : (
                                            <Icon value="star" />
                                        )}
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
