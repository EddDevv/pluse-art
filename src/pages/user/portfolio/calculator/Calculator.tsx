import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import styles from "./Calculator.module.scss";
import { useAppSelector } from "../../../../store";
import {
  AccountsForRdEnum,
  AccountsFullEnum,
  COLORS,
  speedMaxEnum,
} from "../../../../assets/consts/consts";
import {
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { InvestPlanType } from "../../../../store/investingPlans/reducer";
import { toast } from "react-toastify";
import { MainApi } from "../../../../api/main/mainApi";
import { getNumWithoutZeroToFixedN } from "../../../../utils/getNumWithoutZeroToFixedN/getNumWithoutZeroToFixedN";
import ModalMain from "../../../../UIcomponents/mainModal/ModalMain";
import instance from "../../../../api/instance";

type PropsType = {
  portfolioId: number;
  investPlan: InvestPlanType;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const Calculator = ({
  portfolioId,
  investPlan,
  refresh,
  setRefresh,
}: PropsType) => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state) => state.investPlans);
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");

  const { allInfoUser } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [isInsure, setIsInsure] = useState("true");
  const [speed, setSpeed] = useState<string>("no");
  const [account, setAccount] = useState<string>(AccountsFullEnum.Usd);
  const [totalPrice, setTotalPrice] = useState(investPlan.minSum);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [accounts, setAccounts] = useState<string[]>([]);

  const updatePage = () => {
    setSpeed("no");
    setIsInsure("true");
    setTotalPrice(investPlan.minSum);
  };

  useEffect(() => {
    updatePage();
  }, [investPlan]);

  const getSpeed = () => {
    switch (speed) {
      case "no":
        return 0;
        break;
      case "1":
        return 1;
        break;
      case "2":
        return 2;
        break;
      case "3":
        return 3;
        break;
      case "4":
        return 4;
        break;
      case "5":
        return 5;
        break;
      default:
        return 0;
    }
  };

  const getSpeedSumPercent = () => {
    switch (speed) {
      case "no":
        return 0;
        break;
      case "1":
        return investPlan.speedPrice;
        break;
      case "2":
        return investPlan.speedPrice * 2;
        break;
      case "3":
        return investPlan.speedPrice * 3;
        break;
      case "4":
        return investPlan.speedPrice * 4;
        break;
      case "5":
        return investPlan.speedPrice * 5;
        break;
      default:
        return 0;
    }
  };

  const getTotalSum = () => {
    if (!totalPrice) return 0;
    let sum = +getSpeedSumPercent() * totalPrice + +totalPrice;
    if (isInsure === "true") {
      sum = sum + investPlan.insurancePrice * +totalPrice;
    }
    return sum;
  };

  const getIncomePerMonth = () => {
    if (!totalPrice) return 0;

    let sum =
      (investPlan.percentPerMonth + investPlan.speedPercent * getSpeed()) *
      totalPrice;
    return sum;
  };

  useEffect(() => {
    checkBalances();
  }, [investPlan, allInfoUser.value]);

  const checkBalances = () => {
    const array: string[] = [];
    Object.entries(allInfoUser.value).forEach((elem) => {
      if (elem[0].startsWith("balance") && elem[1]) {
        if (elem[0] === "balance" && +elem[1] >= investPlan.minSum) {
          array.push("Usd");
        }
      }
    });
    setAccounts(array);
    if (array.length > 0) {
      if (!array.includes(AccountsFullEnum.Bitcoin)) {
        setAccount(array[0]);
      }
    }
  };

  // Confirm entry to investing program
  const handleConfirm = async () => {
    if (totalPrice < investPlan.minSum) {
      toast.error(
        `${t("Programs.sum_have_to_be_lager")} ${investPlan.minSum} USDT`
      );
      setIsOpen(false);
      return;
    }
    try {
      setLoading(true);

      const requestBody = {
        sum: totalPrice,
        investPlan: investPlan.investPlan,
        insurance: isInsure === "true" ? true : false,
        investSpeed: getSpeed(),
        accountName: Object(AccountsForRdEnum)[account],
      };

      const response = await instance.post(
        `api/Marketing/create-investment`,
        requestBody
      );

      toast.success(t("Programs.congratulate"));
      setLoading(false);
      setIsOpen(false);
      updatePage();
      setRefresh(!refresh);
      await MainApi.getInitialMainReduxInfo();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={`${styles.paper}`}>
        <div className={styles.green_block}>
          {isLagerThan480
            ? t(`New.portfolio_name_${portfolioId}_of`)
            : t(`New.portfolio_name_short`)}
        </div>

        <div className={styles.inputs_box}>
          <div className={styles.flex}>
            <div>{t("New.portfolio_sum")}</div>
            <input
              className={`gray_input ${styles.sum_input}`}
              placeholder={t("New.input_sum_amoumt")}
              value={totalPrice}
              onChange={(event: any) => {
                if (event.target.value <= investPlan.maxSum) {
                  setTotalPrice(event.target.value);
                }
              }}
            />
          </div>

          <div className={styles.flex}>
            <div className={styles.min_max}>
              {value[portfolioId].minSum?.toLocaleString()} USD
            </div>
            <div className={styles.min_max}>
              {value[portfolioId]?.maxSum?.toLocaleString()} USD
            </div>
          </div>

          <div className={styles.range}>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="teal"
              min={investPlan.minSum}
              max={investPlan.maxSum}
              step={10}
              value={[totalPrice]}
              onChange={(event) => {
                setTotalPrice(event[0]);
              }}
            >
              <RangeSliderTrack style={{ height: "7px", borderRadius: "3px" }}>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bg={"teal"} />
            </RangeSlider>

            {/* <input
                            type="range"
                            style={{ accentColor: "teal" }}
                        /> */}
          </div>

          <div className={styles.flex_start}>
            <div className={styles.first}>{t("Programs.insurance")}</div>
            <div>
              <RadioGroup
                colorScheme="teal"
                onChange={(e) => setIsInsure(e)}
                value={isInsure}
              >
                <Stack direction="row" spacing={isLagerThan480 ? 8 : "4px"}>
                  <Radio value="true">{t("DopItems.yes")}</Radio>
                  <Radio value="false">{t("DopItems.no")}</Radio>
                </Stack>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.flex_start}>
            <div className={styles.first}>{t("Programs.auto")}</div>
            <RadioGroup
              onChange={(e) => setSpeed(e)}
              value={speed}
              colorScheme="teal"
            >
              {!isLagerThan480 && (
                <Stack
                  direction="row"
                  // gap={45}
                  spacing={isLagerThan480 ? 8 : 8}
                  mb={4}
                >
                  {["no"].map((elem) => (
                    <Radio
                      key={elem}
                      value={elem}
                      color={"teal.500"}
                      isDisabled={
                        elem === "no" || +elem <= speedMaxEnum[portfolioId]
                          ? false
                          : true
                      }
                    >
                      {elem === "no" ? (
                        t("DopItems.no")
                      ) : (
                        <div className={styles.green_speed}>{elem} X</div>
                      )}
                    </Radio>
                  ))}
                </Stack>
              )}
              <Stack
                direction="row"
                // gap={45}
                spacing={isLagerThan760 ? 8 : 4}
              >
                {isLagerThan480
                  ? ["no", "1", "2", "3", "4", "5"].map((elem) => (
                      <Radio
                        key={elem}
                        value={elem}
                        color={"teal.500"}
                        isDisabled={
                          elem === "no" || +elem <= speedMaxEnum[portfolioId]
                            ? false
                            : true
                        }
                      >
                        {elem === "no" ? (
                          t("DopItems.no")
                        ) : (
                          <div className={styles.green_speed}>{elem} X</div>
                        )}
                      </Radio>
                    ))
                  : ["1", "2", "3", "4", "5"].map((elem) => (
                      <Radio
                        key={elem}
                        value={elem}
                        color={"teal.500"}
                        isDisabled={
                          elem === "no" || +elem <= speedMaxEnum[portfolioId]
                            ? false
                            : true
                        }
                      >
                        {elem === "no" ? (
                          t("DopItems.no")
                        ) : (
                          <div className={styles.green_speed}>{elem}X</div>
                        )}
                      </Radio>
                    ))}
              </Stack>
            </RadioGroup>
          </div>
        </div>

        <div className={styles.sum_box}>
          <div className={styles.sum_item}>
            <div className={styles.sum_desc}>{t("New.sum_insure")}</div>
            <div>
              <b className={styles.big_text}>
                {isInsure === "true" && totalPrice
                  ? getNumWithoutZeroToFixedN(
                      totalPrice * investPlan.insurancePrice,
                      2
                    )
                  : 0}
              </b>
              &nbsp; USD
            </div>
          </div>

          <div className={styles.sum_item}>
            <div className={styles.sum_desc}>{t("New.sum_auto")}</div>
            <div>
              <b className={styles.big_text}>
                {totalPrice &&
                  getNumWithoutZeroToFixedN(
                    getSpeedSumPercent() * totalPrice,
                    2
                  )}
              </b>
              &nbsp; USD
            </div>
          </div>

          <div className={styles.sum_item}>
            <div className={styles.sum_desc}>{t("New.sum_portfolio")}</div>
            <div style={{ color: COLORS.GREEN }}>
              <b className={styles.big_text}>
                {getNumWithoutZeroToFixedN(getTotalSum(), 2)}
              </b>
              &nbsp; USD
            </div>
          </div>

          <div className={styles.sum_item}>
            <div className={styles.sum_desc}>{t("New.sum_income")}</div>
            <div style={{ color: "#F25822" }}>
              <b className={styles.big_text}>
                {getNumWithoutZeroToFixedN(getIncomePerMonth(), 2)}
              </b>
              &nbsp; USD
            </div>
          </div>
        </div>

        <div className={styles.footer_box}>
          <div className={styles.footer_item}>{t("New.buy_note")}</div>
          <div className={`${styles.footer_item}  `}>
            <button
              className="dark_orange_button_w100"
              onClick={() => setIsOpen(true)}
            >
              {t("Programs.buy")}
            </button>
          </div>
        </div>
      </div>
      {/* ******************Modal****************** */}
      <ModalMain
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        title={t("New.buying_portfolio")}
        handleSubmit={handleConfirm}
      >
        <div
          style={{
            color: COLORS.GREEN,
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <b className={styles.big_text}>
            {getNumWithoutZeroToFixedN(getTotalSum(), 2)}
          </b>
          &nbsp; USD
        </div>

        <div
          style={{
            width: "100%",
            paddingBottom: "20px",
            textAlign: "center",
            color: "#e73351",
            fontWeight: "bold",
          }}
        >
          {t("DopItem2.deal_start_in2")}
        </div>
      </ModalMain>
    </>
  );
};

export default Calculator;
