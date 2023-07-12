import React, { useState } from "react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { DealType } from "../../../../assets/types/Portfolio";
import { InvestPlanType } from "../../../../store/investingPlans/reducer";
import { useAppSelector } from "../../../../store";
import instance from "../../../../api/instance";
import { Fade } from "@chakra-ui/react";
import { Loader } from "../../../../api/Loader";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";

type PropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deal: DealType;
  investPlan: InvestPlanType;
  getMainInfo: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
// export const Programs = [
//   { id: 61947, name: "SILVER" },
//   { id: 61948, name: "GOLD" },
//   { id: 61949, name: "PLATINUM" },
// ];

export const ModalReplanish = ({
  open,
  setOpen,
  deal,
  investPlan,
  getMainInfo,
  setCurrentPage,
  refresh,
  setRefresh,
}: PropType) => {
  const { t } = useTranslation();
  const Programs = [
    { id: 61947, name: t("DopItem2.portfel_1") },
    { id: 61948, name: t("DopItem2.portfel_2") },
    { id: 61949, name: t("DopItem2.portfel_3") },
  ];
  // const { businessBalance } = useAppSelector((state) => state.allInfoUser);
  const { userData, investPlans } = useAppSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const [sumReplanish, setSumReplanish] = useState<number | string>("");
  const [isCalculate, setIsCalculate] = useState<boolean>(false);
  const [speedPrice, setSpeedPrice] = useState<number>(0);
  const [insurancePrice, setInsurancePrice] = useState<number>(0);
  // const [isNewProgram, setIsNewProgram] = useState<boolean>(false);
  const [investProgramId, setInvestProgramId] = useState<number>(0);

  // const [account, setAccount] = useState<string>(AccountEnum.Inner);

  const [newInvestPlasForSelect, setNewInvestPlasForSelect] = useState<
    InvestPlanType[]
  >([]);
  const [newInvestPlanId, setNewInvestPlanId] = useState<number>(0);

  const handleReplanish = async () => {
    setIsLoading(true);
    try {
      const rd = {
        investmentId: deal.id,
        sum: +sumReplanish,
        programId: newInvestPlanId,
      };

      const response = await instance.post(`api/Marketing/replenish`, rd);
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(t("Programs.portfolio_added"));
        await getMainInfo();
        setCurrentPage(1);
        setRefresh(!refresh);
        setOpen(false);
        setNewInvestPlasForSelect([]);
        setNewInvestPlanId(0);
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
      setIsLoading(false);
    }
  };

  const handleCalculateSum = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(
        `api/Marketing/replenish-extra-sum?InvestmentId=${deal.id}&sum=${sumReplanish}`
      );
      if (response?.status >= 200 && response?.status < 300) {
        setInvestProgramId(response.data.investProgramId);
        setSpeedPrice(response.data.speedPrice);
        setInsurancePrice(response.data.insurancePrice);
        setIsCalculate(true);
        setNewInvestPlasForSelect(
          investPlans.value.filter(
            (el) =>
              +sumReplanish + deal.sum >= +el.minSum && el.id >= investPlan.id
          )
        );
        setNewInvestPlanId(investPlan.id);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fade in={open}>
      <div className="modal__wrapper">
        <div className="modal__text priceModal_noPadding">
          <div
            onClick={() => {
              setSumReplanish("");
              setIsCalculate(false);
              setOpen(false);
            }}
            className="close_menu_btn close_window"
          >
            <span className="before arrow_color" />
            <span className="after arrow_color" />
          </div>

          <div className="text__wrapper" style={{ marginTop: "20px" }}>
            <div className="balance_sidebar_title texp_price_modal">
              {t("Programs.replenishment_of_portfolio")} №{deal?.id} (
              {t("Programs.current_sum")}
              {deal?.sum} USD )
            </div>
            <div
              className="balance_sidebar_total texp_priceValue_modal"
              style={{ marginTop: "20px", fontSize: 12, width: "70%" }}
            >
              <input
                id="outlined-basic"
                className="gray_input"
                placeholder={t("Programs.enter_replanish_sum")}
                value={sumReplanish}
                onChange={(e) => {
                  setIsCalculate(false);
                  if (isFinite(+e.target.value)) {
                    setSumReplanish(e.target.value);
                  }
                }}
              />
            </div>

            {isCalculate ? (
              <>
                {newInvestPlasForSelect.length > 1 && (
                  <>
                    <div
                      className="balance_sidebar_total texp_priceValue_modal"
                      style={{ color: "#6D08F3" }}
                    >
                      {t("DopItem2.replanish_new_program")}
                    </div>

                    <select
                      value={newInvestPlanId}
                      onChange={(e) => {
                        setNewInvestPlanId(+e.target.value);
                      }}
                      className="select_filter "
                      name="filter"
                      style={{ marginBottom: "20px" }}
                    >
                      {newInvestPlasForSelect?.length > 0 &&
                        newInvestPlasForSelect.map((el) => (
                          <option key={el.investPlan} value={el.id}>
                            {el.name}{" "}
                            {el.id === investPlan.id &&
                              t("DopItem2.current_portfel")}
                          </option>
                        ))}
                    </select>

                    {newInvestPlanId && newInvestPlanId !== investPlan.id && (
                      <div
                        className="balance_sidebar_total texp_priceValue_modal"
                        style={{
                          color: "#6D08F3",
                        }}
                      >
                        {t("DopItem2.replanish_description")}
                        <div style={{ fontWeight: "bold" }}>
                          {t("Main.portfolio")}: &nbsp;
                          {
                            // Programs.find((elem) => elem.id === investProgramId)
                            //   ?.name

                            newInvestPlasForSelect.find(
                              (el) => el.id === newInvestPlanId
                            )?.name
                          }
                        </div>
                      </div>
                    )}
                  </>
                )}
                {newInvestPlanId && newInvestPlanId === investPlan.id && (
                  <>
                    <div
                      className="balance_sidebar_total texp_priceValue_modal"
                      style={{ color: "#6D08F3" }}
                    >
                      {t("Programs.sum_for_insurance")}
                      {insurancePrice.toFixed(2)}
                    </div>
                    <div
                      className="balance_sidebar_total texp_priceValue_modal"
                      style={{ color: "#6D08F3" }}
                    >
                      {t("DopItem2.sum_for_auto")}
                      {speedPrice.toFixed(2)}
                    </div>
                  </>
                )}

                <button
                  onClick={handleReplanish}
                  className="outline_green_button"
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
                      +sumReplanish + speedPrice + insurancePrice >
                      userData.value.balanceBusiness) ||
                    (deal.isPromo === false &&
                      +sumReplanish + speedPrice + insurancePrice >
                      userData.value.balance)
                  }
                >
                  <div className="loader_for_button">
                    <Loader loading={isLoading} />
                  </div>
                  {t("Programs.pay")}{" "}
                  {newInvestPlanId && newInvestPlanId === investPlan.id
                    ? (+sumReplanish + speedPrice + insurancePrice).toFixed(2)
                    : (+sumReplanish).toFixed(2)}
                </button>

                {((deal.isPromo === true &&
                  +sumReplanish + speedPrice + insurancePrice >
                  userData.value.balanceBusiness) ||
                  (deal.isPromo === false &&
                    +sumReplanish + speedPrice + insurancePrice >
                    userData.value.balance)) && (
                    <div className="required">
                      {t("Programs.not_enough_money")}:{" "}
                      {deal.isPromo === true
                        ? getNumWithoutZeroToFixedN(
                          +userData.value.balanceBusiness, 2
                        )
                        : getNumWithoutZeroToFixedN(
                          +userData.value.balance, 2
                        )}
                    </div>
                  )}
              </>
            ) : (
              sumReplanish && (
                <button
                  onClick={handleCalculateSum}
                  className="dark_green_button"
                  disabled={isLoading}
                >
                  <div className="loader_for_button">
                    <Loader loading={isLoading} />
                  </div>
                  {t("DopItem2.calculate")}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};
