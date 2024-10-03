/* eslint-disable max-len */


export default function TrashIcon({ fill = 'black' }) {
    return (
        <svg
            fill="none"
            height="15"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.375 13.125C4.03125 13.125 3.73698 13.0026 3.49219 12.7578C3.2474 12.513 3.125 12.2188 3.125 11.875V3.75H2.5V2.5H5.625V1.875H9.375V2.5H12.5V3.75H11.875V11.875C11.875 12.2188 11.7526 12.513 11.5078 12.7578C11.263 13.0026 10.9688 13.125 10.625 13.125H4.375ZM10.625 3.75H4.375V11.875H10.625V3.75ZM5.625 10.625H6.875V5H5.625V10.625ZM8.125 10.625H9.375V5H8.125V10.625Z"
                fill={fill}
            />
        </svg>
    )
}
