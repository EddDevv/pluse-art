import { ContestType } from "./reducer";

export const CONTESTS_ACTIVE = "CONTESTS_LIST::CONTESTS_ACTIVE";
export const CONTESTS_PAST = "CONTESTS_LIST::CONTESTS_PAST";


export const setContestsListActive = (value: ContestType[]) => ({
    type: CONTESTS_ACTIVE,
    payload: value
});
export const setContestsListPast = (value: ContestType[]) => ({
    type: CONTESTS_PAST,
    payload: value
});
