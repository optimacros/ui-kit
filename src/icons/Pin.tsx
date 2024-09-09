/* eslint-disable max-len */
import React from 'react'

export default function Pin({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 24 24"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1"
                fill={fill}
            />
        </svg>
    )
}
