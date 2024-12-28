export default function ColumnsIcon({ fill = 'black', opacity = 1 }) {
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
                d="M6 38V10H42V38H6ZM9 35H17V13H9V35ZM20 35H28V13H20V35ZM31 35H39V13H31V35Z"
                fill={fill}
            />
        </svg>
    );
}
