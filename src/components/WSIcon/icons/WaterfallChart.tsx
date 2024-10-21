export default function WaterfallChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M40 3H48V45H40V3Z" fill={fill} />
            <path d="M29.3333 3H37.3333V10.875H29.3333V3Z" fill={fill} />
            <path d="M18.6667 3H26.6667V16.125H18.6667V3Z" fill={fill} />
            <path d="M10.6667 18.75H18.6667V29.25H10.6667V18.75Z" fill={fill} />
            <path d="M0 26.625H8V45H0V26.625Z" fill={fill} />
        </svg>
    )
}
