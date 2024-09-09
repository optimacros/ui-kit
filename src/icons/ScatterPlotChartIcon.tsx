import { useId } from 'react'

export default function ScatterPlotChartIcon({ fill = 'black', opacity = 1 }) {
    const clipPathId = useId()

    return (
        <svg
            fill="none"
            height="18"
            style={{ opacity }}
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    d="M1.6875 1.57507V16.2001C1.6875 16.2622 1.73787 16.3126 1.8 16.3126H16.425"
                    stroke="#212121"
                    strokeLinecap="round"
                    strokeWidth="1.6875"
                />
                <circle
                    cx="6.1875"
                    cy="7.3125"
                    fill={fill}
                    r="1.6875"
                />
                <circle
                    cx="10.6875"
                    cy="3.9375"
                    fill={fill}
                    r="1.6875"
                />
                <circle
                    cx="10.6875"
                    cy="11.8125"
                    fill={fill}
                    r="1.6875"
                />
            </g>

            <defs>
                <clipPath id={clipPathId}>
                    <rect
                        fill="white"
                        height="18"
                        width="18"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}
