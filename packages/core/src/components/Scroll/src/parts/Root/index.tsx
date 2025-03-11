import { ReactNode } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';
import { Provider } from '../../store/context';
import './styles.css';

export interface IScroll {
    orientation?: Orientation;
    children?: ReactNode;
}

export const Root = forward<IScroll, 'div'>(
    ({ children, orientation = Orientation.Vertical, ...rest }, ref) => {
        return (
            <Provider {...rest} orientation={orientation}>
                <styled.div
                    data-scope="scroll"
                    data-part="root"
                    data-orientation={orientation}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </styled.div>
            </Provider>
        );
    },
);
