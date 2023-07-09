import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { useTranslation } from "react-i18next";
import { Contract } from "../../../../components/Contract/Contract";

export const PDFLink =
  // React.memo(function PDFLink
  ({
    deal,
    userData,
    investPlans,
    // roboto,
    // robotoBold
  }) => {
    const { t } = useTranslation();

    return (
      <button className="button_download">
        <PDFDownloadLink
          document={
            <Contract
              deal={deal}
              userData={userData}
              investPlans={investPlans}
              // roboto={roboto} robotoBold={robotoBold}
            />
          }
          fileName={`Contract${deal.id}.pdf`}
          style={{ width: "200px", height: "100%" }}
        >
          {({ blob, url, loading, error }) =>
            loading ? t("Programs.loading") : t("Programs.download_contract")
          }
        </PDFDownloadLink>
      </button>
    );
  };
