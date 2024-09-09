/* eslint-disable max-len */
import React from 'react'

export default function AddCommentIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22.5 28H25.5V21.5H32V18.5H25.5V12H22.5V18.5H16V21.5H22.5V28ZM4 44V7C4 6.23333 4.3 5.54167 4.9 4.925C5.5 4.30833 6.2 4 7 4H41C41.7667 4 42.4583 4.30833 43.075 4.925C43.6917 5.54167 44 6.23333 44 7V33C44 33.7667 43.6917 34.4583 43.075 35.075C42.4583 35.6917 41.7667 36 41 36H12L4 44ZM7 36.75L10.75 33H41V7H7V36.75Z"
                fill={fill}
            />
        </svg>
    )
}
