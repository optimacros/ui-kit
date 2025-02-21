export default function AddBoldIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <path d="M433-433H175v-94h258v-259h94v259h259v94H527v258h-94v-258Z" fill={fill} />
        </svg>
    );
}
