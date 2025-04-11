import { Loader } from '@optimacros-ui/loader';
import { forward } from '@optimacros-ui/store';
import { observer } from 'mobx-react';

interface ProgressBar {
    start: () => void;
    stop: () => void;
    currentValue: number;
    maxValue: number;
}

interface ProgressBarsProps {
    state: {
        currentProgressBar: ProgressBar;
        progressBars: ProgressBar[];
        currentIndex: number;
    };
    className?: string;
}

const ProgressBarsComponent = forward<ProgressBarsProps, 'div'>(({ state, className }, ref) => {
    if (!state || !state.currentProgressBar) {
        return null;
    }

    const { progressBars, currentIndex } = state;

    return (
        <div ref={ref} className={className}>
            {progressBars
                .filter((_, index) => index === currentIndex)
                .map((progressBar, index) => {
                    const { currentValue, maxValue } = progressBar;
                    const progress = `${Math.floor((currentValue * 100) / maxValue)}%`;

                    return (
                        <Loader.Root key={index} max={maxValue} value={currentValue}>
                            <Loader.Label>
                                {currentValue} / {maxValue} ({progress})
                            </Loader.Label>
                            <Loader.LinearTrack>
                                <Loader.LinearRange />
                            </Loader.LinearTrack>
                        </Loader.Root>
                    );
                })}
        </div>
    );
});

export const ProgressBars = observer(ProgressBarsComponent);
