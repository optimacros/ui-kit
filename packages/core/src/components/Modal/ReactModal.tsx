import React from 'react';
import BaseReactModal from 'react-modal';

type Props = React.ComponentProps<typeof BaseReactModal> & {
    testMode: boolean;
};

const ReactModal = (props: Props) => {
    const { testMode, ...propsForBaseReactModal } = props;

    if (testMode) {
        return <div className="ReactModalRootContainer">{props.children}</div>;
    }

    return <BaseReactModal {...propsForBaseReactModal} />;
};

export default ReactModal;
