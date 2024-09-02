import React from 'react'
import { app } from 'global/app'
import renderer from 'react-test-renderer'
import TreeLineMenu from 'common/widgets/TreeMenu/TreeLineMenu'
import { BaseMenu, TreeMenu, CheckBoxMenu } from 'common/widgets'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext as dragDropContext } from 'react-dnd'
import ZoomUtils from 'packages/corplan-utils/ZoomUtils'

import listWithLessParentByUamMock from './__fixtures__/listWithLessParentByUamMock'
import listWithLessParentByHideShowMock from './__fixtures__/listWithLessParentByHideShowMock'

@dragDropContext(HTML5Backend)
class DndDecorator extends React.Component {
    render() {
        return this.props.children
    }
}

describe('TreeMenu', function() {
    beforeEach(() => {
        app.instance('language', {
            getText(key) {
                const text = {
                    theParentElementDoesNotExist: "The parent element doesn't exist",
                }

                if (text[key]) {
                    return text[key]
                }

                throw new Error(`The argument is not valid: ${key}`)
            },
        })

        app.singleton('zoomUtils', ZoomUtils)

        app.instance('ui', {
            zoom: {
                current: 1,
            },
        })

        app.instance('workspace', {
            config: {
                constants: {
                    BASE_MENU_ELEMENT_HEIGHT: 25,
                    BASE_MENU_ELEMENT_HEIGHT_ZOOM_1: 23,
                    BASE_MENU_ELEMENT_PADDING_BOTTOM: 6,
                    BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_1: 3,
                    BASE_MENU_PADDING_LEFT_ELEMENT: 28,
                    BASE_MENU_PADDING_LEFT_ELEMENT_ZOOM_1: 19,
                    BASE_MENU_COUNT_ELEMENTS: 30,
                    BASE_MENU_COUNT_ELEMENTS_ZOOM_1: 35,
                    BASE_MENU_STATIC_OFFSET_ELEMENT: 12,
                },
            },
        })

        this.elements = [
            { entityLongId: 1, parentEntityLongId: -1, type: 'time', icon: 'access_time', title: 'Time' },
            { entityLongId: 2, parentEntityLongId: -1, type: 'versions', icon: 'loop', title: 'Versions' },
            { entityLongId: 3, parentEntityLongId: -1, type: 'users', icon: 'people', title: 'Users' },
            {
                entityLongId: 4,
                parentEntityLongId: -1,
                disabled: true,
                type: 'contents',
                icon: 'view_list',
                title: 'Contents',
            },
            {
                entityLongId: 5,
                parentEntityLongId: -1,
                disabled: true,
                type: 'macroses',
                icon: 'play_circle_outline',
                title: 'Macroses',
            },
            {
                entityLongId: 6,
                parentEntityLongId: -1,
                disabled: true,
                type: 'documentFlow',
                icon: 'play_circle_outline',
                title: 'Document Flow',
            },
            { entityLongId: 7, parentEntityLongId: -1, type: 'modules', icon: 'view_module', title: 'Powercubes' },
            {
                entityLongId: 8,
                parentEntityLongId: -1,
                disabled: true,
                type: 'dashboards',
                icon: 'dashboard',
                title: 'Dashboards',
            },
            {
                entityLongId: 9,
                parentEntityLongId: -1,
                disabled: true,
                type: 'dashboards',
                icon: 'dashboard',
                title: 'Flexible Reporting',
            },
            {
                type: 'history',
                icon: 'history',
                title: 'History',
                entityLongId: 10,
                parentEntityLongId: -1,
            },
            { entityLongId: 11, parentEntityLongId: 10, type: 'time', icon: 'access_time', title: 'Time' },
            { entityLongId: 12, parentEntityLongId: 10, type: 'versions', icon: 'loop', title: 'Versions' },
            { entityLongId: 13, parentEntityLongId: 10, type: 'users', icon: 'people', title: 'Users' },
            {
                entityLongId: 14,
                parentEntityLongId: 10,
                disabled: true,
                type: 'contents',
                icon: 'view_list',
                title: 'Contents',
            },
            {
                entityLongId: 15,
                parentEntityLongId: 10,
                disabled: true,
                type: 'macroses',
                icon: 'play_circle_outline',
                title: 'Macroses',
            },
        ]
    })

    it('render BaseMenu', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <BaseMenu
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render BaseMenu "maxHeight"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <BaseMenu
                        maxHeight={250}
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render BaseMenu "isStatic"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <BaseMenu
                        isStatic
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render BaseMenu "activeByDefault"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <BaseMenu
                        activeByDefault
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render TreeMenu', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeMenu
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render TreeMenu "maxHeight"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeMenu
                        maxHeight={250}
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render TreeMenu "isStatic"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeMenu
                        isStatic
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render TreeMenu "activeByDefault"', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeMenu
                        activeByDefault
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render CheckBoxMenu', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <CheckBoxMenu
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('render TreeLineMenu', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeLineMenu
                        elements={this.elements}
                        onSelect={(item) => {}}
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('list with less parent element by UAM', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeLineMenu
                        elements={listWithLessParentByUamMock}
                        onSelect={(item) => {}}
                        scrollToFirstDisabledItem
                        activeByDefault
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })

    it('list with less parent element by hide/show', () => {
        const component = renderer
            .create(
                <DndDecorator>
                    <TreeLineMenu
                        elements={listWithLessParentByHideShowMock}
                        onSelect={(item) => {}}
                        scrollToFirstDisabledItem
                        activeByDefault
                    />
                </DndDecorator>,
            )
            .toJSON()

        expect(component).toMatchSnapshot()
    })
})
