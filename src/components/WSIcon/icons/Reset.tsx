/* eslint-disable max-len */


export default function ResetIcon({ fill = 'black', opacity = 1 }) {
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
                d="M22.55 41.8999C18.45 41.5666 15 39.8832 12.2 36.8499C9.4 33.8166 8 30.2166 8 26.0499C8 23.4832 8.59167 21.0666 9.775 18.7999C10.9583 16.5332 12.6167 14.6832 14.75 13.2499L16.9 15.3999C15.0333 16.4999 13.5833 18.0082 12.55 19.9249C11.5167 21.8416 11 23.8832 11 26.0499C11 29.3832 12.1 32.2666 14.3 34.6999C16.5 37.1332 19.25 38.5332 22.55 38.8999V41.8999ZM25.55 41.8999V38.8999C28.8833 38.4999 31.6333 37.0916 33.8 34.6749C35.9667 32.2582 37.05 29.3832 37.05 26.0499C37.05 22.4166 35.7917 19.3416 33.275 16.8249C30.7583 14.3082 27.6833 13.0499 24.05 13.0499H23.05L26.05 16.0499L23.9 18.1999L17.25 11.5499L23.9 4.8999L26.05 7.0499L23.05 10.0499H24.05C28.5167 10.0499 32.3 11.6082 35.4 14.7249C38.5 17.8416 40.05 21.6166 40.05 26.0499C40.05 30.2166 38.6583 33.8166 35.875 36.8499C33.0917 39.8832 29.65 41.5666 25.55 41.8999Z"
                fill={fill}
            />
        </svg>
    )
}
