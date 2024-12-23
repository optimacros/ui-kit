import { Toggle } from './Toggle';
import { Button } from '@optimacros-ui/button';
export default {
    title: 'UI Kit core/Toggle',
    component: Toggle,
    tags: ['autodocs'],
};

export const Base = () => {
    const css = `[data-scope='toggle'][data-part='root'] [data-state='checked']{
                background: red;
            }`;
    return (
        <>
            <style>{css}</style>
            <Toggle>
                <Button>toggle me</Button>
            </Toggle>
        </>
    );
};
