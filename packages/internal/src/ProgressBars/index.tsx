import { Loader } from '@optimacros-ui/loader';

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

export const ProgressBars = ({ state }: ProgressBarsProps) => {
    if (!state || !state.currentProgressBar) {
        return null;
    }

    const { progressBars, currentIndex } = state;

    return (
        <>
            {progressBars.map((progressBar: ProgressBar, index: number) => {
                const { currentValue, maxValue } = progressBar;
                const needRenderMessage = index === currentIndex;
                const progress = `${Math.floor((currentValue * 100) / maxValue)}%`;

                return (
                    <div key={index}>
                        {needRenderMessage && (
                            <Loader.Root max={maxValue} value={currentValue}>
                                <Loader.Label>
                                    {currentValue} / {maxValue} ({progress})
                                </Loader.Label>
                                <Loader.LinearTrack>
                                    <Loader.LinearRange />
                                </Loader.LinearTrack>
                            </Loader.Root>
                        )}
                    </div>
                );
            })}
        </>
    );
};
