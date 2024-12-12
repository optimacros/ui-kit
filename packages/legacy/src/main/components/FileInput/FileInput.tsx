import React from 'react';

import { WSIcon as Icon } from '../WSIcon';

import styles from './FileInput.module.css';

interface Props {
    state: {
        reset?: () => void;
        file: {
            lastModified: number;
            name: string;
            size: number;
        };
    };
    value?: string;
    filePreview?: boolean;
    labelUploadNewFile?: string;
}

export class FileInput extends React.Component<Props> {
    render() {
        if (this.props.state.file && this.props.filePreview) {
            return this.renderFilePreview();
        }

        return this.renderFileInput();
    }

    renderFileInput() {
        const { state, value, filePreview, labelUploadNewFile, ...otherProps } = this.props;

        return (
            <div className={styles.UploadFieldContainer}>
                <div className={styles.UploadField}>
                    <div className={styles.UploadField_Label}>{this.props.labelUploadNewFile}</div>

                    <input type="file" size={100} {...otherProps} />
                </div>
            </div>
        );
    }

    renderFilePreview() {
        return (
            <div className={styles.FileInfo}>
                {this.renderReset()}

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={this.props.state.file.lastModified}>
                            <td>{this.props.state.file.name}</td>
                            <td>{this.calculateFileSize()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderReset() {
        if (!this.props.state.reset) {
            return null;
        }

        return (
            <div className={styles.Reset}>
                <Icon
                    value="clear"
                    onClick={() => this.props.state.reset && this.props.state.reset()}
                />
            </div>
        );
    }

    // fix move this
    calculateFileSize() {
        const symbols = ['B', 'kB', 'MB', 'GB', 'TB'];
        const { size } = this.props.state.file;

        const i = Math.floor(Math.log(size) / Math.log(1024));
        // eslint-disable-next-line no-restricted-properties
        const res = size / +Math.pow(1024, i).toFixed(2);

        return `${res} ${symbols[i]}`;
    }
}
