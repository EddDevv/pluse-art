import styles from "./ReferalStructure.module.scss";
import React, { useEffect, useState } from "react";
import StructureLevel from "./StructureLevel";
import { useAppSelector } from "../../../store";
export const takeCountReferrals = 10;

const ReferalStructure = () => {
  const { allInfoUser } = useAppSelector((state) => state);
  const [onlyActivated, setOnlyActivated] = useState(false);
  const [isPageReset, setIsPageReset] = useState(false);

  // Fetch referrals first one when load page
  useEffect(() => {
    setIsPageReset(true);
  }, [onlyActivated, allInfoUser]);

  return (
    <div className="page_container">
      <div className={styles.container}>
        <div className={styles.table}>
          <StructureLevel
            userId={allInfoUser?.value?.id}
            level={0}
            // onlyActivated={onlyActivated}
            // isPageReset={isPageReset}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferalStructure;
