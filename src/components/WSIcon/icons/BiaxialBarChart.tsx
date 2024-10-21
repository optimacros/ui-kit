export default function BiaxialBarChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M39 0H45V48H39V0Z" fill={fill} />
            <path d="M27 12H33V48H27V12Z" fill={fill} />
            <path d="M15 6H21V48H15V6Z" fill={fill} />
            <path d="M3 24H9V48H3V24Z" fill={fill} />
        </svg>
    );
}
