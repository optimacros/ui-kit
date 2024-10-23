export default function ColumnStackedChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g clipPath="url(#clip0_1_6326)">
                <path d="M0 33H12V48H0V33Z" fill={fill} />
                <path d="M18 24H30V48H18V24Z" fill={fill} />
                <path d="M36 15H48V48H36V15Z" fill={fill} />
                <path d="M0 18H12V30H0V18Z" fill={fill} />
                <path d="M18 9H30V21H18V9Z" fill={fill} />
                <path d="M36 0H48V12H36V0Z" fill={fill} />
            </g>
            <defs>
                <clipPath id="clip0_1_6326">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
