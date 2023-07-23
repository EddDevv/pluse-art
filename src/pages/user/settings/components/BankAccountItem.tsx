import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import instance from "../../../../api/instance";
import ModalMain from "../../../../UIcomponents/mainModal/ModalMain";
import { useAppSelector } from "../../../../store";
import styles from "../Settings.module.scss";
import { Loader } from "../../../../api/Loader";
import {
  BancAccountForm,
  BankAccountType,
} from "../../../../assets/types/Bank";
import { SubmitHandler, useForm } from "react-hook-form";

type PropType = {
  bankAccount?: BankAccountType;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddAccount?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BankAccountItem = ({
  bankAccount,
  refresh,
  setRefresh,
  setIsAddAccount,
}: PropType) => {
  // **********Translation i18next***********
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userData, allInfoUser } = useAppSelector((state) => state);

  const [gaAuthEnabled, setGaAuthEnabled] = useState(false);
  const [codeGa, setCodeGa] = useState("");
  // Initialize react hook form
  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isValid },
  } = useForm<BancAccountForm>({
    mode: "all",
  });
  const [accountNumber, setAccountNumber] = useState("");

  const empty: BancAccountForm = {
    bankBIK: "",
    bankINN: "",
    bankKorrSchet: "",
    bankKPP: "",
    bankShortName: "",
    bankAccountNumber: "",
  };

  // Проверка актививрованости GA по данным пользователя с бека
  useEffect(() => {
    if (userData?.value?.userInfo?.confirmationType === "GA") {
      setGaAuthEnabled(true);
    } else {
      setGaAuthEnabled(false);
    }
    bankAccount && reset(bankAccount);
  }, [userData]);

  // Submit settings form
  const onSubmitBancAccount: SubmitHandler<BancAccountForm> = async (data) => {
    setIsLoading(true);
    const fetchData = {
      ...data,
      code: gaAuthEnabled ? codeGa : "111111",
    };
    try {
      await instance.post(
        `/api/Profile/requisites/add-bank-account`,
        fetchData
      );
      toast.success(t("SettingsPage.acc"));
      setCodeGa("");
      setAccountNumber("");
      reset(empty);
      setIsAddAccount && setIsAddAccount(false);
      setRefresh(!refresh);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!bankAccount) return;
    setIsLoading(true);
    try {
      const res = await instance.delete(
        `api/Profile/requisites/${bankAccount.id}`
      );
      if (res?.status >= 200 && res.status < 300) {
        toast.success(t("DopItems.account_deleted"));
        setIsOpen(false);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error(t("DopItems.account_deleting_error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.collapse_item}>
      {/* <input
        value={wallet?.objectName}
        color="secondary"
        className="gray_input"
      />
      <input
        value={wallet?.cryptoWallet}
        color="secondary"
        className="wallets_value"
      /> */}
      <div className={styles.column_gap4}>
        <div className={styles.flex}>
          <div className={styles.half}>
            <div className={styles.input_row}>
              <div className={styles.label_120}>{t("SettingsPage.bank_name")}</div>
              <div className={styles.w100}>
                <input
                  type="text"
                  className={`gray_input ${styles.w100}`}
                  {...register("bankShortName", {
                    required: t("SettingsPage.requared").toString(),
                    minLength: {
                      value: 4,
                      message: "Минимум 4 символов!",
                    },
                    maxLength: {
                      value: 40,
                      message: "Максимум 40 символов!",
                    },
                  })}
                  readOnly={Boolean(bankAccount)}
                />
                {errors?.bankShortName && (
                  <div className="required">
                    {errors.bankShortName.message || "Error!"}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.input_row}>
              <div className={styles.label_120}>{t("SettingsPage.bank_bik")}</div>
              <div className={styles.w100}>
                <input
                  type="text"
                  className={`gray_input ${styles.w100}`}
                  {...register("bankBIK", {
                    required: t("SettingsPage.requared").toString(),
                    minLength: {
                      value: 4,
                      message: "Минимум 4 символов!",
                    },
                    maxLength: {
                      value: 40,
                      message: "Максимум 40 символов!",
                    },
                  })}
                  readOnly={Boolean(bankAccount)}
                />
                {errors?.bankBIK && (
                  <div className="required">
                    {errors.bankBIK.message || "Error!"}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ************************************ */}
          <div className={styles.half}>
            <div className={styles.input_row}>
              <div className={styles.label_120}>{t("SettingsPage.bank_inn")}</div>
              <div className={styles.w100}>
                <input
                  type="text"
                  className={`gray_input ${styles.w100}`}
                  {...register("bankINN", {
                    required: t("SettingsPage.requared").toString(),
                    minLength: {
                      value: 4,
                      message: "Минимум 4 символов!",
                    },
                    maxLength: {
                      value: 40,
                      message: "Максимум 40 символов!",
                    },
                  })}
                  readOnly={Boolean(bankAccount)}
                />
                {errors?.bankINN && (
                  <div className="required">
                    {errors.bankINN.message || "Error!"}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.input_row}>
              <div className={styles.label_120}>{t("SettingsPage.bank_kpp")}</div>
              <div className={styles.w100}>
                <input
                  type="text"
                  className={`gray_input ${styles.w100}`}
                  value={accountNumber}
                  {...register("bankKPP", {
                    // required: t("SettingsPage.requared").toString(), // СДЕЛАЛ НЕ ОБЯЗАТЕЛЬНЫЙ 16.03.22
                    minLength: {
                      value: 4,
                      message: "Минимум 4 символов!",
                    },
                    maxLength: {
                      value: 12,
                      message: "Максимум 12 символов!",
                    },
                  })}
                  readOnly={Boolean(bankAccount)}
                />
                {errors?.bankKPP && (
                  <div className="required">
                    {errors.bankKPP.message || "Error!"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ************************************ */}
        <div className={styles.input_row}>
          <div className={styles.label_120}>{t("SettingsPage.bank_kor")}</div>
          <div className={styles.w100}>
            <input
              type="text"
              className={`gray_input ${styles.w100}`}
              {...register("bankKorrSchet", {
                // required: t("SettingsPage.requared").toString(), // СДЕЛАЛ НЕ ОБЯЗАТЕЛЬНЫЙ 16.03.22
                minLength: {
                  value: 4,
                  message: "Минимум 4 символов!",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов!",
                },
              })}
              readOnly={Boolean(bankAccount)}
            />
            {errors?.bankKorrSchet && (
              <div className="required">
                {errors.bankKorrSchet.message || "Error!"}
              </div>
            )}
          </div>
        </div>
        <div className={styles.input_row}>
          <div className={styles.label_120}>{t("SettingsPage.acc_num")}</div>
          <div className={styles.w100}>
            <input
              type="text"
              className={`gray_input ${styles.w100}`}
              value={
                bankAccount ? bankAccount.bankAccountNumber : accountNumber
              }
              {...register("bankAccountNumber", {
                required: t("SettingsPage.requared").toString(),
                onChange: (e) => setAccountNumber(e.target.value),
                minLength: {
                  value: 4,
                  message: "Минимум 4 символов!",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов!",
                },
              })}
              readOnly={Boolean(bankAccount)}
            />
            {errors?.bankAccountNumber && (
              <div className="required">
                {errors.bankAccountNumber.message || "Error!"}
              </div>
            )}
          </div>
        </div>

        {/* ....ИНПУТ ПОДТВЕРЖЕНИЯ GA................... */}
        {gaAuthEnabled && (
          <div className={styles.input_row}>
            <div className={styles.label_120}>{t("SettingsPage.verification")}</div>
            <div className={styles.w100}>
              <input
                value={codeGa}
                onChange={(e) => setCodeGa(e.target.value)}
                type="number"
                className={`gray_input ${styles.w100}`}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.button_flex}>
        {bankAccount && (
          <button
            className="outline_green_button_2"
            onClick={() => setIsOpen(true)}
          >
            {t("New.delete")}
          </button>
        )}
        {!bankAccount && (
          <button
            className="dark_green_button_2"
            disabled={isLoading || !isValid}
            onClick={handleSubmit(onSubmitBancAccount)}
          >
            <div className="loader_for_button">
              <Loader loading={isLoading} />
            </div>
            {t("SettingsPage.save")}
          </button>
        )}
      </div>

      <ModalMain
        isOpen={isOpen}
        title={`${t("DopItems.delete_account")} №${
          bankAccount?.bankAccountNumber
        } ${t("DopItems.in_the_bank")} ${bankAccount?.bankShortName} ?`}
        handleClose={() => setIsOpen(false)}
        handleSubmit={() => {
          deleteAccount();
        }}
      />
    </div>
  );
};
