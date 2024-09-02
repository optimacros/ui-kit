import { ArgTypes, Meta, StoryObj } from "@storybook/react"

import { Modal } from "./index"
import { useState } from "react";
import { FontIcon } from "../FontIcon";

const argTypes: Partial<ArgTypes> = {
    isOpen: {
        control: "boolean",
        description: "If `true`, modal is shown."
    },
    compact: {
        control: "boolean",
        description: "If `true`, modal becomes more compact by reducing the padding."
    },
    nonDraggable: {
        control: "boolean",
        description: ''
    },
    isFatalError: {
        control: "boolean",
        description: "If `true`, hide modal close button."
    },
    title: {
        control: "text",
        description: "Modal header title."
    },
    draggableTarget: {
        control: "text",
        description: "Classname or id. If there is an element with the passed class/id inside the modal window, then moving is possible by pressing and holding this element."
    },
    className: { table: { disable: true } },
    headerClassName: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    customHeaderButton: { table: { disable: true } },
    children: { table: { disable: true } },
}

const meta: Meta<typeof Modal> = {
    title: "UI Kit lite/Modal",
    component: Modal,
    argTypes
}
export default meta

type Story = StoryObj<typeof Modal>

const Template: Story = {
    render: ({ ...args }) => {
        const [isOpen, setIsOpen] = useState(false);
        
        return (
            <div>
                <button onClick={() => setIsOpen(true)}>Open modal</button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                >
                    {args.children}
                </Modal>
            </div>
        );
    },
};

export const Draggable = {
    ...Template,
    args: {
        title: "Modal name",
        children: <div style={{ color: "black" }}>Modal content</div>,
    },
};


export const NonDraggable = {
    ...Template,
    args: {
        title: "Modal name",
        nonDraggable: true,
        children: <div style={{ color: "black" }}>Modal content</div>,
    },
}

export const DraggableTarget = {
    ...Template,
    args: {
        title: "Modal name",
        draggableTarget: ".handIcon",
        children: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "black" }}>Modal content</div>
                <FontIcon className="handIcon" value="pan_tool" />
            </div>
        ),
    },
}

export const CustomHeaderButton = {
    ...Template,
    args: {
        title: "Modal name",
        customHeaderButton: <FontIcon value="settings" />,
        children: <div style={{ color: "black" }}>Modal content</div>,
    },
}

export const Compact = {
    ...Template,
    args: {
        title: "Modal name",
        compact: true,
        children:  <div style={{ color: "black" }}>Modal content</div>,
    },
}

export const Error = {
    ...Template,
    args: {
        title: "Modal name",
        isFatalError: true,
        children: <div style={{ color: "black" }}>Modal content</div>,
    },
}

