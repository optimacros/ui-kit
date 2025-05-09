import { ComponentProps } from 'react';
import './styles.css';

import { RootProvider, Api } from '../../state';

export { RootProvider as Root, Api };

export type RootProps = ComponentProps<typeof RootProvider>;
