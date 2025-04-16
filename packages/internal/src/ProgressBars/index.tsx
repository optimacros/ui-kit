import { Loader } from '@optimacros-ui/loader';
import { forward, styled } from '@optimacros-ui/store';
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
        <styled.div ref={ref} data-tag="internal" data-scope="progress-bars" data-part="root">
            {progressBar && (
                <styled.div data-scope="progress-bars" data-part="container">
                    <Loader.Root
                        value={currentValue === 0 ? null : currentValue}
                        data-testid="progress-bars-active-bar"
                    >
                        <Loader.Label data-testid="progress-bars-label-wrap">
                            <styled.span data-scope="progress-bars" data-part="label">
                                {currentValue} / {maxValue} (
                                {Math.floor((currentValue * 100) / maxValue)}
                                %)
                            </styled.span>
                        </Loader.Label>
                        <Loader.LinearTrack data-testid="progress-bars-active-bar-track">
                            <Loader.LinearRange data-testid="progress-bars-active-bar-range" />
                        </Loader.LinearTrack>
                    </Loader.Root>
                </styled.div>
            )}
        </styled.div>
    );
});

export const ProgressBars = observer(ProgressBarsComponent);
