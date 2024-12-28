export default function AddIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path d="M27.4737 2H20.5264V46H27.4737V2Z" fill={fill} />
            <path d="M46 20.5264H2V27.4737H46V20.5264Z" fill={fill} />
        </svg>
    );
}
