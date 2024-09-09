/* eslint-disable max-len */
import React, { useId } from 'react'

export default function HideIcon({ fill = 'black', opacity = 1 }) {
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
                    d="M24 11.9999C31.58 11.9999 38.34 16.2599 41.64 22.9999C40.46 25.4399 38.8 27.5399 36.82 29.2399L39.64 32.0599C42.42 29.5999 44.62 26.5199 46 22.9999C42.54 14.2199 34 7.9999 24 7.9999C21.46 7.9999 19.02 8.3999 16.72 9.1399L20.02 12.4399C21.32 12.1799 22.64 11.9999 24 11.9999ZM21.86 14.2799L26 18.4199C27.14 18.9199 28.06 19.8399 28.56 20.9799L32.7 25.1199C32.86 24.4399 32.98 23.7199 32.98 22.9799C33 18.0199 28.96 13.9999 24 13.9999C23.26 13.9999 22.56 14.0999 21.86 14.2799ZM4.02 7.7399L9.38 13.0999C6.12 15.6599 3.54 19.0599 2 22.9999C5.46 31.7799 14 37.9999 24 37.9999C27.04 37.9999 29.96 37.4199 32.64 36.3599L39.48 43.1999L42.3 40.3799L6.84 4.8999L4.02 7.7399ZM19.02 22.7399L24.24 27.9599C24.16 27.9799 24.08 27.9999 24 27.9999C21.24 27.9999 19 25.7599 19 22.9999C19 22.8999 19.02 22.8399 19.02 22.7399ZM12.22 15.9399L15.72 19.4399C15.26 20.5399 15 21.7399 15 22.9999C15 27.9599 19.04 31.9999 24 31.9999C25.26 31.9999 26.46 31.7399 27.54 31.2799L29.5 33.2399C27.74 33.7199 25.9 33.9999 24 33.9999C16.42 33.9999 9.66 29.7399 6.36 22.9999C7.76 20.1399 9.8 17.7799 12.22 15.9399Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect
                        fill="white"
                        height="48"
                        width="48"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}
