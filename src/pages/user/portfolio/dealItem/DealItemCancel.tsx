import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { DealType } from "../../../../assets/types/Portfolio";
import { useText } from "../../../../hooks/useText";
import { useTimer } from "../../../../hooks/useTimer";

const day21 = 21 * 24 * 60 * 60 * 1000;

type PropType = {
  deal: DealType;
  numberDeal: number;
  isTimeout?: boolean;
  resumeDeal?: any;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DealItemCancel = ({
  deal,
  numberDeal,
  isTimeout,
  resumeDeal,
  refresh,
  setRefresh,
  setCurrentPage,
}: PropType) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const [success, setSuccess] = useState(false);

  // const { currencyRates } = useSelector((state: any) => state);
  // const [rate, setRate] = useState(currencyRates.value[1].rate);

  // const countE = (numberSTR) => {
  //   const str = numberSTR.toString();
  //   let counter = 0;
  //   for (let i = 0; i < str.length; i++) {
  //     if (str[i] === "0" || str[i] === ".") {
  //       counter++;
  //     } else {
  //       return counter;
  //     }
  //   }
  // };

  const resumeDealLocal = async () => {
    setIsLoading(true);
    await resumeDeal(deal.id, false, "Usdc");
    setCurrentPage(1);
    setRefresh(!refresh);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (success) {
  //     setSuccess(false);
  //     resumeDeal(deal.id, false, "Usdc");
  //     setCurrentPage(1);
  //     setRefresh(!refresh);
  //     // console.log("Возобновлена", deal.id);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [success]);

  const handleCancel = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  const { day, hours, minute, seconds } = useTimer(
    Date.parse(deal.endDate) + day21
  );

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
    day,
    t("Programs.days1"),
    t("Programs.days2"),
    t("Programs.days3")
  );

  return (
    <div className="cancel_item deal_item ">
      <div style={{ marginBottom: "0" }} className="deal_top">
        {t("Programs.deal")} #{numberDeal}
      </div>
      {/* <ModalConfirm
        open={open}
        setOpen={setOpen}
        // setSuccess={setSuccess}
        submitHandler={resumeDealLocal}
        isDate={true}
        isLoading={isLoading}
      /> */}
      <div className="deal_top_row">
        {!isTimeout && (
          <div className="deal_top_row_left">
            <div className="deal_top_row_left_top">{dayText}</div>
            <div className="deal_top_row_left_numb">{day}</div>
          </div>
        )}

        <div className="cancel_timer deal_top_row_timer">
          {isTimeout && (
            <div className=" deal_top_row_timer_top deal_item_cloze ">
              {t("Programs.deposit_returned")}
            </div>
          )}
          {!isTimeout && (
            <div className=" deal_top_row_timer_top ">
              <span id="hours">{hours} </span>
              <span id="minutes">{minute} </span>
              <span id="seconds">{seconds} </span>
            </div>
          )}
          {!isTimeout && (
            <div className="deal_top_row_timer_bottom">
              <span>{hourText}</span>
              <span>{minText}</span>
              <span>{secText}</span>
            </div>
          )}
        </div>
      </div>
      <div
        style={{ marginBottom: isTimeout ? "15px" : "" }}
        className="text_vozvrat"
      >
        <p>{isTimeout ? t("History.deal_closed") : t("History.return_in")}</p>
      </div>
      <div className="deal_item_money">
        <div className="deal_item_money_left">
          {t("Programs.your")}
          <br />
          {t("Programs.earnings")}
        </div>
        {/* <div className="deal_item_money_right">{deal.sumIncome.toFixed(countE(deal.sumIncome))}</div> */}
        <div className="deal_item_money_right">{deal.sumIncome.toFixed(2)}</div>
      </div>
      {!isTimeout && (
        <div className="deal_item_range">
          <div className="form_entry_in_program_bottom_range">
            <form>
              <div className="input_strax">
                <label>{t("Programs.portfolio_is_insured")}</label>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isTimeout && (
        <div className="deal_item_btns">
          <a
            href="/"
            onClick={handleCancel}
            style={{ width: "100%" }}
            className="deal_item_pay_btn"
          >
            <span> {t("Programs.resume")}</span>
          </a>
        </div>
      )}
      {/* <div>deal.sum:{deal.sum}</div>
      <div>deal.sumIncome:{deal.sumIncome}</div>
      <div>deal.speedPercent:{deal.speedPercent}</div>
      <div>rate:{rate}</div> */}
    </div>
  );
};
