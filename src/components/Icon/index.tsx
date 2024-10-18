import { SVGProps } from 'react'

export const createIconSprite = (spriteSrc:string) => function Icon({
    name,
    ...svgProps
}: SVGProps<SVGSVGElement> & { name: string }) {
    return (
        <svg
            {...svgProps}
            data-recipe="Icon"
        >
            <use href={`${spriteSrc}#${name}`} />
        </svg>
    )
}
