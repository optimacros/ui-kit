/* eslint-disable max-len */
import React from 'react'

export default function VisualCellsIcon({ fill = 'black', opacity = 1 }) {
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
                d="M36.4999 5.99984C34.6999 7.99984 34.6999 8.09984 37.2999 10.6998C39.8999 13.2998 39.9999 13.2998 41.9999 11.4998C44.4999 9.29984 44.4999 7.79984 42.1999 5.69984C39.7999 3.49984 38.6999 3.59984 36.4999 5.99984ZM6.39994 10.4998C3.89994 12.9998 3.89994 13.2998 4.19994 26.4998C4.59994 44.0998 3.89994 43.3998 21.4999 43.7998C34.6999 44.0998 34.9999 44.0998 37.4999 41.5998C39.7999 39.2998 39.9999 38.3998 39.9999 29.4998C39.9999 21.6998 39.6999 19.9998 38.4999 19.9998C37.2999 19.9998 36.9999 21.6998 36.9999 29.2998C36.9999 35.1998 36.5999 38.9998 35.7999 39.7998C34.0999 41.4998 9.89994 41.4998 8.19994 39.7998C6.49994 38.0998 6.49994 13.8998 8.19994 12.1998C8.99994 11.3998 12.7999 10.9998 18.6999 10.9998C26.2999 10.9998 27.9999 10.6998 27.9999 9.49984C27.9999 8.29984 26.2999 7.99984 18.4999 7.99984C9.59994 7.99984 8.69994 8.19984 6.39994 10.4998Z"
                fill="black"
            />
            <path
                d="M26.3001 16.3C20.0001 22.6 17.2001 27.6 18.8001 29.2C20.5001 30.9 26.3001 27.4 32.3001 21.3L38.0001 15.4L35.2001 12.7L32.4001 10L26.3001 16.3Z"
                fill={fill}
            />
        </svg>
    )
}
