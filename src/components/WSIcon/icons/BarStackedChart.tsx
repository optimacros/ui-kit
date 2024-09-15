

export default function BarStackedChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1_6548)">
                <path
                    d="M0 0H15V12H0V0Z"
                    fill={fill}
                />
                <path
                    d="M0 18H24V30H0V18Z"
                    fill={fill}
                />
                <path
                    d="M0 36H33V48H0V36Z"
                    fill={fill}
                />
                <path
                    d="M18 0H30V12H18V0Z"
                    fill={fill}
                />
                <path
                    d="M27 18H39V30H27V18Z"
                    fill={fill}
                />
                <path
                    d="M36 36H48V48H36V36Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_1_6548">
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
