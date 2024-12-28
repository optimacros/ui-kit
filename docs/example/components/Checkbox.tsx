import * as checkbox from '@zag-js/checkbox';
import * as radio from '@zag-js/radio-group';
import { normalizeProps, useMachine } from '@zag-js/react';
import * as zagSwitch from '@zag-js/switch';
import { useId, useMemo } from 'react';
/**
 * Hint: use `value`, so that it will show in form when checkbox is checked
 * 'name': 'value-when-checked'
 */
export function Checkbox({
    label,
    ...options
}: {
    label: string;
} & Omit<checkbox.Context, 'id'>) {
    const [state, send] = useMachine(checkbox.machine({ id: useId(), ...options }));

    const api = checkbox.connect(state, send, normalizeProps);

    return (
        <label
            {...api.getRootProps()}
            className="group flex cursor-pointer items-center justify-center gap-2
        data-disabled:cursor-not-allowed data-disabled:opacity-60"
        >
            <div
                {...api.getControlProps()}
                className="bg-inverse-primary group-hover:bg-inverse-primary-active
          text-primary group-data-focus:ring-secondary-active size-5 rounded-md
          p-0.5 ring-2 ring-transparent"
            >
                <svg
                    name="check"
                    className="size-full opacity-0 group-data-[state=checked]:opacity-100"
                    stroke-width="3.5"
                />
            </div>
            <span
                {...api.getLabelProps()}
                className="group-data-hover:text-inverse-secondary text-base"
            >
                {label}
            </span>
            <input {...api.getHiddenInputProps()} />
        </label>
    );
}

export function RadioGroup({
    items,
    className,
    ...options
}: {
    className?: string;
    items: Array<radio.ItemProps & { label: string }>;
} & Omit<radio.Context, 'id'>) {
    const [state, send] = useMachine(radio.machine({ id: useId(), ...options }));

    const api = radio.connect(state, send, normalizeProps);

    return (
        <div {...api.getRootProps()} className={className}>
            {items.map((opt) => (
                <label
                    key={opt.value}
                    {...api.getItemProps(opt)}
                    className="group flex cursor-pointer gap-2
            data-disabled:cursor-not-allowed data-disabled:opacity-60"
                >
                    <div
                        {...api.getItemControlProps(opt)}
                        className="bg-inverse-primary text-primary rounded-round
              border-inverse-primary group-data-[state=checked]:bg-primary
              group-hover:bg-inverse-primary-active
              group-hover:border-inverse-primary-active
              group-data-focus:ring-secondary-active size-5 border-6 ring-2
              ring-transparent"
                    />
                    <span
                        {...api.getItemTextProps(opt)}
                        className="group-hover:text-inverse-secondary text-base"
                    >
                        {opt.label}
                    </span>
                    <input {...api.getItemHiddenInputProps(opt)} />
                </label>
            ))}
        </div>
    );
}

export function Switch({
    label,
    ...options
}: {
    label: string;
    className?: string;
} & Omit<zagSwitch.Context, 'id'>) {
    const id = useId();

    const machine = useMemo(() => zagSwitch.machine({ id, ...options }), [id, options]);

    const [state, send] = useMachine(machine);

    const api = zagSwitch.connect(state, send, normalizeProps);

    return (
        <label
            {...api.getRootProps()}
            className="group flex cursor-pointer items-center justify-center gap-2"
        >
            <input {...api.getHiddenInputProps()} />
            <span
                {...api.getControlProps()}
                className="bg-secondary data-[state=checked]:bg-inverse-primary
          group-data-focus:ring-secondary-active inline-flex w-12 items-center
          justify-start rounded-full p-1 ring-2 ring-transparent
          data-[state=checked]:justify-end"
            >
                <span {...api.getThumbProps()} className="rounded-round bg-primary size-5" />
            </span>
            <span {...api.getLabelProps()} className="group-hover:text-inverse-secondary text-base">
                {label}
            </span>
        </label>
    );
}
