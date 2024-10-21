export default function ViewListIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            height="15"
            style={{ opacity }}
            viewBox="0 -960 960 960"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M350-220h470v-137H350v137ZM140-603h150v-137H140v137Zm0 187h150v-127H140v127Zm0 196h150v-137H140v137Zm210-196h470v-127H350v127Zm0-187h470v-137H350v137ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Z"
                fill={fill}
            />
        </svg>
    )
}
