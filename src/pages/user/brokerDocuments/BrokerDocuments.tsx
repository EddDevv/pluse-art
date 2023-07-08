import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { PDFLinkNotification } from "./PDFLinkNotification";
import { PDFLinkBroker } from "./PDFLinkBroker";
import styles from "./BrokerDocuments.module.scss"


const BrokerDocuments = () => {
  const { t } = useTranslation();
  const { userData, allInfoUser } = useAppSelector((state) => state);

  return (
    <>
      <div className="page_container">
        <div className={`${styles.paper}`}>
          <div className={styles.title_flex}>
            <div className="page_title">{t("BrokerPage.title")}</div>
          </div>

          {!allInfoUser.value.verificationDate && (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/settings">
                <div className="form_sbmOpen_univers texp_button_modal deal_button_notConfirm">
                  {t("BrokerPage.attention")}
                </div>
              </Link>
            </div>
          )}

          {allInfoUser.value.verificationDate && (
            <>
              <div className={styles.flex}>
                <div >
                  {t("BrokerPage.contract")}
                </div>
                <div className={styles.link}>
                  <PDFLinkBroker allInfoUser={allInfoUser} userData={userData} />
                </div>
              </div>
              <div className={styles.flex}>
                <div >
                  {t("BrokerPage.notify")}
                </div>
                <div className={styles.link}>
                  <PDFLinkNotification
                    allInfoUser={allInfoUser}
                    userData={userData}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrokerDocuments;
