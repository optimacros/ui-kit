/* eslint-disable max-len */


export default function WidgetsIcon({ fill = 'black', opacity = 1 }) {
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
                d="M33.95 24.6999L23.3 14.0499L33.95 3.3999L44.6 14.0499L33.95 24.6999ZM6 21.0999V6.0499H21.05V21.0999H6ZM26.9 41.9999V26.9499H41.95V41.9999H26.9ZM6 41.9999V26.9499H21.05V41.9999H6ZM9 18.0999H18.05V9.0499H9V18.0999ZM34.1 20.6499L40.55 14.1999L34.1 7.7499L27.65 14.1999L34.1 20.6499ZM29.9 38.9999H38.95V29.9499H29.9V38.9999ZM9 38.9999H18.05V29.9499H9V38.9999Z"
                fill={fill}
            />
        </svg>
    )
}
