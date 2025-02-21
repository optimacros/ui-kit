import { useId } from '../../../utils/useId';

export default function ActionIcon({ fill = 'black', opacity = 1 }) {
    const clipPathId = useId();

    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    d="M30 10L27.18 12.82L30 15.66L34.34 20H16C10.48 20 6 24.48 6 30V38H10V30C10 26.7 12.7 24 16 24H34.34L30 28.34L27.18 31.16L30 34L42 22L30 10Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
