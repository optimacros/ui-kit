export default function ReplyIcon({ fill = 'black' }) {
    return (
        <svg
            fill="none"
            height="15"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.8302 12.002V9.375C11.8302 8.87656 11.6566 8.4538 11.3094 8.10672C10.9623 7.75953 10.5395 7.58594 10.0411 7.58594H4.46002L6.62392 9.75L5.61752 10.7445L1.74799 6.875L5.61752 3.00547L6.62392 4L4.46002 6.16406H10.0411C10.9281 6.16406 11.685 6.47745 12.3119 7.10422C12.9387 7.7311 13.252 8.48802 13.252 9.375V12.002H11.8302Z"
                fill={fill}
            />
        </svg>
    )
}
