import { CONTESTS_ACTIVE, CONTESTS_PAST } from "./actions";
export type ContestType = {
  id: number;
  caption: string;
  desc: string;
  text: string;
  image: string;
  startDate: string;
  finishDate: string;
  participantsCount: number;
  participationCost: number;
  prize: string;
  winnerName: string;
  isParticipant: boolean;
};
export type ContestStateType = {
  active: ContestType[];
  past: ContestType[];
};
const initialState: ContestStateType = {
  active: [],
  past: [],
};
type ActionType = {
  type: string;
  payload: ContestType[];
};

export const contestsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CONTESTS_ACTIVE: {
      // const st = { ...state };
      // st.active = action.payload;
      // return st;
      //   {
      //     ...state,
      //     active: action.payload,
      //   };
      return {
        ...state,
        active: action.payload,
      };
    }
    case CONTESTS_PAST: {
      return {
        ...state,
        past: action.payload,
      };
    }

    default:
      return state;
  }
};
