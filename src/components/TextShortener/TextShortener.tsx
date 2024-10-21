import { Fragment } from 'react'

import { useTextShortener } from '../../hooks'

interface Props {
    text: number | string | boolean
    maxLength: number
}

export const TextShortener = ({ text, maxLength }: Props) => {
    const shortText = useTextShortener({ text, maxLength })

    return <Fragment>{shortText}</Fragment>
}
