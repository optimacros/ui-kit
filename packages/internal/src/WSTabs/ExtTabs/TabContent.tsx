// @ts-nocheck
import _ from 'lodash';
import { Component, ReactNode } from 'react';

import { mergeStyles } from '../utils';

import styles from './TabContent.module.css';

interface Theme {
    TabContent?: string;
    TabContent_Inner?: string;
}
interface Props {
    active?: number;
    className?: string;
    theme?: Theme | Record<string, string>;
    children?: ReactNode[];
}
/* eslint-disable */
export class WSTabContent extends Component<Props> {
    static defaultProps = {
        theme: {
            TabContent: 'TabContent__TabContent',
            TabContent_Inner: 'TabContent__TabContent_Inner',
        },
    };

    render() {
        const theme = mergeStyles(this.props.theme, styles);
        const className = `${(theme as Theme).TabContent} ${this.props.className || ''}`.trim();

        return <div className={className}>{this.renderPanel()}</div>;
    }

    renderPanel() {
        const { active } = this.props;
        const theme = mergeStyles(this.props.theme, styles) as Theme;

        return _.map(this.props.children, (panel, index) => {
            if (active !== index) {
                return null;
            }

            return (
                <div key={`panel-${index}`} className={theme.TabContent_Inner}>
                    {panel}
                </div>
            );
        });
    }
}
/* eslint-enable */
