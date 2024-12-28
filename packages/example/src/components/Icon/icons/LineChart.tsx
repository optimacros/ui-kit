export default function LineChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <circle cx="4.33333" cy="32.6668" r="4.33333" fill={fill} />
            <circle cx="19.5" cy="17.4998" r="4.33333" fill={fill} />
            <circle cx="30.3333" cy="28.3333" r="4.33333" fill={fill} />
            <circle cx="43.3333" cy="15.3333" r="4.33333" fill={fill} />
            <path
                d="M4.33331 32.667L19.5 17.5002L30.3333 28.3335L43.3333 15.3335"
                stroke={fill}
                strokeWidth="3"
            />
        </svg>
    );
}
