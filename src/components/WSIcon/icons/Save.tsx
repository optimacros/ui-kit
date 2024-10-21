export default function SaveIcon({ fill = 'black' }) {
    return (
        <svg
            fill="none"
            height="15"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.125 4.375V11.875C13.125 12.2188 13.0026 12.513 12.7578 12.7578C12.513 13.0026 12.2188 13.125 11.875 13.125H3.125C2.78125 13.125 2.48698 13.0026 2.24219 12.7578C1.9974 12.513 1.875 12.2188 1.875 11.875V3.125C1.875 2.78125 1.9974 2.48698 2.24219 2.24219C2.48698 1.9974 2.78125 1.875 3.125 1.875H10.625L13.125 4.375ZM11.875 4.90625L10.0938 3.125H3.125V11.875H11.875V4.90625ZM7.5 11.25C8.02083 11.25 8.46354 11.0677 8.82812 10.7031C9.19271 10.3385 9.375 9.89583 9.375 9.375C9.375 8.85417 9.19271 8.41146 8.82812 8.04688C8.46354 7.68229 8.02083 7.5 7.5 7.5C6.97917 7.5 6.53646 7.68229 6.17188 8.04688C5.80729 8.41146 5.625 8.85417 5.625 9.375C5.625 9.89583 5.80729 10.3385 6.17188 10.7031C6.53646 11.0677 6.97917 11.25 7.5 11.25ZM3.75 6.25H9.375V3.75H3.75V6.25ZM3.125 4.90625V11.875V3.125V4.90625Z"
                fill={fill}
            />
        </svg>
    )
}
