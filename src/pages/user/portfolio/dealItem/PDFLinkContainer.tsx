import React from "react";
import { PDFLink } from "./PDFLink";
import { DealType } from "../../../../assets/types/Portfolio";
type PropType = {
  deal: DealType;
  userData: any;
  investPlans: any;
};
export const PDFLinkContainer = React.memo(function PDFLinkContainer({
  deal,
  userData,
  investPlans,
}: PropType) {
  return <PDFLink deal={deal} userData={userData} investPlans={investPlans} />;
});
