/* eslint-disable max-len */

export default function PieChartIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 40 40"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20Z"
                fill={fill}
            />
            <path
                d="M18 3.87118H22V36.2114H18V3.87118Z"
                fill={fill}
            />
            <path
                d="M36.5 18V22H21.8985V18H36.5Z"
                fill={fill}
            />
        </svg>
    )
}
