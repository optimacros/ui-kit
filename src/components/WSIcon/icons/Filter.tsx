import { useId } from 'react';

export default function FilterIcon({ fill = 'black', opacity = 1 }) {
    const clipPathId = useId();

    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    d="M14.0001 12H34.0001L23.9801 24.6L14.0001 12ZM8.50011 11.22C12.5401 16.4 20.0001 26 20.0001 26V38C20.0001 39.1 20.9001 40 22.0001 40H26.0001C27.1001 40 28.0001 39.1 28.0001 38V26C28.0001 26 35.4401 16.4 39.4801 11.22C40.5001 9.9 39.5601 8 37.9001 8H10.0801C8.42011 8 7.48011 9.9 8.50011 11.22Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect fill="white" height="48" width="48" />
                </clipPath>
            </defs>
        </svg>
    );
}
