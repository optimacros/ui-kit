// @ts-nocheck
import React from 'react'
import BaseReactModal from 'react-modal'

const ReactModal = (props:any) => {
    if (props.testMode) {
        return <div className="ReactModalRootContainer">{props.children}</div>
    }

    return <BaseReactModal {...props} />
}

export default ReactModal
