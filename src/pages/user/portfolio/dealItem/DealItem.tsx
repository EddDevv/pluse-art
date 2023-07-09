import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { DealType } from "../../../../assets/types/Portfolio";
import { InvestPlanType } from "../../../../store/investingPlans/reducer";
import { useAppSelector } from "../../../../store";
import { useDaysOnMounth } from "../../../../hooks/useDaysOnMounth";
import { useText } from "../../../../hooks/useText";
import instance from "../../../../api/instance";
import { Fade, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { MainApi } from "../../../../api/main/mainApi";
import { Loader } from "../../../../api/Loader";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import { ModalReplanish } from "./ModalReplanish";
import { PDFLinkContainer } from "./PDFLinkContainer";
import { ModalConfirm } from "./ModalConfirm";
import styles from "../Portfolio.module.scss"
import { LocalSpinnerAbsolute } from "../../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import { speedMaxEnum } from "../../../../assets/consts/consts";

type PropType = {
  deal: DealType;
  numberDeal: number;
  terminateDeal: any;
  isLowRisk?: boolean;
  maxSpeedCount: number;
  dealList: DealType[];
  setDealList: React.Dispatch<React.SetStateAction<DealType[]>>;
  investPlan: InvestPlanType;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type CurrencyType = {
  objectName: string;
  code: string;
  name: string;
  symbol: string;
  rate: number;
};

export const DealItem = React.memo(function DealItem({
  deal,
  numberDeal,
  terminateDeal,
  isLowRisk,
  maxSpeedCount,
  dealList,
  setDealList,
  investPlan,
  refresh,
  setRefresh,
  setCurrentPage,
}: PropType) {
  const { t } = useTranslation();
  const { userData } = useAppSelector((state) => state);
  const { allInfoUser, currencyRates } = useAppSelector((state: any) => state);
  const [isLoading, setIsLoading] = useState(false);

  const getSpeed = (persent: string) => {
    switch (persent) {
      case "0":
        return 0;
      case "0.01":
        return 1;
      case "0.02":
        return 2;
      case "0.03":
        return 3;
      case "0.04":
        return 4;
      case "0.05":
        return 5;
      default:
        return 0;
    }
  };
  const [initialSpeed, setInitialSpeed] = useState(
    getSpeed(deal.speedPercent.toFixed(2))
  );
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState(-1);
  const [timerId, setTimerid] = useState(null);

  const [open, setOpen] = useState(false);
  const [speedValue, setSpeedValue] = useState(0.05);

  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [price, setPrice] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const daysOnMonth = useDaysOnMounth();
  const [changeSpeedDataTime, setChangeSpeedDataTime] = useState(0);

  const { investPlans } = useAppSelector((state) => state);
  const [isOpenLink, setIsOpenlink] = useState(false);
  const [pay, setPay] = useState(false);
  const [isOpenReplanish, setIsOpenReplanish] = useState(false);
  const [insure, setInsure] = useState(false);

  const [newSpeed, setNewSpeed] = useState("no");


  const checkSpeed = () => {
    if (
      deal.speedEndDate &&
      +new Date(deal.speedEndDate) + 24 * 60 * 60 * 1000 < +new Date()
    ) {
      setInitialSpeed(0);
      setSpeedValue(investPlan.percentPerMonth);
      setSpeed(0);
    }
  };

  useEffect(() => {
    setRate(currencyRates.value[3].rate);
  }, [currencyRates]);
  const [baseSpeedPercent, setBaseSpeedPercent] = useState(
    investPlan.speedPercent
  );

  const [rate, setRate] = useState(0);

  const getSpeedValue = (speed: string) => {
    switch (speed) {
      case "0":
        setSpeedValue(investPlan.percentPerMonth);
        break;
      case "1":
        setSpeedValue(investPlan.percentPerMonth + investPlan.speedPercent);
        break;
      case "2":
        setSpeedValue(investPlan.percentPerMonth + investPlan.speedPercent * 2);
        break;
      case "3":
        setSpeedValue(investPlan.percentPerMonth + investPlan.speedPercent * 3);
        break;
      case "4":
        setSpeedValue(investPlan.percentPerMonth + investPlan.speedPercent * 4);
        break;
      case "5":
        setSpeedValue(investPlan.percentPerMonth + investPlan.speedPercent * 5);
        break;
      default:
        setSpeedValue(investPlan.percentPerMonth + deal.speedPercent);
    }
  };

  const countE = (numberSTR: string) => {
    let counter = 0;
    for (let i = 0; i < numberSTR.length; i++) {
      if (numberSTR[i] === "0" || numberSTR[i] === ".") {
        counter++;
      } else {
        return counter;
      }
    }
    return counter;
  };

  const setTimer = async () => {
    timerId && (await clearTimeout(timerId));
    let interval;
    const startTimer = async () => {
      const countDate = new Date(deal.startDate);
      if (new Date() <= countDate) return;
      interval = await setInterval(() => {
        const now = new Date().getTime();
        let distance = +now - +countDate;
        if (distance < 0) {
          // для корректировки ошибки
          distance = 1000;
        }

        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);
        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor(
          (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        );

        setSeconds(seconds);
        setMinute(minutes);
        setHours(hours);
        setDays(days);

        const previousIncom = deal.sumIncome ? deal.sumIncome : 0;

        //*2*********************расчет дистанции и дохода с начала текущего дня до изменения ползунка скорости или до настоящего момента
        const startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        let distanceForToday = 0;
        if (startToday > new Date(deal.startDate)) {
          distanceForToday = +now - +startToday;
        } else {
          distanceForToday = +now - +new Date(deal.startDate);
        }

        // расчет времени, если пользователь сдвинул ползунок скорости
        let fromChangeSpeedTimeStamp = 0;
        if (changeSpeedDataTime !== 0) {
          fromChangeSpeedTimeStamp = +new Date() - changeSpeedDataTime;
        }

        let accumulatedBeforeChangeSpeedIncome = 0;
        if (
          deal.speedPercent > 0 &&
          deal.speedEndDate &&
          +new Date(deal.speedEndDate) + 24 * 60 * 60 * 1000 < +new Date()
        ) {
          accumulatedBeforeChangeSpeedIncome =
            (deal.sum *
              investPlan.percentPerMonth *
              (distanceForToday - fromChangeSpeedTimeStamp)) /
            (daysOnMonth * 24 * 60 * 60 * 1000);
        } else {
          accumulatedBeforeChangeSpeedIncome =
            (deal.sum *
              (investPlan.percentPerMonth + deal.speedPercent) *
              (distanceForToday - fromChangeSpeedTimeStamp)) /
            (daysOnMonth * 24 * 60 * 60 * 1000);
        }

        //*3*********************расчет дохода с момента измемнения ползунка скорости (если было изменение)
        const newIncomPerSecond =
          (deal.sum *
            speedValue) /
          daysOnMonth /
          (24 * 60 * 60);

        let accumulatedAfterChangeSpeedIncome = 0;

        if (changeSpeedDataTime !== 0) {
          accumulatedAfterChangeSpeedIncome =
            (deal.sum *
              speedValue *
              fromChangeSpeedTimeStamp) /
            (daysOnMonth * 24 * 60 * 60 * 1000);
        }
        //*4*********************расчет итогового дохода
        const accumulatedIncome =
          previousIncom +
          accumulatedBeforeChangeSpeedIncome +
          accumulatedAfterChangeSpeedIncome;
        let toFixNumber = 7;
        if (countE(newIncomPerSecond?.toString()) > 0) {
          toFixNumber = countE(newIncomPerSecond.toString());
        }
        const newAccumulatedIncome = accumulatedIncome.toFixed(toFixNumber - 2);
        setPrice(+newAccumulatedIncome);
      });
    };
    await startTimer();
    interval && setTimerid(interval);
    return interval;
  };

  const minText = useText(
    minute,
    t("Programs.minutes1"),
    t("Programs.minutes2"),
    t("Programs.minutes3")
  );
  const secText = useText(
    seconds,
    t("Programs.seconds1"),
    t("Programs.seconds2"),
    t("Programs.seconds3")
  );
  const hourText = useText(
    hours,
    t("Programs.hours1"),
    t("Programs.hours2"),
    t("Programs.hours3")
  );
  const dayText = useText(
    days,
    t("Programs.days1"),
    t("Programs.days2"),
    t("Programs.days3")
  );
  const handleCancel = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) setSpeed(getSpeed(deal.speedPercent.toFixed(2)));
    return () => {
      isCancelled = true;
    };
  }, [deal.speedPercent]);

  const terminateDealLocal = async () => {
    setIsLoading(true);
    await terminateDeal(numberDeal);
    setOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) getSpeedValue(speed.toString());
    return () => {
      isCancelled = true;
    };
  }, [speed]);

  useEffect(() => {
    if (!rate) return;
    let isCancelled = false;
    if (!isCancelled) setTimer();
    return () => {
      timerId && clearTimeout(timerId);
      isCancelled = true;
    };
  }, [speed, rate]);

  const handlerSpeed = (event: any) => {
    const { value } = event.target;
    if (value >= initialSpeed) {
      setSpeed(value);
      getSpeedValue(value);
      setChangeSpeedDataTime(new Date().getTime());
    }
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) checkSpeed();
    return () => {
      isCancelled = true;
    };
  }, [deal]);

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const rd: any = {
        investmentId: deal.id,
        investSpeed: +speed,
        accountName: "Inner",
      };
      if (deal.isPromo) {
        rd.accountName = "Business";
      }
      const response = await instance.post(`api/Marketing/activate-speed`, rd);
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(t("Programs.speed_added"));
        await MainApi.getInitialMainReduxInfo();
        setCurrentPage(1);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response?.data);
        toast.error(error.response?.data);
      } else {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setPay(false);
      setIsLoading(false);
    }
  };

  const handleInsure = async () => {
    setIsLoading(true);
    try {
      const rd = {
        investmentId: deal.id,
        accountName: "Inner",
      };
      if (deal.isPromo) {
        rd.accountName = "Business";
      }
      const response = await instance.post(
        `api/Marketing/activate-insurance`,
        rd
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(t("Programs.insurance_added"));
        await MainApi.getInitialMainReduxInfo();
        setCurrentPage(1);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error("error.response:", error.response?.data);
        toast.error(error.response?.data);
      } else {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setInsure(false);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.deal_box}>
      <ModalConfirm
        open={open}
        setOpen={setOpen}
        // setSuccess={setSuccess}
        submitHandler={terminateDealLocal}
        isLoading={isLoading}
      />
      {/* *****************************************************Модалка оплаты скорости */}
      <Fade in={pay}>
        <div className="modal__wrapper">
          <div className="modal__text priceModal_noPadding">
            <div
              onClick={() => setPay(false)}
              className="close_menu_btn close_window"
            >
              <span className="before arrow_color" />
              <span className="after arrow_color" />
            </div>

            <div className="text__wrapper" style={{ marginTop: "10px" }}>
              <div className="balance_sidebar_title texp_price_modal">
                {t("Programs.chosen_auto")}
              </div>
              <div className="balance_sidebar_total texp_priceValue_modal">
                {speed}
              </div>

              <button
                onClick={handleAdd}
                className="form_sbmOpen texp_button_modal"
                style={{
                  minWidth: "70%",
                  fontSize: 18,
                  fontWeight: 700,
                  padding: "20px",
                  margin: "40px",
                }}
                disabled={
                  isLoading ||
                  (deal.isPromo === true &&
                    (speed - initialSpeed) * investPlan?.speedPrice * deal.sum >
                    userData.value.balanceBusiness) ||
                  (deal.isPromo === false &&
                    (speed - initialSpeed) * investPlan?.speedPrice * deal.sum >
                    userData.value.balance)
                }
              >
                <div className="loader_for_button">
                  {/* <Loader loading={isLoading} /> */}
                </div>
                {t("Programs.pay")}{" "}
                {(
                  (speed - initialSpeed) *
                  investPlan?.speedPrice *
                  deal.sum
                ).toFixed(2)}
              </button>

              {((deal.isPromo === true &&
                (speed - initialSpeed) * investPlan?.speedPrice * deal.sum >
                userData.value.balanceBusiness) ||
                (deal.isPromo === false &&
                  (speed - initialSpeed) * investPlan?.speedPrice * deal.sum >
                  userData.value.balance)) && (
                  <div className="worning_universal">
                    {t("Programs.not_enough_money")}:{" "}
                    {deal.isPromo === true
                      ? getNumWithoutZeroToFixedN(
                        +userData.value.balanceBusiness, 2
                      )
                      : getNumWithoutZeroToFixedN(+userData.value.balance, 2)}
                  </div>
                )}
            </div>
          </div>
        </div>
      </Fade>

      {/* *****************************************************Модалка пополнения портфеля */}
      <ModalReplanish
        open={isOpenReplanish}
        setOpen={setIsOpenReplanish}
        deal={deal}
        investPlan={investPlan}
        getMainInfo={() => { MainApi.getInitialMainReduxInfo() }}
        setCurrentPage={setCurrentPage}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {/* *****************************************************Модалка оплаты страховки */}
      <Fade in={insure}>
        <div className="modal__wrapper">
          <div className="modal__text priceModal_noPadding">
            <div
              onClick={() => {
                setInsure(false);
              }}
              className="close_menu_btn close_window"
            >
              <span className="before arrow_color" />
              <span className="after arrow_color" />
            </div>

            <div className="text__wrapper" style={{ marginTop: "10px" }}>
              <div className="balance_sidebar_title texp_price_modal">
                {t("Programs.arrangement_of_insurance")} №{deal?.id} (
                {t("Programs.current_sum")}
                {deal?.sum} USD )
              </div>

              <button
                onClick={handleInsure}
                className="form_sbmOpen texp_button_modal"
                style={{
                  minWidth: "70%",
                  fontSize: 18,
                  fontWeight: 700,
                  padding: "20px",
                  margin: "40px",
                }}
                disabled={
                  isLoading ||
                  (deal.isPromo === true &&
                    deal.sum * investPlan.insurancePrice >
                    userData.value.balanceBusiness) ||
                  (deal.isPromo === false &&
                    deal.sum * investPlan.insurancePrice >
                    userData.value.balance)
                }
              >
                <div className="loader_for_button">
                  <Loader loading={isLoading} />
                </div>
                {t("Programs.pay")}{" "}
                {(deal.sum * investPlan.insurancePrice).toFixed(2)}
              </button>

              {((deal.isPromo === true &&
                deal.sum * investPlan.insurancePrice >
                userData.value.balanceBusiness) ||
                (deal.isPromo === false &&
                  deal.sum * investPlan.insurancePrice >
                  userData.value.balance)) && (
                  <div className="worning_universal">
                    {t("Programs.not_enough_money")}:{" "}
                    {deal.isPromo === true
                      ? getNumWithoutZeroToFixedN(
                        +userData.value.balanceBusiness, 2
                      )
                      : getNumWithoutZeroToFixedN(+userData.value.balance, 2)}
                  </div>
                )}
            </div>
          </div>
        </div>
      </Fade>

      {/* ***************************MAIN********************************** */}

      <div className={styles.deal_top}>

        <div className={styles.deal_top_left}>
          {/* <div>{t("Programs.auto")}</div> */}
          <div>{t("Programs.deal")} #{numberDeal} </div>
          <div> {t("Programs.from")} <Moment format="DD/MM/YYYY">{deal.startDate}</Moment></div>
        </div>
        <div className={styles.deal_timer}>
          <div className={styles.timer_column}>
            <div>{days} </div>
            <span>{dayText} </span>
          </div>
          <div className={styles.timer_column}>
            <div>{hours} </div>
            <span>{hourText} </span>
          </div>
          <div className={styles.timer_column}>
            <div>{minute} </div>
            <span>{minText} </span>
          </div>
          <div className={styles.timer_column}>
            <div>{seconds} </div>
            <span>{secText} </span>
          </div>
        </div>
      </div>

      {/* дата начала работы */}
      <div style={{ minHeight: "30px" }}>
        {(+(new Date(deal.startDate)) > +(new Date())) && <div style={{ width: "100%", textAlign: "center", color: "#898ea0", fontWeight: "bold" }}>
          {t("DopItem2.deal_start")}
          <Moment format="DD.MM.YYYY HH:mm" locale="ru">{deal.startDate}</Moment>
        </div>}
      </div>


      <div className={styles.deal_income_box}>
        <div>{t("New.your_income")}</div>
        <div className={styles.income}>{price}
          <b className={styles.usd}>&nbsp; USD</b>
        </div>
      </div>

      <div className={styles.deal_sum_box}>
        <div>{t("New.portfolio_sum")}</div>
        <div className={styles.sum}>{deal.sum}
          <b className={styles.usd}>&nbsp; USD</b>
        </div>
      </div>

      <div className={styles.deal_buttons_box}>
        {isLoading && <LocalSpinnerAbsolute size="70px" />}
        <button
          onClick={handleCancel}
          className="outline_green_button_2"
          style={{ width: "50%", minHeight: "46px" }}
        >
          {t("New.terminate_deal")}
        </button>

        <button
          onClick={() => setIsOpenReplanish(true)}
          className="dark_green_button"
          style={{ width: "50%", minHeight: "46px" }}
          disabled={isLoading}
        >
          {t("Programs.replanish")}
        </button>
      </div>


      {/*********** уведомление об окончании автоматизации ***************/}
      {deal.speedEndDate && (
        <div style={{ textAlign: "center", width: "100%" }}>
          {t("Programs.enddate_for_auto")}
          <Moment format="DD-MM-YYYY">{deal.speedEndDate}</Moment>
        </div>
      )}

      <div className={styles.auto_box}>
        <div className={styles.auto_flex}>
          <div>{t("Programs.auto")}</div>
          <div className={styles.speed}>{speed} <b className={styles.usd}>X</b></div>
        </div>

        <div className={styles.auto_flex}>
          <RadioGroup
            onChange={(e) => {
              setNewSpeed(e);
              // handlerSpeed(e);
            }}
            // value={speed}
            value={newSpeed}
            colorScheme='teal'
          >
            <Stack direction='row' gap={45}>
              {["no", "1", "2", "3", "4", "5"].map(elem => (
                <Radio
                  value={elem}
                  color={"teal.500"}
                  isDisabled={elem === "no" || +elem <= speedMaxEnum[investPlan.investPlan - 1] ? false : true}
                >
                  {elem === "no"
                    ? t("DopItems.no")
                    : <div className={styles.green_speed}>{elem} X</div>}
                </Radio>))}
            </Stack>
          </RadioGroup>
        </div>

      </div>


      {/* Оплата скорости */}
      <div className="deal_item_btns">
        {speed - initialSpeed > 0 && (
          <button
            className="deal_item_pay_btn"
            onClick={() => setPay(true)}
            style={{ cursor: "pointer" }}
            disabled={isLoading}
          >
            +{" "}
            {(1 * (speed - initialSpeed) * investPlan.speedPrice * deal.sum)
              .toFixed(2)}{" "}
            USD
            <span> {t("Programs.pay")}</span>
          </button>
        )}




      </div>

      {/* <div className="input_strax">
        {deal.insuranceEndDate ? (
          <label>{t("Programs.portfolio_is_insured")}</label>
        ) : (
          <div
            style={{
              width: "90%",
              backgroundColor: "#4169e1",
            }}
            className="deal_item_pay_btn"
            onClick={(e) => {
              e.preventDefault();
              setInsure(true);
            }}
          >
            {t("Programs.insure_portfolio")}
          </div>
        )}
      </div> */}
      {/* <div>deal.sum:{deal.sum}</div>
      <div>deal.sumIncome:{deal.sumIncome}</div>
      <div>deal.speedPercent:{deal.speedPercent}</div>
      <div>deal.startDate:{deal.startDate}</div>
      <div>deal.statusChangedDate:{deal.statusChangedDate}</div>
      <div>speed:{speed}</div>
      <div>initialSpeed:{initialSpeed}</div>
      <div>speedValue:{speedValue}</div>
      <div>baseSpeedPercent:{baseSpeedPercent}</div>
      <div>changeSpeedDataTime:{changeSpeedDataTime}</div>
      <div>programName:{deal.programName}</div>
      <div>deal.canReplenish:{deal?.canReplenish.toString()}</div>
      <div>deal.canInsure:{deal?.canInsure.toString()}</div>
      <div>deal.insuranceEndDate:{deal?.insuranceEndDate}</div>
      <div>investPlan.percentPerMonth:{investPlan.percentPerMonth}</div>
      <div>deal.speedEndDate:{deal.speedEndDate}</div>
      <div>+new Date(deal.speedEndDate):{+new Date(deal.speedEndDate)}</div>
      <div>+new Date():{+new Date()}</div>
      <div>isPromo:{deal.isPromo.toString()}</div> */}

      {/* {isOpenLink ? (
        <div style={{ textAlign: "center", height: "80px" }}>
          <PDFLinkContainer
            deal={deal}
            userData={userData}
            investPlans={investPlans}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", height: "80px" }}>
          <button
            className="button_download"
            onClick={() => {
              setIsOpenlink(true);
            }}
          >
            {t("Programs.form_contract")}
          </button>
        </div>
      )} */}
    </div>
  );
});
