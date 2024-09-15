

export default function BarChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 32 32"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 0H22V8H0V0Z"
                fill={fill}
            />
            <path
                d="M0 12H32V20H0V12Z"
                fill={fill}
            />
            <path
                d="M0 24H14V32H0V24Z"
                fill={fill}
            />
        </svg>
    )
}
