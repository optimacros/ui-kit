import { ReactNode } from 'react'
import { Icon } from 'ui-kit-core'
import { IconProps } from 'ui-kit-core/dist/components/Icon'

import styles from './HeaderUserMenu.module.css'

interface Props {
	href: string;
	label: string;
	className: string;
	children: ReactNode;
	icon: IconProps['value'];
	onClick: () => void;
}

export const HeaderUserMenuElement = (props: Props)=> {
    const ContainerNode = props.href
        ? 'a'
        : 'span'

    const { className, onClick, label, icon, children, ...otherProps } = props

    return (
        <li
            className={className}
            title={label}
            onClick={onClick}
        >
            <ContainerNode {...otherProps}>
                {icon && (
                    <Icon
                        className={styles.Icon}
                        value={icon}
                    />
                )}
                <div className={styles.Label}>
                    {label}
                    {children}
                </div>
            </ContainerNode>
        </li>
    )
}
