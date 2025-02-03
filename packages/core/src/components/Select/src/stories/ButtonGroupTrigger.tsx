//@ts-nocheck

import { Icon } from '@optimacros-ui/icon';
import { ButtonGroup } from '@optimacros-ui/button-group';
import { ControlTemplate } from './components';
import { Select } from '@optimacros-ui/select';

export const ButtonGroupTrigger = (props) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <ButtonGroup.Root>
                        <ButtonGroup.Item>
                            {api.empty ? 'choose value' : api.valueAsString}
                        </ButtonGroup.Item>
                        <ButtonGroup.Item
                            {...api.getTriggerProps()}
                            className="data-[state=open]:rotate-180"
                        >
                            <Icon value="arrow_drop_down" />
                        </ButtonGroup.Item>
                    </ButtonGroup.Root>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};
