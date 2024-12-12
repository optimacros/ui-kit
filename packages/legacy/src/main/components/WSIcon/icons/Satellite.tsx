/* eslint-disable max-len */

export default function SatelliteIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            height="15"
            style={{ opacity }}
            viewBox="0 -960 960 960"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M234-280h490L577-476 445-305l-93-127-118 152Zm6-218q93 0 157.5-64.75T462-720h-54q0 70-48.837 119T240-552v54Zm0-131q39 0 67-26.688 28-26.687 28-64.312h-95v91Zm-60 509q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0 0v-600 600Z"
                fill={fill}
            />
        </svg>
    );
}
