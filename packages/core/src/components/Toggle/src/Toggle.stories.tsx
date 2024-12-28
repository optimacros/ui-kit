import { Toggle } from './Toggle';
import { Button } from '@optimacros-ui/button';
export default {
    title: 'UI Kit core/Toggle',
    component: Toggle,
    tags: ['autodocs'],
};

export const Base = () => {
    return (
        <Toggle>
            <Button>toggle me</Button>
        </Toggle>
    );
};
