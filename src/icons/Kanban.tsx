/* eslint-disable max-len */
import React from 'react'

export default function KanbanIcon({ fill = 'black', opacity = 1 }) {
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
                d="M13.95 34.15H16.95V13.85H13.95V34.15ZM22.5 24.15H25.5V13.85H22.5V24.15ZM31.05 30.15H34.05V13.85H31.05V30.15ZM9 42C8.2 42 7.5 41.7 6.9 41.1C6.3 40.5 6 39.8 6 39V9C6 8.2 6.3 7.5 6.9 6.9C7.5 6.3 8.2 6 9 6H39C39.8 6 40.5 6.3 41.1 6.9C41.7 7.5 42 8.2 42 9V39C42 39.8 41.7 40.5 41.1 41.1C40.5 41.7 39.8 42 39 42H9ZM9 39H39V9H9V39Z"
                fill={fill}
            />
        </svg>
    )
}
