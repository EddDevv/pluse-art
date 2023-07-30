import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import styles from "./Refill.module.scss";
import RefillItem, { RefillType } from "./RefillItem";
import { Checkbox, Fade, Spacer, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TincoffIcon from "../../../assets/images/Tincoff.png";
import BankKyrgIcon from "../../../assets/images/BankKyrg.png";

import KICB from "../../../assets/images/KICB.png";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import Tincoff from "./reqCards/Tinkoff";
import BankKyrgyz from "./reqCards/BankKyrgyz";
import Operations from "../operations/Operations";

export const DopRefillType = [
  { id: 0, name: "tink", icon: TincoffIcon, desc: "dop_refill_all" },
  { id: 1, name: "kyrg", icon: BankKyrgIcon, desc: "dop_refill_kyrg" },
  { id: 2, name: "kicb", icon: KICB, desc: "dop_refill_kyrg" },
];

const Refill = ({ success }: { success?: boolean }) => {
  const { t } = useTranslation();
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");
  const [isShowHistory, setIsShowHistory] = useState(false);

  const { userData, allInfoUser } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [isOpenFKResultModal, setIsOpenFKResultModal] = useState(false);
  const [isOpenRefillReq, setIsOpenRefillReq] = useState(false);

  const [chosenReq, setChosenReq] = useState(DopRefillType[0]);

  useEffect(() => {
    if (success === true || success === false) {
      setIsOpenFKResultModal(true);
    }
  }, [success]);

  return (
    <>
      <ModalMain
        title={
          success
            ? t("Finance.success_operation")
            : t("Finance.error_operation")
        }
        isOpen={isOpenFKResultModal}
        handleClose={() => {
          setIsOpenFKResultModal(false);
          navigate("/user/refill");
        }}
        isHideClose={true}
      >
        <div
          style={{
            marginTop: "30px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              setIsOpenFKResultModal(false);
              navigate("/user/refill");
            }}
            className="dark_green_button"
          >
            Ok
          </button>
        </div>
      </ModalMain>

      {/* Реквизиты */}
      <ModalMain
        title={t("New.refill_by")}
        isOpen={isOpenRefillReq}
        handleClose={() => {
          setIsOpenRefillReq(false);
        }}
        isHideClose={true}
        width="3xl"
      >
        {chosenReq.id === DopRefillType[0].id && <Tincoff />}
        {chosenReq.id === DopRefillType[1].id && <BankKyrgyz />}
      </ModalMain>

      {/* ******************** */}

      <div className="page_container">
        <div className={`${styles.paper}`}>
          <div className={styles.title_flex}>
            <div className="page_title">{t("Finance.refill_account")}</div>
          </div>

          <div className={styles.flex}>
            {[RefillType.coinBase, RefillType.freeKassa].map((elem) => (
              <RefillItem key={elem} refilType={elem} />
            ))}
          </div>

          <div className={styles.flex_2}>
            {DopRefillType.map((elem) => (
              <div key={elem.id} className={styles.dop_refill_card}>
                <div
                  className={styles.dop_refill_logo}
                  style={{ height: "60px" }}
                >
                  <img src={elem.icon} alt="" />
                </div>
                {isLagerThan760 ? (
                  <>
                    <div>{t(`New.${elem.desc}`)}</div>
                    {/* <Spacer/> */}
                    <button
                      className="dark_green_button"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setChosenReq(elem);
                        setIsOpenRefillReq(true);
                      }}
                    >
                      {t("New.req")}
                    </button>
                  </>
                ) : (
                  <div className={styles.dop_end_mob}>
                    <button
                      className="dark_green_button"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setChosenReq(elem);
                        setIsOpenRefillReq(true);
                      }}
                    >
                      {t("New.req")}
                    </button>
                    <div>{t(`New.${elem.desc}`)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.check_history}>
            <Checkbox
              colorScheme="teal"
              checked={isShowHistory}
              onChange={(e) => setIsShowHistory(e.target.checked)}
            />
            <div>{t("New.refill_history")}</div>
          </div>
          {isShowHistory && <Operations isReplanish={true} />}
        </div>
      </div>
    </>
  );
};

export default Refill;
