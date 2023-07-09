import { FundAction } from './../../store/fund/actions';
import { store } from "../../store";
import { AccountsData, AllInfoUserMain, ChangeBusinessBalance, UserAvatar, UserWallets } from "../../store/allInfoUser";
import { setContestsListActive, setContestsListPast } from "../../store/contest/actions";
import { CryptoData } from "../../store/crypto/actions";
import { currencyRatesAction } from "../../store/currencyRates/actions";
import { InvestPlans } from "../../store/investingPlans/actions";
import { setNewsList } from "../../store/news/actions";
import { UsersStatisticAction } from "../../store/rightMenu/actions";
import { UserData } from "../../store/userData/actions";
import { Votes } from "../../store/votes/actions";
import instance, { BASEAPPURL } from "../instance";
import { MarketingApi } from "../marketing/marketing";
import withoutTokenInstance from "../withoutTokenInstance";

class CMainApi {
  token: any;
  config: any;
  headers: any;

  async getEtherFund() {
    try {
      const response = await withoutTokenInstance.get(`api/Main/ether-fund`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        console.error(error);
        return "error";
      }
    }
  }

  async getMainInfo() {
    try {
      const response = await instance.get(`api/Main/info`);
      return response;
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response);
        return error.response;
      } else {
        return "error";
      }
    }
  }

  async getInitialMainReduxInfo() {
    if (!store.getState().auth?.token) {
      return;
    }
    const resMain = await MainApi.getMainInfo();
    if (resMain?.status >= 200 && resMain.status < 300) {
      store.dispatch(UserData(resMain.data));
      const array: string[] = [];
      Object.keys(resMain.data).forEach((elem) => {
        if (elem.startsWith("balance")) {
          const account = elem.split("balance")?.[1];
          if (account?.length > 0) {
            array.push(account);
          }
        }
      });
      store.dispatch(AccountsData(array));
    }
    try {
      const resAllInfo = await instance.get("api/Partners/current");
      if (resAllInfo?.status >= 200 && resAllInfo.status < 300) {
        store.dispatch(AllInfoUserMain(resAllInfo.data));
        resAllInfo.data?.image &&
          fetch(`${BASEAPPURL}assets/Img/${resAllInfo.data.image}`, {
            method: "GET",
            headers: {
              accept: "application/octet-stream",
              Authorization: `Bearer ${store.getState().auth.token}`,
            },
          }).then((res) => store.dispatch(UserAvatar(res.url)));
      }
    } catch (e) {
      console.error("getInitialMainReduxInfo error>>>", e)
    }
    // }
  };
  async getInitialFullReduxInfo() {
    if (!store.getState().auth?.token) {
      return;
    }
    try {
      this.getInitialMainReduxInfo();
      const resStat = await instance.get("api/Partners/referal-stat");
      if (resStat?.status >= 200 && resStat.status < 300) {
        store.dispatch(UsersStatisticAction(resStat.data));
      }
      const resCrypto = await withoutTokenInstance.get(
        "api/Main/currency-rates"
      );
      if (resCrypto?.status >= 200 && resCrypto.status < 300) {
        store.dispatch(CryptoData(resCrypto.data));
      }
      const resRequisites = await instance.get("api/Profile/requisites");
      if (resRequisites?.status >= 200 && resRequisites.status < 300) {
        store.dispatch(UserWallets(resRequisites?.data?.cryptoWallets));
      }
      const resInvestmentPlans = await MarketingApi.getInvestmentPlans();
      if (
        resInvestmentPlans?.status >= 200 &&
        resInvestmentPlans.status < 300
      ) {
        store.dispatch(InvestPlans(resInvestmentPlans.data));
      }
      const resCurrencyRates = await MarketingApi.getCurrencyRates();
      resCurrencyRates && store.dispatch(currencyRatesAction(resCurrencyRates));
      const resNews = await withoutTokenInstance.get("api/News/last");
      if (resNews?.status >= 200 && resNews.status < 300) {
        store.dispatch(setNewsList(resNews.data));
      }
      const etherFund = await MainApi.getEtherFund();
      etherFund && store.dispatch(FundAction(etherFund.toLocaleString("ru-RU")));
      const resVoteList = await instance.get("api/Poll/poll-list");
      if (resVoteList?.status >= 200 && resVoteList.status < 300) {
        store.dispatch(Votes(resVoteList.data));
      }
      const resContestActive = await instance.get(
        "api/Contest/contest-list?onlyActive=true"
      );
      if (resContestActive?.status >= 200 && resContestActive.status < 300) {
        store.dispatch(setContestsListActive(resContestActive.data));
      }
      const resContestPast = await instance.get(
        "api/Contest/contest-list?onlyActive=false"
      );
      if (resContestPast?.status >= 200 && resContestPast.status < 300) {
        const array = resContestPast.data.filter(
          (elem: any) => new Date(elem?.finishDate) < new Date()
        );
        store.dispatch(setContestsListPast(array));
      }
      const resBusinessAccount = await instance.get(
        "api/Finance/list?AccountName=Business&pageNumber=1&pageSize=10"
      );
      if (
        resBusinessAccount?.status >= 200 &&
        resBusinessAccount.status < 300 &&
        resBusinessAccount?.data?.items?.length > 0
      ) {
        let isBuyInvest = false;
        const arr = [...resBusinessAccount.data.items];
        arr.forEach((el) => {
          if (el?.objectName === "Покупка инвестиционного портфеля") {
            isBuyInvest = true;
          }
        });
        if (isBuyInvest) {
          store.dispatch(ChangeBusinessBalance(1));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  getImage(image: any) {
    fetch(`${BASEAPPURL}assets/Img/${image}`, {
      method: "GET",
      headers: {
        accept: "application/octet-stream",
      },
    }).then((res) => {
      return res.url;
    });
  }
}

export const MainApi = new CMainApi();
