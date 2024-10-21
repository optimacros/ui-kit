export default function HorizontalLinesIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line stroke={fill} strokeWidth="1.25" x1="1.875" x2="13.125" y1="4.375" y2="4.375" />
            <line stroke={fill} strokeWidth="1.25" x1="1.875" x2="13.125" y1="7.5" y2="7.5" />
            <line stroke={fill} strokeWidth="1.25" x1="1.875" x2="13.125" y1="10.625" y2="10.625" />
        </svg>
    )
}
