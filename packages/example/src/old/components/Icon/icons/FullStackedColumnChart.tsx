export default function FullStackedColumnChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path d="M0 0H7V14H0V0Z" fill={fill} />
            <path d="M0 16H7V24H0V16Z" fill={fill} />
            <path d="M0 26H7V32H0V26Z" fill={fill} />
            <path d="M12 0H20V6H12V0Z" fill={fill} />
            <path d="M12 8H20V16H12V8Z" fill={fill} />
            <path d="M12 18H20V32H12V18Z" fill={fill} />
            <path d="M25 29H32V32H25V29Z" fill={fill} />
            <path d="M25 18H32V26H25V18Z" fill={fill} />
            <path d="M25 0H32V16H25V0Z" fill={fill} />
        </svg>
    );
}
