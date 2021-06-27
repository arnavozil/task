export const commonReducer = (desiredType, defState = null) => (state = defState, { type, payload }) => {
    switch (type) {
        case desiredType:
            return payload;
    
        default:
            return state;
    };
};
