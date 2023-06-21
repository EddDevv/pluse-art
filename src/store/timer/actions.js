export const SET_MINUTE = "TIMER::SET_MINUTE";
export const OPEN_TIMER = "TIMER::OPEN_TIMER";
export const SET_PRICE = "TIMER::SET_PRICE";
export const SET_SECONDS = "TIMER::SET_SECONDS";



export const openTimer = () => ({
    type: OPEN_TIMER,
});
export const setMinute = (minute) => ({
    type: SET_MINUTE,
    payload: minute

});

export const setPrice = (price) => ({
    type: SET_PRICE,
    payload: price
});
export const setSeconds = (seconds) => ({
    type: SET_SECONDS,
    payload: seconds
});









