/* eslint-disable max-len */
import React from 'react'

export default function RiskManagerChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_209_16)">
                <path
                    clipRule="evenodd"
                    d="M2.4 0H0V48H2.4V0ZM2.4 48H48V45.6H42.4463C40.5151 43.8123 36.1182 37.7972 34.789 28.0498C33.3484 17.4855 27.7755 14.3797 24.3 14.3995C20.8245 14.3797 15.2516 17.4855 13.811 28.0498C13.1084 33.2019 11.6961 37.3268 10.2307 40.3414C8.91491 43.0484 7.59019 44.7925 6.74773 45.6H2.4V48ZM24.5081 16.8069C26.5609 16.9301 31.1234 18.9315 32.411 28.3741C33.5335 36.6054 36.7478 42.466 39.2226 45.6L9.89336 45.6C10.7001 44.5044 11.5628 43.0907 12.3893 41.3906C13.9639 38.1511 15.4516 33.7819 16.189 28.3741C17.4766 18.9315 22.0391 16.9301 24.0919 16.8069L24.092 16.8084C24.1569 16.8034 24.2263 16.8007 24.3 16.8006C24.3737 16.8007 24.4431 16.8034 24.508 16.8084L24.5081 16.8069Z"
                    fill={fill}
                    fillRule="evenodd"
                />
            </g>
            <defs>
                <clipPath id="clip0_209_16">
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
