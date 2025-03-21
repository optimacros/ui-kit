import * as _ from '@optimacros-ui/utils';
import { observer } from 'mobx-react';
import { Component } from 'react';

import { HeaderMenuElement } from './HeaderMenuElement';

import styles from './HeaderMenu.module.css';

@observer
export class HeaderMenu extends Component<{
    elements: Array<any>;
}> {
    render() {
        if (_.isEmpty(this.props.elements)) {
            return null;
        }

        return (
            <div className={styles.Container}>
                <ul className={styles.Menu}>{this.renderList()}</ul>
            </div>
        );
    }

    renderList() {
        return _.map(this.props.elements, (element) => {
            if (element.hidden) {
                return null;
            }

            const key = element.id || element.entityLongId || element.title;

            return <HeaderMenuElement key={key} element={element} firstLevel />;
        });
    }
}
