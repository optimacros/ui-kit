export default function IconModule({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g clipPath="url(#clip0_43_120)">
                <path d="M0 0H4.8V4.8V14.4V19.2V28.8V33.6V43.2V48H0V0Z" fill={fill} />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48 0H4.8V4.8H14.4V14.4H4.8V19.2H14.4V28.8H4.8V33.6H14.4V43.2H4.8V48H48V0ZM28.8 4.8H19.2V14.4H28.8V4.8ZM43.2 4.8H33.6V14.4H43.2V4.8ZM28.8 19.2H19.2V28.8H28.8V19.2ZM43.2 19.2H33.6V28.8H43.2V19.2ZM33.6 43.2V33.6H43.2V43.2H33.6ZM19.2 33.6H28.8V43.2H19.2V33.6Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_43_120">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
