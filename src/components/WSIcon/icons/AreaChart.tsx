export default function AreaChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 12L10.6667 20L23.3333 2L37.3333 12H48V36L23.3333 16L12 30.6667L0 21.3333V12Z"
                fill={fill}
            />
            <path d="M0 28L13.3333 37.3333L24 24L48 42V46.6667H0V28Z" fill={fill} />
        </svg>
    );
}
