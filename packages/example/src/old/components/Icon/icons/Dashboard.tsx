export default function DashboardIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g clipPath="url(#clip0_2_7)">
                <path d="M0 0H24V28.8H0V0Z" fill={fill} />
                <path d="M28.8 19.2H48V48H28.8V19.2Z" fill={fill} />
                <path d="M28.8 0H48V14.4H28.8V0Z" fill={fill} />
                <path d="M0 33.6H24V48H0V33.6Z" fill={fill} />
            </g>
            <defs>
                <clipPath id="clip0_2_7">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
