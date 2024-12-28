import * as combobox from '@zag-js/combobox';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId, useState } from 'react';
import { tw } from '../../../packages/core/src';

export const listClassName = tw`
scrollbar-primary bg-primary relative flex
h-[50vh] flex-col gap-2 overflow-y-scroll rounded-md py-2 text-base shadow-sm
md:h-60 md:w-60`;

export const listItemClassName = tw`data-highlighted:bg-primary-hover
not-data-disabled:hover:bg-primary-hover data-disabled:text-disabled mx-2 flex
cursor-pointer gap-1 rounded-md py-2 px-2 select-none
data-disabled:cursor-not-allowed`;

function useCombobox({ items, ...rest }) {
    const [options, setOptions] = useState(items);

    const collection = combobox.collection({
        items: options,
    });

    const [state, send] = useMachine(
        combobox.machine({
            id: useId(),
            collection,
            ...rest,
            onOpenChange() {
                setOptions(items);
            },
        }),
        {
            context: { collection },
        },
    );

    const api = combobox.connect(state, send, normalizeProps);

    return { options, api };
}

export function Combobox({
    items,
    label,
    icon,
    isMobile,
    ...rest
}: {
    items;
    label;
    icon;
    classNameKey: string;
    isMobile: boolean;
} & combobox.Context) {
    const { options, api } = useCombobox({ items, ...rest });

    return (
        <>
            <div {...api.getRootProps()}>
                <label {...api.getLabelProps()}>{label}</label>
                <div {...api.getControlProps()}>
                    <input {...api.getInputProps()} />
                    <button
                        {...api.getTriggerProps()}
                        data-recipe="Button"
                        data-variant="primary"
                        data-size="md"
                        className="data-[variant]:bg-primary"
                    >
                        text
                    </button>
                </div>
            </div>

            <div
                {...(!isMobile && api.getPositionerProps())}
                className={`mobile:h-svh mobile:rounded-s-xl mobile:w-full
          mobile:bottom-0 mobile:left-0 mobile:flex
          mobile:aria-hidden:visually-hidden mobile:fixed mobile:items-end
          bg-transparent`}
                aria-hidden={!api.open}
            >
                {options.length > 0 && (
                    <ul {...api.getContentProps()} className={listClassName}>
                        {options.map((item) => (
                            <li
                                {...api.getItemProps({ item })}
                                className={listItemClassName}
                                key={item}
                            >
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
