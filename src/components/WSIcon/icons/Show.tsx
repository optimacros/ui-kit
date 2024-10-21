/* eslint-disable max-len */
import { useId } from 'react'

export default function ShowIcon({ fill = 'black', opacity = 1 }) {
    const clipPathId = useId()

    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    d="M24 12C31.58 12 38.34 16.26 41.64 23C38.34 29.74 31.58 34 24 34C16.42 34 9.66 29.74 6.36 23C9.66 16.26 16.42 12 24 12ZM24 8C14 8 5.46 14.22 2 23C5.46 31.78 14 38 24 38C34 38 42.54 31.78 46 23C42.54 14.22 34 8 24 8ZM24 18C26.76 18 29 20.24 29 23C29 25.76 26.76 28 24 28C21.24 28 19 25.76 19 23C19 20.24 21.24 18 24 18ZM24 14C19.04 14 15 18.04 15 23C15 27.96 19.04 32 24 32C28.96 32 33 27.96 33 23C33 18.04 28.96 14 24 14Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect fill="white" height="48" width="48" />
                </clipPath>
            </defs>
        </svg>
    )
}
