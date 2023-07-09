import { Fade } from "@chakra-ui/react";
import React from "react";
import { Loader } from "../../../../api/Loader";
type PropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: any;
  isDate?: boolean;
  isLoading?: boolean;
};

export const ModalConfirm = ({
  open,
  setOpen,
  // setSuccess,
  submitHandler,
  isDate,
  isLoading,
}: PropType) => {
  const date = new Date().toLocaleDateString();
  return (
    <Fade in={open}>
      <div style={{ position: "absolute" }} className="modal__wrapper">
        <div className="modal__text priceModal_noPadding">
          <div
            onClick={() => setOpen(false)}
            className="close_menu_btn close_window"
          >
            <span
              style={{ height: "20px", right: "10px" }}
              className="before arrow_color"
            />
            <span
              style={{ height: "20px", right: "10px" }}
              className="after arrow_color"
            />
          </div>
          <div className="text__wrapper">
            <div className="balance_sidebar_title texp_price_modal ">
              Вы уверены?
            </div>
            {isDate && (
              <p>
                {"Возобновление программы  будет от: "}
                <span style={{ color: "#36a83d" }}>{date}</span>
              </p>
            )}
            <div className="deal_item_buttonGroup">
              <button
                onClick={() => setOpen(false)}
                className="form_sbmOpen texp_button_modal deal_button_notConfirm"
              >
                Нет
              </button>
              <button
                onClick={() => {
                  // setOpen(false);
                  // setSuccess(true);
                  submitHandler();
                }}
                className="form_sbmOpen texp_button_modal deal_button_Confirm"
                disabled={isLoading}
              >
                <div className="loader_for_button">
                  <Loader loading={isLoading} />
                </div>
                Да
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
