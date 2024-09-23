import { ArgTypes, Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './index'
import { Tab } from './Tab.tsx'

const argTypes: Partial<ArgTypes> = {
    active: {
        control: 'number',
        description: 'The value of the currently selected `Tab`.',
    },
    draggable: {
        control: 'boolean',
        description: 'If `true`, tabs are draggable.',
    },
    hideTabHeader: {
        control: 'boolean',
        description: '',
    },
    theme: { table: { disable: true } },
    className: { table: { disable: true } },
    headerClassName: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onTabSwitch: { table: { disable: true } },
    onTabPositionChange: { table: { disable: true } },
}

const meta: Meta<typeof Tabs> = {
    title: 'UI Kit core/Tabs',
    // @ts-ignore
    component: Tabs,
    argTypes,
}
export default meta

type Story = StoryObj<typeof Tabs>

const BasicTemplate: Story = {
    render: ({ ...args }) => {
        const [activeTab, setActiveTab] = useState(0)

        return (
            <Tabs
                {...args}
                active={activeTab}
                onChange={(activeTabNumber: number)=> setActiveTab(activeTabNumber)}
            >
                <Tab
                    title="Item one"
                    icon="favorite"
                >
                    Item one
                </Tab>
                <Tab
                    label="Item two"
                    icon="people"
                >
                    Item two
                </Tab>
                <Tab
                    title="Item three"
                >
                    Item three
                </Tab>
            </Tabs>
        )
    },
}

const Template: Story = {
    render: ({ ...args }) => {
        const [tabs, setTabs] = useState(['Tab 1', 'Tab 2', 'Tab 3'])
        const [activeTab, setActiveTab] = useState(0)

        const handleTabPositionChange = (newPosition: number, oldPosition: number) => {
            const updatedTabs = [...tabs]

            const tabOnTargetPosition = updatedTabs[newPosition]
            updatedTabs[newPosition] = updatedTabs[oldPosition]
            updatedTabs[oldPosition] = tabOnTargetPosition

            setTabs(updatedTabs)
        }

        return (
            <Tabs
                {...args}
                active={activeTab}
                onTabPositionChange={handleTabPositionChange}
                onChange={(activeTabNumber: number)=> setActiveTab(activeTabNumber)}
            >
                {tabs.map(tab => {
                    return (
                        <Tab title={tab}
                            key={tab}
                        >
                            {tab}
                        </Tab>
                    )
                })}
            </Tabs>
        )
    },
}

export const Basic: Story = {
    ...BasicTemplate,
    args: { },
}

export const Draggable: Story = {
    ...Template,
    args: {
        // @ts-ignore
        draggable: true,
    },
}
