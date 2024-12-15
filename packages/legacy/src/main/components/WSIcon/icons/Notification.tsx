/* eslint-disable max-len */

export default function NotificationIcon({ fill = 'black' }) {
    return (
        <svg
            fill="none"
            height="15"
            viewBox="0 0 18 18"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4.5 10L5 5L9 3L13 5L13.5 10L15 13H3L4.5 10Z" fill={fill} />
            <path
                d="M14.25 10.1895V7.5C14.25 5.08725 12.6113 3.05475 10.3913 2.4435C10.1715 1.89 9.6345 1.5 9 1.5C8.3655 1.5 7.8285 1.89 7.60875 2.4435C5.38875 3.0555 3.75 5.08725 3.75 7.5V10.1895L2.46975 11.4698C2.39997 11.5393 2.34463 11.6219 2.30691 11.7129C2.2692 11.8039 2.24986 11.9015 2.25 12V13.5C2.25 13.6989 2.32902 13.8897 2.46967 14.0303C2.61032 14.171 2.80109 14.25 3 14.25H15C15.1989 14.25 15.3897 14.171 15.5303 14.0303C15.671 13.8897 15.75 13.6989 15.75 13.5V12C15.7501 11.9015 15.7308 11.8039 15.6931 11.7129C15.6554 11.6219 15.6 11.5393 15.5303 11.4698L14.25 10.1895ZM14.25 12.75H3.75V12.3105L5.03025 11.0302C5.10003 10.9607 5.15537 10.8781 5.19309 10.7871C5.2308 10.6961 5.25014 10.5985 5.25 10.5V7.5C5.25 5.43225 6.93225 3.75 9 3.75C11.0678 3.75 12.75 5.43225 12.75 7.5V10.5C12.75 10.6995 12.8288 10.89 12.9698 11.0302L14.25 12.3105V12.75ZM9 16.5C9.46448 16.5006 9.91759 16.3564 10.2964 16.0876C10.6751 15.8188 10.9608 15.4386 11.1135 15H6.8865C7.03925 15.4386 7.32486 15.8188 7.70363 16.0876C8.08241 16.3564 8.53553 16.5006 9 16.5Z"
                fill={fill}
            />
        </svg>
    );
}
