import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react';

import { driveLandingState } from '../../../../../state/DriveLandingState';
import { Favorite } from '../../../../../components';

import stylesRow from './ModelsItemRow.module.css';
import stylesCard from './ModelsItemCard.module.css';

import iconCube from './icon-cube.svg';
import iconDataBase from './icon-database.svg';
import iconPrivate from './icon-private.svg';

interface Props {
    element: {
        id: string;
        name: string;
        date: string;
        dateCreate: string;
        dateUpdate: string;
        isOffline: boolean;
        isPrivate: boolean;
        summary: {
            storageVersion: string;
        };
    };
    hasPrivateModel?: boolean;
}

interface State {
    favorite: boolean;
}

@observer
export class ModelsItem extends React.Component<Props, State> {
    state = {
        favorite: false,
    };

    render() {
        const { name, date, dateCreate, dateUpdate, isOffline, isPrivate } = this.props.element;
        const { storageVersion } = this.props.element.summary || {};

        const className = classNames({
            [this.styles.Container]: true,
            [this.styles.Container_offline]: isOffline,
            [this.styles.Container_hasPrivate]: !isPrivate && this.props.hasPrivateModel,
            [this.styles.Container_isPrivate]: isPrivate,
        });

        const imageIcon = driveLandingState.isActiveOltpTab ? iconDataBase : iconCube;

        return (
            <div className={className} onClick={this.onOpen}>
                {this.renderFavorite()}

                <div className={this.styles.Image}>
                    <ReactSVG src={imageIcon} />
                </div>

                {this.renderPrivateImage()}

                <div className={this.styles.Date}>{date}</div>

                <div>
                    <span className={this.styles.DateCreate}>{dateCreate}</span>

                    <span className={this.styles.DateUpdate}>{dateUpdate}</span>

                    <span className={this.styles.VersionBlock}>{storageVersion}</span>
                </div>

                {isOffline && (
                    <div className={this.styles.Status}>
                        status:
                        <span className={this.styles.Status_offline}>offline</span>
                    </div>
                )}

                {!isOffline && <div className={this.styles.Size}>1.2 GB</div>}

                <div className={this.styles.Caption}>
                    <div className={this.styles.Name}>{name}</div>
                </div>
            </div>
        );
    }

    renderPrivateImage() {
        if (this.props.element.isPrivate) {
            return <ReactSVG className={this.styles.PrivateImage} src={iconPrivate} />;
        }
    }

    renderFavorite() {
        if (driveLandingState.isActiveOltpTab) {
            return null;
        }

        return (
            <div className={this.styles.Favorite}>
                <Favorite onChange={this.onChangeFavorite} checked={this.state.favorite} />
            </div>
        );
    }

    private onOpen = () => {
        console.log('onOpen');
    };

    private onChangeFavorite = (favorite: boolean) => {
        console.log('onChangeFavorite', favorite);

        this.setState({ favorite });
    };

    get styles() {
        if (driveLandingState.isCardView) {
            return stylesCard;
        }

        return stylesRow;
    }
}
