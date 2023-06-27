import { dopInfoReducer } from './fund/reducer';
import { createStore, combineReducers, compose, applyMiddleware } from "redux";

// import thunk from "redux-thunk";
import { menuReducer } from "./menu/reducer";
import { timerReducer } from "./timer/reducer";
import { leftMenuReducer } from "./leftMenu/reducer";
import { authReducer } from "./auth/reducer";
import { userInfoReducer } from "./user/reducer";
import { userDataReducer } from "./userData/reducer";
import { messageReducer } from "./messageSms/reducer";
import { cryptoDataReducer } from "./crypto/reducer";
import { votesReducer } from "./votes/reducer";
import { newsReducer } from "./news/reducer";
import { contestsReducer } from "./contest/reducer";
import { AllInfoUserReducer } from "./allInfoUser/reducer";
import { investPlansReducer } from "./investingPlans/reducer";
import { currencyRatesReducer } from "./currencyRates/reducer";
import { rightMenuReducer } from "./rightMenu/reducer";
import { stockRatesReducer } from "./stockRates/reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  showMenu: menuReducer,
  showMessage: timerReducer,
  auth: authReducer,
  leftMenu: leftMenuReducer,
  userInfo: userInfoReducer,
  userData: userDataReducer,
  messageSms: messageReducer,
  cryptoData: cryptoDataReducer,
  votes: votesReducer,
  news: newsReducer,
  contests: contestsReducer,
  allInfoUser: AllInfoUserReducer,
  investPlans: investPlansReducer,
  currencyRates: currencyRatesReducer,
  stockRates: stockRatesReducer,
  rightMenu: rightMenuReducer,
  dopInfo: dopInfoReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
