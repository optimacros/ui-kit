/* eslint-disable max-len */
import React from 'react'

export default function ClockIcon({ fill = 'black' }) {
    return (
        <svg
            height="15"
            viewBox="0 -960 960 960"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                fill={fill}
            />
        </svg>
    )
}
