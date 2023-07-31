import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { AccountEnum } from "./Withdrawal.types";

import instance from "../../../api/instance";
import { toast } from "react-toastify";

import { UserType } from "../Users/UserList.types";
import {
  Box,
  FormControl,
  Input,
  MenuItem,
  Modal,
  Select,
} from "@chakra-ui/react";

type IProps = {
  open: boolean;
  handleClose: () => void;
  isNeedUpdate?: number;
  setIsNeedUpdate?: any;
  loginForTransfer?: string;
  setLoginForTransfer?: any;
  refresh: boolean;
  setRefresh: any;
  chosenItem?: UserType | null;
  setChosenItem?: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: ["Montserrat", "sans-serif"].join(","),
};

type IFormInput = {
  partnerId: number | string;
  sum: number | string;
  paymentRequisitesId: string;
  accountName: AccountEnum;
};

const WithdrawalItem = (props: IProps) => {
  const [account, setAccount] = useState("");

  const emptyItem: IFormInput = {
    partnerId: props?.chosenItem?.id ? props?.chosenItem?.id : "",
    sum: "",
    paymentRequisitesId: "",
    accountName: AccountEnum.Inner,
  };

  useEffect(() => {
    reset({
      partnerId: props?.chosenItem?.id ? props?.chosenItem?.id : "",
      sum: "",
      paymentRequisitesId: "",
      accountName: AccountEnum.Inner,
    });
    // eslint-disable-next-line
  }, [props.chosenItem]);

  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "all",
  });

  const onSubmitForm: SubmitHandler<IFormInput> = async (data) => {
    const url = `api/Manage/withdraw?partnerId=${data.partnerId}&sum=${data.sum}&paymentRequisitesId=${data.paymentRequisitesId}&accountName=${account}`;

    try {
      const response = await instance.post(url);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Вывод стредств успешно осуществлен.");
        //  props.setIsNeedUpdate(props.isNeedUpdate + 1);
        props.setRefresh(!props.refresh);
        handleClose();
      }
    } catch (e) {
      console.error("Ошибка создания вывода", e);
      toast.error("Ошибка создания вывода.");
    }
  };

  const handleClose = async () => {
    reset(emptyItem);
    setAccount(AccountEnum.Inner);
    props.handleClose();
  };

  return (
    <>
      <Modal
        isOpen={props.open}
        onClose={props.handleClose}
        // disableEscapeKeyDown={true}
        // hideBackdrop={true}
      >
        <div>
          <Box color="#6484AA">Создание вывода средств</Box>

          <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Input
                placeholder="ID партнера"
                variant="outlined"
                // sx={{ marginTop: 4, width: "100%" }}
                disabled={props?.chosenItem ? true : false}
                {...register("partnerId", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              {errors?.partnerId && (
                <div style={{ color: "red" }}>
                  {errors.partnerId.message || "Error!"}
                </div>
              )}

              <Input
                placeholder="Сумма"
                variant="outlined"
                sx={{ marginTop: 4, width: "100%" }}
                {...register("sum", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              {errors?.sum && (
                <div style={{ color: "red" }}>
                  {errors.sum.message || "Error!"}
                </div>
              )}

              <Input
                placeholder="Реквизиты (ID кошелька)"
                variant="outlined"
                sx={{ marginTop: 4, width: "100%" }}
                {...register("paymentRequisitesId", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              {errors?.paymentRequisitesId && (
                <div style={{ color: "red" }}>
                  {errors.paymentRequisitesId.message || "Error!"}
                </div>
              )}

              <FormControl
              // fullWidth sx={{ marginTop: 4, width: "100%" }}
              >
                <div>Счет</div>
                <Select
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                  placeholder="Счет"
                >
                  {Object.keys(AccountEnum).map((elem, i) => (
                    <option key={i} value={elem}>
                      {elem}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="manager__button_ok"
                  onClick={handleSubmit(onSubmitForm)}
                  disabled={!isValid}
                  type="submit"
                  // variant="contained"
                >
                  Сохранить
                </button>
                <button className="manager__button_close" onClick={handleClose}>
                  Закрыть
                </button>
              </Box>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithdrawalItem;
