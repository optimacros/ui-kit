export default function PublishIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 48 48"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity }}
        >
            <g
                transform="translate(0,48) scale(0.1,-0.1)"
                fill={fill}
                stroke="none"
            >
                <path
                    d="M52 428 c-17 -17 -17 -359 0 -376 19 -19 362 -17 377 2 18 22 10 161
                    -9 161 -11 0 -16 -16 -20 -65 l-5 -65 -155 0 -155 0 0 155 0 155 65 5 c49 4
                    65 9 65 20 0 20 -144 27 -163 8z"
                />
                <path
                    d="M295 430 c-11 -17 5 -30 38 -30 l31 0 -73 -74 c-51 -51 -72 -79 -68
                    -90 11 -28 31 -17 102 54 l70 71 5 -33 c3 -20 11 -33 20 -33 12 0 16 16 18 73
                    l3 72 -70 0 c-38 0 -73 -4 -76 -10z"
                />
            </g>
        </svg>
    )
}
