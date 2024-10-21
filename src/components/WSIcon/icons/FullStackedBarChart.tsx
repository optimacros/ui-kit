export default function FullStackedBarChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1_6568)">
                <rect fill={fill} height="10" width="24" />
                <rect fill={fill} height="10" width="12" x="27" />
                <rect fill={fill} height="10" width="5" x="43" />
                <rect fill={fill} height="12" width="9" y="18" />
                <rect fill={fill} height="10" width="21" y="38" />
                <rect fill={fill} height="10" width="12" x="24" y="38" />
                <rect fill={fill} height="10" width="9" x="39" y="38" />
                <rect fill={fill} height="12" width="12" x="12" y="18" />
                <rect fill={fill} height="12" width="21" x="27" y="18" />
            </g>
            <defs>
                <clipPath id="clip0_1_6568">
                    <rect fill="white" height="48" width="48" />
                </clipPath>
            </defs>
        </svg>
    )
}
