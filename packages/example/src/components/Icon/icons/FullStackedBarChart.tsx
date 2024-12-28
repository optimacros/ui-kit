export default function FullStackedBarChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g clipPath="url(#clip0_1_6568)">
                <rect width="24" height="10" fill={fill} />
                <rect x="27" width="12" height="10" fill={fill} />
                <rect x="43" width="5" height="10" fill={fill} />
                <rect y="18" width="9" height="12" fill={fill} />
                <rect y="38" width="21" height="10" fill={fill} />
                <rect x="24" y="38" width="12" height="10" fill={fill} />
                <rect x="39" y="38" width="9" height="10" fill={fill} />
                <rect x="12" y="18" width="12" height="12" fill={fill} />
                <rect x="27" y="18" width="21" height="12" fill={fill} />
            </g>
            <defs>
                <clipPath id="clip0_1_6568">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
