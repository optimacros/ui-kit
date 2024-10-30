export default function SliderControlElementIcon({ fill = 'black', opacity = 1 }) {
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
                d="M3.6 8.6V40.4H44.4V8.6H3.6ZM3 5C1.34315 5 0 6.34315 0 8V41C0 42.6569 1.34315 44 3 44H45C46.6569 44 48 42.6569 48 41V8C48 6.34315 46.6569 5 45 5H3Z"
                fill={fill}
            />
            <path
                d="M37.75 23.3014H34.33C34.0621 22.3538 33.4767 21.5172 32.6641 20.9207C31.8515 20.3242 30.8568 20.001 29.8337 20.001C28.8107 20.001 27.816 20.3242 27.0034 20.9207C26.1908 21.5172 25.6054 22.3538 25.3375 23.3014H10.25C9.91848 23.3014 9.60054 23.4278 9.36612 23.6527C9.1317 23.8777 9 24.1828 9 24.501C9 24.8191 9.1317 25.1243 9.36612 25.3492C9.60054 25.5742 9.91848 25.7006 10.25 25.7006H25.3375C25.6054 26.6482 26.1908 27.4848 27.0034 28.0813C27.816 28.6778 28.8107 29.001 29.8337 29.001C30.8568 29.001 31.8515 28.6778 32.6641 28.0813C33.4767 27.4848 34.0621 26.6482 34.33 25.7006H37.75C38.0815 25.7006 38.3995 25.5742 38.6339 25.3492C38.8683 25.1243 39 24.8191 39 24.501C39 24.1828 38.8683 23.8777 38.6339 23.6527C38.3995 23.4278 38.0815 23.3014 37.75 23.3014ZM29.8337 26.6003C29.4011 26.6003 28.9782 26.4772 28.6184 26.2465C28.2587 26.0158 27.9783 25.6879 27.8128 25.3043C27.6472 24.9207 27.6039 24.4986 27.6883 24.0914C27.7727 23.6842 27.981 23.3101 28.287 23.0165C28.5929 22.7229 28.9827 22.523 29.407 22.442C29.8313 22.361 30.2712 22.4026 30.6709 22.5615C31.0706 22.7204 31.4122 22.9894 31.6526 23.3347C31.893 23.6799 32.0212 24.0858 32.0212 24.501C32.0206 25.0576 31.7899 25.5912 31.3798 25.9847C30.9697 26.3783 30.4137 26.5997 29.8337 26.6003Z"
                fill={fill}
            />
        </svg>
    );
}