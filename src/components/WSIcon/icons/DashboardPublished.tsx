import React from 'react'

export default function DashboardPublishedIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            height="15"
            style={{ opacity }}
            version="1.1"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z"
                fill={fill}
            />
        </svg>
    )
}
