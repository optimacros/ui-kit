export default function ListIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 7H48V11.8H0V7Z" fill={fill} />
            <path d="M0 21.4H48V26.2H0V21.4Z" fill={fill} />
            <path d="M0 35.8H48V40.6H0V35.8Z" fill={fill} />
        </svg>
    );
}
