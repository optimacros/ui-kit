export default function CopyIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2C0 0.895429 0.895431 0 2 0H37C38.1046 0 39 0.895431 39 2V12H33.75V4.5H5.25V36H14.25V40.5H2C0.89543 40.5 0 39.6046 0 38.5V2Z"
                fill={fill}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 7.5C9.89543 7.5 9 8.39543 9 9.5V46C9 47.1046 9.89543 48 11 48H46C47.1046 48 48 47.1046 48 46V9.5C48 8.39543 47.1046 7.5 46 7.5H11ZM43.5 12H14.25V43.5H43.5V12Z"
                fill={fill}
            />
            <rect x="18.75" y="18.75" width="20.25" height="4.5" rx="2.25" fill={fill} />
            <rect x="18.75" y="33" width="20.25" height="4.5" rx="2.25" fill={fill} />
        </svg>
    );
}
