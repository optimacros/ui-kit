export default function ColumnChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path d="M0 10H8V32H0V10Z" fill={fill} />
            <path d="M24 18H32V32H24V18Z" fill={fill} />
            <path d="M12 0H20V32H12V0Z" fill={fill} />
        </svg>
    );
}
