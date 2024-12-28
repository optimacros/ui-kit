import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { Button } from '@optimacros-ui/button';
import { ControlTemplate } from './components';

export const ButtonTrigger = (props) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <Button {...api.getTriggerProps()} variant="bordered">
                        {api.empty ? 'choose value' : api.valueAsString}
                        <div className="data-[active=true]:rotate-180" data-active={api.open}>
                            <Icon value={'arrow_drop_down'} />
                        </div>
                    </Button>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};
