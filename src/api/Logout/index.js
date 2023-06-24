import { useCallback, useEffect } from "react";
import { UserLogout, UserRegistration } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { BASEAPPURL } from "../instance";
import {
  AllInfoUserMain,
  initialStateAllInfoUser,
  IsRuAC,
  UserAvatar,
  UserWallets,
} from "../../store/allInfoUser";
import { UserData } from "../../store/userData/actions";
import { initialStateUserData } from "../../store/userData/reducer";
import { Votes } from "../../store/votes/actions";
import {
  setContestsListActive,
  setContestsListPast,
} from "../../store/contest/actions";
import { useNavigate } from "react-router-dom";

export const useLogoutCommon = ({ status }) => {
  //   const logout = useState(status);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLogout = useCallback(() => {
    // console.log("setLogout");
    dispatch(IsRuAC(true));
    dispatch(UserLogout());

    dispatch(
      UserRegistration({
        token: undefined,
        refresh_token: undefined,
      })
    );
    dispatch(AllInfoUserMain(initialStateAllInfoUser.value));
    dispatch(UserData(initialStateUserData.value));
    dispatch(
      Votes({
        items: [
          {
            id: 0,
            question: "",
            answers: [],
          },
        ],
      })
    );
    dispatch(UserWallets([]));
    dispatch(UserAvatar(""));
    dispatch(setContestsListActive([]));
    dispatch(setContestsListPast([]));
  }, [dispatch]);

  const logOut = () => {
    fetch(`${BASEAPPURL}api/Auth/logout?refreshToken=${auth.refresh_token}`, {
      method: "DELETE",
      headers: {
        Accept: "application/octet-stream",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then(() => {
        localStorage.removeItem("keySwagger");
      })
      .then(() => {
        setLogout();
      })
      .then(() => {
        navigate("/login");
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (status) {
      logOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  //   return null;
};
