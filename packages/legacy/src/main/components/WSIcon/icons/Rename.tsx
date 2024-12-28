/* eslint-disable max-len */
import { useId } from 'react';

export default function RenameIcon({ fill = 'black', opacity = 1 }) {
    const clipPathId = useId();

    return (
        <svg
            fill="none"
            height="15"
            style={{ opacity }}
            viewBox="0 0 48 48"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    clipRule="evenodd"
                    d="M27.5349 12.6514H2C0.895431 12.6514 0 13.5468 0 14.6514V32.9769C0 34.0815 0.895431 34.9769 2 34.9769H27.5349V30.5116H3.72093V17.1162H27.5349V12.6514ZM30.5116 30.5116H43.907V17.1162H30.5116V12.6514H45.6279C46.7325 12.6514 47.6279 13.5468 47.6279 14.6514V32.9769C47.6279 34.0815 46.7325 34.9769 45.6279 34.9769H30.5116V30.5116Z"
                    fill={fill}
                    fillRule="evenodd"
                />
                <rect fill={fill} height="7.44186" width="17.8605" x="6.69768" y="20.0933" />
                <rect fill={fill} height="17.8605" width="6.69767" x="30.5116" y="6.69775" />
                <path
                    d="M25.5491 5.89959C22.1176 5.89959 20.3762 2.9861 22.5232 0.839123C23.7251 -0.362738 29.7425 -0.248133 32.0331 1.01996C33.6078 1.8914 34.1846 1.88173 35.9788 0.954471C38.8 -0.504133 44.6545 -0.104505 45.7358 1.62052C46.9868 3.61494 45.3913 5.46201 42.0164 5.92563C37.9866 6.47931 37.2581 7.10368 37.2581 10.0023L29.1212 6.66982C28.3293 6.24638 26.7219 5.89959 25.5491 5.89959Z"
                    fill={fill}
                />
                <rect
                    fill={fill}
                    height="16.7442"
                    transform="matrix(1 0 0 -1 30.5116 41.3022)"
                    width="6.69767"
                />
                <path
                    d="M25.5491 42.1004C22.1176 42.1004 20.3762 45.0139 22.5232 47.1609C23.7251 48.3627 29.7425 48.2481 32.0331 46.98C33.6078 46.1086 34.1846 46.1183 35.9788 47.0455C38.8 48.5041 44.6545 48.1045 45.7358 46.3795C46.9868 44.3851 45.3913 42.538 42.0164 42.0744C37.9866 41.5207 37.2581 40.8963 37.2581 37.9977L29.1212 41.3302C28.3293 41.7536 26.7219 42.1004 25.5491 42.1004Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect fill="white" height="48" width="48" />
                </clipPath>
            </defs>
        </svg>
    );
}
