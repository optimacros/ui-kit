/* eslint-disable max-len */


export default function EditModeIcon({ fill = 'black', opacity = 1 }) {
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
                d="M24 42V38.45L34.8 27.65L38.35 31.2L27.55 42H24ZM6 31.5V28.5H21V31.5H6ZM40.5 29.05L36.95 25.5L38.4 24.05C38.6667 23.7833 39.0167 23.65 39.45 23.65C39.8833 23.65 40.2333 23.7833 40.5 24.05L41.95 25.5C42.2167 25.7667 42.35 26.1167 42.35 26.55C42.35 26.9833 42.2167 27.3333 41.95 27.6L40.5 29.05ZM6 23.25V20.25H29.5V23.25H6ZM6 15V12H29.5V15H6Z"
                fill={fill}
            />
        </svg>
    )
}
