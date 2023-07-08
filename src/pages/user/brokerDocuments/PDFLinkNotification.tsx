import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { useTranslation } from "react-i18next";
import { AllInfoUserStateType } from "../../../store/allInfoUser";
import { UserDataStateType } from "../../../store/userData/reducer";
import { ContractNotification } from "../../../components/Contract/ContractNotification";

type PropType = {
  allInfoUser: AllInfoUserStateType;
  userData: UserDataStateType;
};
export const PDFLinkNotification = React.memo(function PDFLinkContainer({
  allInfoUser,
  userData,
}: PropType) {
  const { t } = useTranslation();
  return (
    <button className="table_blue_button_download">
      <PDFDownloadLink
        document={
          <ContractNotification allInfoUser={allInfoUser} userData={userData} />
        }
        fileName={`NotificationBroker.pdf`}
        style={{ width: "200px", height: "100%" }}
      >
        {({ blob, url, loading, error }) =>
          loading ? `${t("DopItems.loading")}` : `${t("DopItems.save_not")}`
        }
      </PDFDownloadLink>
    </button>
  );
});
