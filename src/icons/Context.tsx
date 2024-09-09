
export default function ContextIcon({ fill = 'black', opacity = 1 }) {
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
                d="M0 5H9.6V43.4H0V5Z"
                fill={fill}
            />
            <path
                d="M19.2 5H28.8V43.4H19.2V5Z"
                fill={fill}
            />
            <path
                d="M38.4 5H48V43.4H38.4V5Z"
                fill={fill}
            />
        </svg>
    )
}
