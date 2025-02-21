import React from 'react';
import { FontIcon } from '../FontIcon';
import * as icons from './iconsList';

import IconStyle from './Icon.module.css';

interface IconComponent {
    name: string;
    fill?: string;
    opacity?: string;
}
interface IconProps {
    value: IconComponent | string;
    [key: string]: any;
}

export class Icon extends React.Component<IconProps> {
    icons: any = icons;

    render() {
        const { value, ...otherProps } = this.props;
        //@ts-ignore
        if (this.isOurIcon && Object.hasOwn(value, 'name')) {
            const IconComponent = this.icons[(value as IconComponent).name];

            return (
                <div className={IconStyle.Container} {...otherProps}>
                    <IconComponent {...(value as IconComponent)} />
                </div>
            );
        }

        return <FontIcon value={value as string} {...otherProps} />;
    }

    get isOurIcon() {
        const { value } = this.props;

        return !!this.icons[(value as IconComponent).name];
    }
}
