import { getAnimationModule, removeNamespace, transformKeys } from '../utils'

describe('react-toolbox-utils/utils', () => {
    describe('getAnimationModule', () => {
        const theme = {
            header: 'Calendar-module__header___rbJXX',
            input: 'Calendar-module__input____oEvd',
            disabled: 'Calendar-module__disabled___iVK2Q',
            inputElement: 'Calendar-module__inputElement___SY_ul',
            year: 'Calendar-module__year___MxqH_',
            date: 'Calendar-module__date___UgUSr',
            calendarWrapper: 'Calendar-module__calendarWrapper___KIo9E',
            yearsDisplay: 'Calendar-module__yearsDisplay___kOMfQ',
            monthsDisplay: 'Calendar-module__monthsDisplay___n9UGr',
            dialog: 'Calendar-module__dialog___Eachf',
            button: 'Calendar-module__button___ij8vN',
            calendar: 'Calendar-module__calendar___Vu2gr',
            next: 'Calendar-module__next___S86c6',
            prev: 'Calendar-module__prev___e3mL4',
            title: 'Calendar-module__title___nCeo_',
            years: 'Calendar-module__years___r4k7G',
            active: 'Calendar-module__active___QYljz',
            week: 'Calendar-module__week___LMIqM',
            days: 'Calendar-module__days___NSjfQ',
            day: 'Calendar-module__day___ONqbP',
            month: 'Calendar-module__month___RdvP6',
            slideRightEnter: 'Calendar-module__slideRightEnter___lSPCd',
            slideRightLeave: 'Calendar-module__slideRightLeave___ibO3W',
            slideRightEnterActive: 'Calendar-module__slideRightEnterActive___W9VAO',
            slideRightLeaveActive: 'Calendar-module__slideRightLeaveActive___kQ4FN',
            slideLeftEnter: 'Calendar-module__slideLeftEnter___DVD4v',
            slideLeftLeave: 'Calendar-module__slideLeftLeave___RyL48',
            slideLeftEnterActive: 'Calendar-module__slideLeftEnterActive___kp6Z1',
            slideLeftLeaveActive: 'Calendar-module__slideLeftLeaveActive___X_5d7',
            navigation: 'Calendar-module__navigation___Irxd3',
            wrapper: 'Calendar-module__wrapper___bP_7j',
        }

        it('slideRight', () => {
            const animation = 'slideRight'

            const result = getAnimationModule(animation, theme)

            expect(result).toEqual({
                enter: 'Calendar-module__slideRightEnter___lSPCd',
                leave: 'Calendar-module__slideRightLeave___ibO3W',
                enterActive: 'Calendar-module__slideRightEnterActive___W9VAO',
                leaveActive: 'Calendar-module__slideRightLeaveActive___kQ4FN',
            })
        })

        it('slideLeft', () => {
            const animation = 'slideLeft'
            const result = getAnimationModule(animation, theme)

            expect(result).toEqual({
                enter: 'Calendar-module__slideLeftEnter___DVD4v',
                leave: 'Calendar-module__slideLeftLeave___RyL48',
                enterActive: 'Calendar-module__slideLeftEnterActive___kp6Z1',
                leaveActive: 'Calendar-module__slideLeftLeaveActive___X_5d7',
            })
        })
    })

    describe('removeNamespace', () => {
        it('slideRight - slideRightEnter', () => {
            const namespace = 'slideRight'
            const key = 'slideRightEnter'

            const result = removeNamespace(namespace)(key)

            expect(result).toEqual('enter')
        })

        it('slideRight - slideRightEnterActive', () => {
            const namespace = 'slideRight'
            const key = 'slideRightEnterActive'

            const result = removeNamespace(namespace)(key)

            expect(result).toEqual('enterActive')
        })

        it('slideLeft - slideLeftEnter', () => {
            const namespace = 'slideLeft'
            const key = 'slideLeftEnter'

            const result = removeNamespace(namespace)(key)

            expect(result).toEqual('enter')
        })

        it('slideLeft - slideLeftEnterActive', () => {
            const namespace = 'slideLeft'
            const key = 'slideLeftEnterActive'

            const result = removeNamespace(namespace)(key)

            expect(result).toEqual('enterActive')
        })
    })

    describe('transformKeys', () => {
        it('slideRight', () => {
            const namespace = 'slideRight'
            const data = {
                slideRightEnter: 'Calendar-module__slideRightEnter___lSPCd',
                slideRightLeave: 'Calendar-module__slideRightLeave___ibO3W',
                slideRightEnterActive: 'Calendar-module__slideRightEnterActive___W9VAO',
                slideRightLeaveActive: 'Calendar-module__slideRightLeaveActive___kQ4FN',
            }

            const result = transformKeys(data, removeNamespace(namespace))

            expect(result).toEqual({
                enter: 'Calendar-module__slideRightEnter___lSPCd',
                leave: 'Calendar-module__slideRightLeave___ibO3W',
                enterActive: 'Calendar-module__slideRightEnterActive___W9VAO',
                leaveActive: 'Calendar-module__slideRightLeaveActive___kQ4FN',
            })
        })

        it('slideLeft - slideLeftEnterActive', () => {
            const namespace = 'slideLeft'
            const data = {
                slideLeftEnter: 'Calendar-module__slideLeftEnter___DVD4v',
                slideLeftLeave: 'Calendar-module__slideLeftLeave___RyL48',
                slideLeftEnterActive: 'Calendar-module__slideLeftEnterActive___kp6Z1',
                slideLeftLeaveActive: 'Calendar-module__slideLeftLeaveActive___X_5d7',
            }

            const result = transformKeys(data, removeNamespace(namespace))

            expect(result).toEqual({
                enter: 'Calendar-module__slideLeftEnter___DVD4v',
                leave: 'Calendar-module__slideLeftLeave___RyL48',
                enterActive: 'Calendar-module__slideLeftEnterActive___kp6Z1',
                leaveActive: 'Calendar-module__slideLeftLeaveActive___X_5d7',
            })
        })
    })
})
