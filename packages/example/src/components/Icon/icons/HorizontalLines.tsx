export default function HorizontalLinesIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <line x1="1.875" y1="4.375" x2="13.125" y2="4.375" stroke={fill} strokeWidth="1.25" />
            <line x1="1.875" y1="7.5" x2="13.125" y2="7.5" stroke={fill} strokeWidth="1.25" />
            <line x1="1.875" y1="10.625" x2="13.125" y2="10.625" stroke={fill} strokeWidth="1.25" />
        </svg>
    );
}
