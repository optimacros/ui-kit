export const preventTrackpadWheel = (e) => {
    if (e.wheelDeltaY) {
        if (e.wheelDeltaY === e.deltaY * -3) {
            return;
        }
    } else if (e.deltaMode === 0) {
        return;
    }
};
