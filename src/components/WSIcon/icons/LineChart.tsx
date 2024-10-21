export default function LineChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="4.33333" cy="32.6668" fill={fill} r="4.33333" />
            <circle cx="19.5" cy="17.4998" fill={fill} r="4.33333" />
            <circle cx="30.3333" cy="28.3333" fill={fill} r="4.33333" />
            <circle cx="43.3333" cy="15.3333" fill={fill} r="4.33333" />
            <path
                d="M4.33331 32.667L19.5 17.5002L30.3333 28.3335L43.3333 15.3335"
                stroke={fill}
                strokeWidth="3"
            />
        </svg>
    )
}
