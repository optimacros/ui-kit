import { Loader } from '@optimacros-ui/loader';
import { forward } from '@optimacros-ui/store';
import { observer } from 'mobx-react';
import './styles.css';

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

export const ProgressBarsComponent = forward<ProgressBarsProps, 'div'>(({ state }, ref) => {
    if (!state || !state.currentProgressBar) {
        return null;
    }

    const { progressBars, currentIndex } = state;
    const progressBar = progressBars.find((_, index) => index === currentIndex);
    const { currentValue, maxValue } = progressBar;

    return (
        <div ref={ref} data-tag="internal">
            {progressBar && (
                <div data-part="container">
                    <Loader.Root value={currentValue === 0 ? null : currentValue}>
                        <Loader.Label>
                            <span>
                                {currentValue} / {maxValue} (
                                {Math.floor((currentValue * 100) / maxValue)}
                                %)
                            </span>
                        </Loader.Label>
                        <Loader.LinearTrack>
                            <Loader.LinearRange />
                        </Loader.LinearTrack>
                    </Loader.Root>
                </div>
            )}
        </div>
    );
});

export const ProgressBars = observer(ProgressBarsComponent);
