// @ts-nocheck
import classNames from 'classnames'
import { marked } from 'marked'
import React, { ReactNode } from 'react'
import { ResizableBox } from 'react-resizable'

import { Tab, TabHeader } from '../Tabs'

import styles from './MarkdownEditor.module.css'

interface Props {
    onChange: (value: string) => void;
    value: string;
    className?: string;
    resizable?: boolean | string;
    height?: number;
    editTabLabel?: string;
    previewTabLabel?: string;
    splitTabLabel?: string;
    renderTab: (props:any) => ReactNode;
    renderTabHeader: (props:any) => ReactNode;
}

interface State {
    activeTab: number
}

export class MarkdownEditor extends React.Component<Props, State> {
    static defaultProps = {
        editTabLabel: 'Editor',
        previewTabLabel: 'Preview',
        splitTabLabel: 'Split',
    }

    state = {
        activeTab: 2,
    }

    _editorTextarea: HTMLTextAreaElement | null | undefined

    render() {
        const className = classNames({
            [styles.MarkdownEditor]: true,
            [this.props.className as string]: this.props.className,
            [styles.MarkdownEditor_notResize]:
                !this.props.resizable || this.props.resizable === 'none',
            [styles.MarkdownEditor_edit]: this.state.activeTab === 0,
            [styles.MarkdownEditor_preview]: this.state.activeTab === 1,
            [styles.MarkdownEditor_split]: this.state.activeTab === 2,
        })

        const classNameHtml = classNames({
            Markdown: true,
            [styles.MarkdownEditorHtml]: true,
        })

        return (
            <div className={className}>
                <div className={styles.MarkdownEditorTop}>
                    <TabHeader
                        theme={styles}
                        active={this.state.activeTab}
                        onTabSwitch={this._onTabChange}
                    >
                        <Tab title={this.props.editTabLabel} />
                        <Tab title={this.props.previewTabLabel} />
                        <Tab title={this.props.splitTabLabel} />

                    </TabHeader>
                </div>

                <ResizableBox
                    axis="y"
                    width={500}
                    height={this.props.height}
                    minConstraints={[150, 150]}
                    className={styles.MarkdownEditorContent}
                >
                    <textarea
                        className={styles.MarkdownEditorTextarea}
                        value={this.props.value}
                        onChange={this._onValueChange}
                        onKeyDown={this._onPressTab}
                        ref={(node) => {
                            this._editorTextarea = node
                        }}
                    />

                    <div
                        className={classNameHtml}
                        dangerouslySetInnerHTML={{
                            __html: this.formatValue,
                        }}
                    />
                </ResizableBox>
            </div>
        )
    }

    _onValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onChange(event.target.value)
    }

    _onPressTab = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault()
            const { value } = this.props
            const start = event.target.selectionStart
            const end = event.target.selectionEnd

            this.props.onChange(`${value.substring(0, start)}\t${value.substring(end)}`)

            setTimeout(() => {
                if (this._editorTextarea) {
                    this._editorTextarea.selectionStart = start + 1
                    this._editorTextarea.selectionEnd = start + 1
                }
            })
        }
    }

    _onTabChange = (index: number) => {
        this.setState({
            activeTab: index,
        })
    }

    get formatValue() {
        return marked(this.props.value, { sanitize: true })
    }
}
