export default function LinesIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 1.5H3.5V13.5H1.5V1.5ZM6.5 1.5H8.5V13.5H6.5V1.5ZM13.5 1.5H11.5V13.5H13.5V1.5Z"
                fill={fill}
            />
        </svg>
    );
}
