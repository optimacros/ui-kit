import { ReactNode, useState } from 'react';
import { TextField, TextFieldProps } from './Field';

export function VideoInput({
    className,
    prefix,
    children,
    onValueValid,
    ...props
}: {
    children: (value: string) => ReactNode;
    /** Prefix of video domain */
    prefix: string;
} & TextFieldProps) {
    const [link, setLink] = useState(null);

    return (
        <div className={className}>
            <TextField
                {...props}
                onValueValid={(e) => {
                    setLink(() => e.currentTarget.value);
                }}
                className="peer"
            />

            <div
                className="ring-secondary hover:ring-secondary-active flex size-full
          cursor-pointer items-center justify-center overflow-hidden rounded-lg
          ring-3 peer-data-invalid:hidden"
            >
                {children(link)}
            </div>
        </div>
    );
}
