import React, { useState } from "react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { DealType } from "../../../../assets/types/Portfolio";
import { InvestPlanType } from "../../../../store/investingPlans/reducer";
import { useAppSelector } from "../../../../store";
import instance from "../../../../api/instance";
import { Loader } from "../../../../api/Loader";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import styles from "../Portfolio.module.scss";
import ModalMain from "../../../../UIcomponents/mainModal/ModalMain";

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

  const handleClose = () => {
    setSumReplanish("");
    setIsCalculate(false);
    setOpen(false);
  };

  return (
    <ModalMain
      isOpen={open}
      handleClose={handleClose}
      title={` ${t("Programs.replenishment_of_portfolio")} #${deal?.id} (${t(
        "Programs.current_sum"
      )}
      ${deal?.sum} USD)`}
      isHideClose={true}
    >
      <div className={styles.modal_content}>
        <input
          className="gray_input_w100"
          placeholder={t("Programs.enter_replanish_sum")}
          value={sumReplanish}
          onChange={(e) => {
            setIsCalculate(false);
            if (isFinite(+e.target.value)) {
              setSumReplanish(e.target.value);
            }
          }}
        />

        {isCalculate ? (
          <>
            {newInvestPlasForSelect.length > 1 && (
              <>
                <div>{t("DopItem2.replanish_new_program")}</div>

                <select
                  value={newInvestPlanId}
                  onChange={(e) => {
                    setNewInvestPlanId(+e.target.value);
                  }}
                  className="gray_input_w100"
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
                  <div>
                    {t("DopItem2.replanish_description")}
                    <div style={{ fontWeight: "bold" }}>
                      {t("Main.portfolio")}: &nbsp;
                      {
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
                <div>
                  {t("Programs.sum_for_insurance")}
                  {insurancePrice.toFixed(2)}
                </div>
                <div>
                  {t("DopItem2.sum_for_auto")}
                  {speedPrice.toFixed(2)}
                </div>
              </>
            )}

            <button
              onClick={handleReplanish}
              className="dark_green_button"
              style={{ width: "100%" }}
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
              {t("Programs.pay")} &nbsp;
              {newInvestPlanId && newInvestPlanId === investPlan.id
                ? (+sumReplanish + speedPrice + insurancePrice).toFixed(2)
                : (+sumReplanish).toFixed(2)}{" "}
              &nbsp; USD
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
                      +userData.value.balanceBusiness,
                      2
                    )
                  : getNumWithoutZeroToFixedN(+userData.value.balance, 2)}
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
    </ModalMain>
  );
};
