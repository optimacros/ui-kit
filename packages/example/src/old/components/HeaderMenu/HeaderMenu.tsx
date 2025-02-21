import React from 'react';
import { isEmpty, map } from '@optimacros-ui/utils';
import { observer } from 'mobx-react';

import type { Element } from './HeaderMenuElement';
import { HeaderMenuElement } from './HeaderMenuElement';

import styles from './HeaderMenu.module.css';

type Props = {
    elements: Element[];
};

@observer
export class HeaderMenu extends React.Component<Props> {
    render(): React.JSX.Element | null {
        if (isEmpty(this.props.elements)) {
            return null;
        }

        return (
            <div className={styles.Container}>
                <ul className={styles.Menu}>{this.renderList()}</ul>
            </div>
        );
    }

    renderList(): (React.JSX.Element | null)[] {
        return map(this.props.elements, (element) => {
            if (element.hidden) {
                return null;
            }

            return <HeaderMenuElement key={element.id} element={element} firstLevel />;
        });
    }
}
