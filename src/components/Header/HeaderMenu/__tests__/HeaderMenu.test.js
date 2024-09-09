import React from 'react'
import renderer from 'react-test-renderer'

import HeaderMenu from 'common/components/HeaderMenu'

describe('HeaderMenu', function () {
    beforeEach(() => {
        this.elements = [
            {
                id: 'element 1',
                title: 'element 1',
                children: [
                    {
                        id: 'element 1.1',
                        title: 'element 1.1',
                    },
                    {
                        id: 'element 1.2',
                        title: 'element 1.2',
                    },
                    {
                        id: 'element 1.3',
                        title: 'element 1.3',
                    },
                    {
                        id: 'element 1.4',
                        title: 'element 1.4',
                    },
                ],
            },
            {
                id: 'element 2',
                title: 'element 2',
                children: [
                    {
                        id: 'element 2.1',
                        title: 'element 2.1',
                        icon: 'list',
                    },
                    {
                        id: 'element 2.2',
                        title: 'element 2.2',
                        icon: 'list',
                        children: [
                            {
                                id: 'element 2.2.1',
                                title: 'element 2.2.1',
                            },
                            {
                                id: 'element 2.2.2',
                                title: 'element 2.2.2',
                            },
                            {
                                id: 'element 2.2.3',
                                title: 'element 2.2.3',
                                icon: 'list',
                                disabled: true,
                            },
                            {
                                id: 'element 2.2.4',
                                title: 'element 2.2.4',
                            },
                        ],
                    },
                    {
                        id: 'element 2.3',
                        title: 'element 2.3',
                        icon: 'list',
                        disabled: true,
                    },
                    {
                        id: 'element 2.4',
                        title: 'element 2.4',
                        icon: 'list',
                    },
                ],
            },
            {
                id: 'element 3',
                title: 'element 3',
                children: [
                    {
                        id: 'element 3.1',
                        title: 'element 3.1',
                    },
                    {
                        id: 'element 3.2',
                        title: 'element 3.2',
                    },
                    {
                        id: 'element 3.3',
                        title: 'element 3.3',
                    },
                    {
                        id: 'element 3.4',
                        title: 'element 3.4',
                    },
                ],
            },
            {
                id: 'element 4',
                title: 'element 4',
                disabled: true,
            },
        ]
    })

    it('simple render menu', () => {
        const component = renderer.create(<HeaderMenu elements={this.elements} />).toJSON()

        expect(component).toMatchSnapshot()
    })
})
