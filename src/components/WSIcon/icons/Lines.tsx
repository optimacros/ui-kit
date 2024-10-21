export default function LinesIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M1.5 1.5H3.5V13.5H1.5V1.5ZM6.5 1.5H8.5V13.5H6.5V1.5ZM13.5 1.5H11.5V13.5H13.5V1.5Z"
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}
