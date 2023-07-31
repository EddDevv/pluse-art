import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { AccountEnum, TransferTypeEnum } from "./Withdrawal.types";

import instance from "../../../api/instance";
import { toast } from "react-toastify";

import { UserType } from "../Users/UserList.types";
import { Loader } from "../../../api/Loader";
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
  chosenItem?: UserType | null;
  setChosenItem?: React.Dispatch<React.SetStateAction<UserType | null>>;
  refresh: boolean;
  setRefresh: any;
  isCorrectTransfer: boolean;
  setIsCorrectTransfer: React.Dispatch<React.SetStateAction<boolean>>;
  // loginForTransfer?: string;
  // setLoginForTransfer?: any;
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
  paymentSum: number | string;
  accountName: AccountEnum;
  paymentPurpose: string;
  transferType: TransferTypeEnum;
};

const TransferItem = (props: IProps) => {
  const [account, setAccount] = useState("");
  // const [type, setType] = useState<string>(TransferTypeEnum.input);
  const [isLoading, setIsLoading] = useState(false);

  const emptyItem: IFormInput = {
    partnerId: props?.chosenItem?.id ? props?.chosenItem?.id : "",
    paymentSum: "",
    accountName: AccountEnum.Inner,
    paymentPurpose: "",
    transferType: TransferTypeEnum.input,
  };

  useEffect(() => {
    reset(emptyItem);
    // console.log(TransferTypeEnum.replenish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setIsLoading(true);
    let url = `api/Manage/replenish?`;
    // if (type === TransferTypeEnum.replenish) {
    if (props.isCorrectTransfer === false) {
      url = "api/Manage/replenish?";
    } else {
      url = "api/Manage/output-transfer?";
    }
    // if (type === TransferTypeEnum.input) {
    //   url = "api/Manage/input-transfer?";
    // } else if (type === TransferTypeEnum.output) {
    //   url = "api/Manage/output-transfer?";
    // }
    const fullUrl = `${url}partnerId=${data.partnerId}&paymentSum=${data.paymentSum}&accountName=${account}&paymentPurpose=${data.paymentPurpose}`;

    try {
      const response = await instance.post(fullUrl);
      if (response.status >= 200 && response.status < 300) {
        if (props.isCorrectTransfer === false) {
          toast.success("Пополнено!");
        } else {
          toast.success("Списано!");
        }

        //  props.setIsNeedUpdate(props.isNeedUpdate + 1);
        handleClose();
        props.setRefresh(!props.refresh);
      }
    } catch (e) {
      console.error("Ошибка создания первода", e);
      toast.error("Ошибка создания перевода.");
    } finally {
      setIsLoading(false);
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
        <Box>
          <Box color="#6484AA">
            {props?.isCorrectTransfer
              ? "Списание со счета"
              : "Пополнение счета"}
          </Box>

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
                // sx={{ marginTop: 4, width: "100%" }}
                {...register("paymentSum", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              {errors?.paymentSum && (
                <div style={{ color: "red" }}>
                  {errors.paymentSum.message || "Error!"}
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
                  // variant="outlined"
                  // sx={{ marginTop: 4, width: "100%" }}
                  // {...register("accountName", {
                  //    required: "Поле обязательно к заполнению",
                  // })}
                >
                  {Object.entries(AccountEnum).map((elem, i) => (
                    <option key={i} value={elem[0]}>
                      {elem[1]}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Input
                placeholder="Назначение (комментарий)"
                variant="outlined"
                // sx={{ marginTop: 4, width: "100%" }}
                {...register("paymentPurpose", {
                  required: "Поле обязательно к заполнению",
                })}
              />
              {errors?.paymentPurpose && (
                <div style={{ color: "red" }}>
                  {errors.paymentPurpose.message || "Error!"}
                </div>
              )}

              <Box
              // sx={{
              //   marginTop: 4,
              //   display: "flex",
              //   justifyContent: "space-between",
              // }}
              >
                <button
                  className="manager__button_ok"
                  onClick={handleSubmit(onSubmitForm)}
                  disabled={!isValid || isLoading}
                  type="submit"
                >
                  <div className="loader_for_button">
                    <Loader loading={isLoading} />
                  </div>
                  Сохранить
                </button>
                <button className="manager__button_close" onClick={handleClose}>
                  Закрыть
                </button>
              </Box>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TransferItem;
