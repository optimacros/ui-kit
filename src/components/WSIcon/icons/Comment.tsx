/* eslint-disable max-len */

export default function CommentIcon({ fill = 'black' }) {
    return (
        <svg
            fill="none"
            height="15"
            viewBox="0 0 20 20"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.83333 10H5.505C5.17578 9.99993 4.85391 10.0974 4.58 10.28L2.5 11.6667V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H10C10.442 2.5 10.866 2.67559 11.1785 2.98816C11.4911 3.30072 11.6667 3.72464 11.6667 4.16667V5.83333M10 8.33333H15.8333C16.2754 8.33333 16.6993 8.50893 17.0118 8.82149C17.3244 9.13405 17.5 9.55797 17.5 10V17.5L15.42 16.1133C15.1461 15.9307 14.8242 15.8333 14.495 15.8333H10C9.55797 15.8333 9.13405 15.6577 8.82149 15.3452C8.50893 15.0326 8.33333 14.6087 8.33333 14.1667V10C8.33333 9.55797 8.50893 9.13405 8.82149 8.82149C9.13405 8.50893 9.55797 8.33333 10 8.33333Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.4"
            />
        </svg>
    )
}
