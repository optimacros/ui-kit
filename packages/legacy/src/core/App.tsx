import React from 'react';

import { SelectBox, FontIcon, Input } from './components';

function App(): React.JSX.Element {
    const renderEntityItem = ({ value, label }: any) => {
        return (
            <div>
                {value && <FontIcon value={'list'} />}

                <span>{label}</span>
            </div>
        );
    };

    return (
        <div>
            <Input placeholder={'djdkdjk'} />
            <SelectBox
                auto
                value={null}
                label={'filterBySubsetLabel'}
                name={'filterBySubsetLabel'}
                template={renderEntityItem}
                source={[
                    {
                        value: null,
                        label: 'None',
                    },
                ]}
            />
        </div>
    );
}

export default App;
