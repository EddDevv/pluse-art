import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Portfolio.module.scss";
import { useAppSelector } from "../../../store";
import { AiOutlineWarning } from "react-icons/ai";
import { BsBarChart } from "react-icons/bs";
import GifMonets from "../../../assets/images/GifMonets.svg";
import { speedMaxEnum } from "../../../assets/consts/consts";
import Calculator from "./calculator/Calculator";
import { DealType, StatusDeal } from "../../../assets/types/Portfolio";
import { MarketingApi } from "../../../api/marketing/marketing";
import { toast } from "react-toastify";
import { DealItem } from "./dealItem/DealItem";
import { DealItemCancel } from "./dealItem/DealItemCancel";

type PropsType = {
  portfolioId: number;
};

const pageSize = 4;

const Portfolio = ({ portfolioId }: PropsType) => {
  const { t } = useTranslation();
  const { auth } = useAppSelector((state) => state);
  const { value } = useAppSelector((state) => state.investPlans);
  const [refresh, setRefresh] = useState(false);

  const [dealStatus, setDealStatus] = useState("");
  const [dealList, setDealList] = useState<DealType[]>([]);
  const [maxWidth] = useState("180px");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (auth.token && dealList.length === 0) {
      getDealList();
    }
  }, [auth.token]);

  useEffect(() => {
    if (currentPage === 1) {
      setDealList([]);
    }
    getDealList();
  }, [refresh, dealStatus, currentPage, portfolioId]);

  const getDealList = async () => {
    const response = await MarketingApi.getDealList(
      dealStatus,
      currentPage,
      value[portfolioId].investPlan
    );
    if (response?.status >= 200 && response.status < 300 && response.data) {
      if (currentPage <= 1) {
        const data = response.data.items;
        setDealList(data);
      } else {
        setDealList([...dealList, ...response.data.items]);
      }
      setTotalCount(response.data.totalCount);
    }
  };

  const loadMore = async () => {
    setCurrentPage((prev) => prev + 1);
  };

  const terminateDeal = useCallback(async (programId: number) => {
    const response = await MarketingApi.terminateDeal(programId);
    if (response?.status === 204) {
      // dealList.forEach((element) => {
      //   if (element.id === programId) {
      //     element.status = StatusDeal.Term;
      //     element.endDate = new Date().getTime().toString();
      //     let distance = 0;
      //     if (element.statusChangedDate) {
      //       distance =
      //         +new Date(element.endDate) - +new Date(element.statusChangedDate);
      //     } else {
      //       distance =
      //         +new Date(element.endDate) - +new Date(element.startDate);
      //     }
      //     element.sumIncome =
      //       element.sumIncome +
      //       (element.sum *
      //         rate *
      //         (investPlan.percentPerMonth + element.speedPercent) *
      //         distance) /
      //         (daysOnMonth * 24 * 60 * 60 * 1000);
      //     // console.warn(element);
      //   }
      //   const tempArray = [...dealList];
      //   setDealList(tempArray);
      //   // window.location.reload();
      // });
      toast.success(
        `${t("Programs.deal")} №${programId} ${t("Programs.terminated")}!`
      );
      setCurrentPage(1);
      setRefresh(!refresh);
    } else {
      toast.error(t("Programs.deal_terminate_error"));
    }
  }, []);

  const resumeDeal = async (investmentId: number) => {
    const response = await MarketingApi.resumeDeal(investmentId);
    if (response?.status === 204) {
      toast.success(
        `${t("Programs.deal")} №${investmentId} ${t("Programs.resumed")}!`
      );
      // dealList.forEach((element) => {
      //   if (element.id === investmentId) {
      //     element.status = StatusDeal.Active;
      //     element.statusChangedDate = new Date().getTime().toString();
      //   }
      //   const tempArray = [...dealList];
      //   setDealList(tempArray);
      // });
      setCurrentPage(1);
      setRefresh(!refresh);
    } else {
      toast.error(t("Programs.deal_resume_error"));
    }
  };

  return (
    <div className="page_container">
      <div className={`${styles.paper}`}>
        <div className={styles.title_flex}>
          <div className={styles.subtitle}>{t("New.portfolio")}</div>
          <div>{value[portfolioId].name}</div>
        </div>

        <div className={styles.flex_end}>
          <div className={styles.desc}>
            {t(`New.portfolio_desc_${portfolioId}_1`)}
          </div>
          <div className={styles.desc}>
            {t(`New.portfolio_desc_${portfolioId}_2`)}
          </div>
        </div>

        <div className={styles.main_info}>
          <div className={styles.main_info_1}>
            <AiOutlineWarning size={30} />
            <div className={styles.text}>
              <div style={{ marginBottom: "10px" }}>{t("New.risk_level")}</div>
              <div className={portfolioId === 2 ? styles.red : styles.green}>
                {t(`New.portfolio_risk_${portfolioId}`)}
              </div>
            </div>
          </div>
          <div className={styles.main_info_2}>
            <BsBarChart size={30} />
            <div className={styles.text}>
              <div style={{ marginBottom: "10px" }}>
                {t("New.portfolio_income")}
              </div>
              <div className={styles.green}>
                {portfolioId === 0 && (
                  <b className={styles.dop}>{t("Programs.to")} &nbsp;</b>
                )}
                {value[portfolioId].percentPerMonth * 100}% &nbsp;
                <b className={styles.dop}>({t("New.pers_with_speed")} &nbsp;</b>
                {value[portfolioId].percentPerMonth * 100 +
                  value[portfolioId].speedPercent *
                    100 *
                    speedMaxEnum[portfolioId]}
                %<b className={styles.dop}>&nbsp;)</b>
              </div>
            </div>
          </div>
          <div className={styles.main_info_3}>
            <img src={GifMonets} alt="" />
            <div className={styles.text}>
              <div style={{ marginBottom: "10px" }}>
                {t("New.portfolio_sum")}
              </div>
              <div className={styles.green}>
                <b className={styles.dop}>{t("Programs.from")} &nbsp;</b>
                {value[portfolioId].minSum.toLocaleString()} $ &nbsp;
                <b className={styles.dop}>{t("Programs.to")} &nbsp;</b>
                {value[portfolioId].maxSum.toLocaleString()} $
              </div>
            </div>
          </div>
        </div>

        <Calculator
          portfolioId={portfolioId}
          investPlan={value[portfolioId]}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>

      {/* ****************List************** */}
      <div className={`${styles.paper_2}`}>
        <div className={styles.title_flex_2}>
          <div className="page_title">{t("New.your_portfolios")}</div>

          <div>
            <select
              className="gray_input"
              name="filter"
              value={dealStatus}
              onChange={(e: any) => {
                setDealStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value={""}> {t("Programs.all")}</option>
              <option value={StatusDeal.Active}>{t("Programs.active")}</option>
              <option value={StatusDeal.Reinvest}>
                {t("DopItem2.Reinvest")}
              </option>
              <option value={StatusDeal.Terminate}>
                {t("Programs.terminate")}
              </option>
              <option value={StatusDeal.Term}>{t("Programs.term")}</option>
            </select>
          </div>
        </div>

        <div className={styles.deals_container}>
          {dealList.map((deal) => {
            if (deal.status === StatusDeal.Active)
              return (
                <DealItem
                  key={deal.id}
                  deal={deal}
                  numberDeal={deal.id}
                  terminateDeal={terminateDeal}
                  isLowRisk={false}
                  maxSpeedCount={speedMaxEnum[portfolioId]}
                  dealList={dealList}
                  setDealList={setDealList}
                  investPlan={value[portfolioId]}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  setCurrentPage={setCurrentPage}
                />
              );
            else if (deal.status === StatusDeal.Term) {
              const delta = +new Date() - +new Date(deal?.statusChangedDate);
              if (delta < 21 * 24 * 60 * 60 * 1000) {
                return (
                  <DealItemCancel
                    key={deal.id}
                    deal={deal}
                    numberDeal={deal.id}
                    resumeDeal={resumeDeal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setCurrentPage={setCurrentPage}
                  />
                );
              } else {
                return (
                  <DealItemCancel
                    key={deal.id}
                    deal={deal}
                    numberDeal={deal.id}
                    isTimeout={true}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setCurrentPage={setCurrentPage}
                  />
                );
              }
            } else if (deal.status === StatusDeal.Terminate) {
              return (
                <DealItemCancel
                  key={deal.id}
                  deal={deal}
                  numberDeal={deal.id}
                  isTimeout={true}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  setCurrentPage={setCurrentPage}
                />
              );
            }
            return (
              <DealItemCancel
                key={deal.id}
                deal={deal}
                numberDeal={deal.id}
                isTimeout={true}
                refresh={refresh}
                setRefresh={setRefresh}
                setCurrentPage={setCurrentPage}
              />
            );
          })}
        </div>
        {currentPage * pageSize < totalCount && (
          <div className={styles.loadMore_row}>
            <button onClick={loadMore} className="loadmore">
              {t("FaqPage.show_more")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
