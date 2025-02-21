import { useState } from 'react';
import classNames from 'classnames';

import { FontIcon, Input } from '../../../../../components';

import styles from './Search.module.css';

export function Search() {
    const [isShow, setIsShow] = useState(false);
    const [value, onChange] = useState('');

    const onShow = () => {
        setIsShow(true);
    };

    const onClose = () => {
        setIsShow(false);
    };

    const className = classNames({
        [styles.Search]: true,
        [styles.Search__active]: isShow,
    });

    const classNameInputContainer = classNames({
        [styles.InputContainer]: true,
        [styles.InputContainer__active]: isShow,
    });

    return (
        <div className={styles.SearchContainer}>
            <div className={className}>
                <FontIcon value="search" onClick={onShow} className={styles.Icon} />

                <div className={classNameInputContainer}>
                    <Input
                        theme={styles}
                        label="Search"
                        placeholder="Search"
                        collapsed={true}
                        onChange={onChange}
                        value={value}
                    />

                    <FontIcon value="close" onClick={onClose} className={styles.IconClose} />
                </div>
            </div>
        </div>
    );
}
