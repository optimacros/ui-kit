/* eslint-disable max-len */

export default function CycleIcon({ fill = 'black', opacity = 1 }) {
    return (
        <svg
            height="15"
            style={{ opacity }}
            viewBox="0 -960 960 960"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M352-180q-119-40-196-143T79-560q0-32 5-64t16-63l-64 37-30-51 173-100 100 172-52 30-58-99q-14 33-21.5 68t-7.5 71q0 116 68.5 205T383-233l-31 53Zm288-520v-60h115q-48-66-120.5-103T480-900q-69 0-128.5 25T246-806l-31-54q54-47 121-73.5T479-960q88 0 166 35.5T780-824v-76h60v200H640ZM595-80 422-180l100-172 51 30-58 101q130-13 217.5-109.5T820-559q0-21-2.5-41t-7.5-40h62q4 20 6 40t2 40q0 143-89.5 253T562-168l63 37-30 51Z"
                fill={fill}
            />
        </svg>
    )
}
