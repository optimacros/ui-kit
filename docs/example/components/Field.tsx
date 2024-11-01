const InputField: any = {};
import {
    ComponentProps,
    DOMAttributes,
    FocusEventHandler,
    SyntheticEvent,
    forwardRef,
    useId,
    useMemo,
} from 'react';

const checkValidity = (event: FocusEventHandler<HTMLInputElement>) => {
    const target = event.currentTarget;

    if (!target.checkValidity()) {
        target.setAttribute('data-invalid', '');

        return false;
    } else {
        target.removeAttribute('data-invalid');

        return true;
    }
};

type ValidationStartegy = keyof DOMAttributes<HTMLInputElement>;

/** Sets `data-invalid` attribute when input is invalid */
function useRegexpValidation(methods: TextFieldProps, strategies: Array<ValidationStartegy> = []) {
    const validation = useMemo(() => {
        return strategies.reduce((acc, k) => {
            acc[k] = (e) => {
                methods[k]?.(e);

                if (checkValidity(e)) {
                    methods.onValueValid?.(e);
                }
            };

            return acc;
        }, {});
    }, []);

    return validation;
}

export type TextFieldProps = {
    hintText?: string;
    label?: string;
    /**
     * When to validate input (set `data-invalid`)
     *
     * @default 'none'
     */
    validate?: Array<ValidationStartegy>;
    errorText?: string;
    onValueValid?: (e: SyntheticEvent<HTMLInputElement>) => void;
} & ComponentProps<typeof InputField.Input>;

/** Text field for a regexp validation */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, errorText, hintText, validate, ...inputProps }, ref) => {
        const id = useId();

        const validation = useRegexpValidation(inputProps, validate);

        return (
            <InputField.Root className="flex flex-col gap-1">
                {label && (
                    <InputField.Label htmlFor={id} className="text-base">
                        {label}
                    </InputField.Label>
                )}

                <InputField.Input
                    {...inputProps}
                    {...validation}
                    ref={ref}
                    id={id}
                    className="peer/input focus:ring-secondary-active
            border-inverse-primary hover:border-inverse-primary-active
            rounded-md border-2 py-1.5 px-2 text-base ring-3 ring-transparent"
                />

                {errorText && (
                    <InputField.ErrorText className="text-error hidden text-sm peer-data-invalid/input:block">
                        {errorText}
                    </InputField.ErrorText>
                )}

                {hintText && (
                    <InputField.HelperText
                        className="text-secondary block text-sm
              peer-data-invalid/input:hidden"
                    >
                        {hintText}
                    </InputField.HelperText>
                )}
            </InputField.Root>
        );
    },
);
