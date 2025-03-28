// @ts-nocheck
import { Component } from 'react';

import { WSTabContent as TabContent } from './TabContent';
import { WSTabHeader as TabHeader } from './TabHeader';
import { mergeStyles } from '@optimacros-ui/utils';

import styles from './TabsContainer.module.css';

interface Props {
    className?: string;
    active?: number;
    draggable?: boolean;
    onTabSwitch?: () => void;
    onTabPositionChange?: () => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme: {
        TabsContainer: string;
    };
}

// eslint-disable-next-line react/prefer-stateless-function
export class WSTabsContainer extends Component<Props> {
    static defaultProps = {
        hideTabHeader: false,
        theme: {
            TabsContainer: 'TabsContainer__TabsContainer',
        },
    };

    render() {
        const theme = mergeStyles(this.props.theme, styles) as Props['theme'];

        const { headerClassName, contentClassName, ...otherProps } = this.props;
        const className = `${theme.TabsContainer} ${this.props.className || ''}`.trim();

        return (
            <div className={className}>
                {!this.props.hideTabHeader && (
                    <TabHeader {...otherProps} className={headerClassName} theme={theme} />
                )}

                <TabContent {...otherProps} className={contentClassName} theme={theme} />
            </div>
        );
    }
}
