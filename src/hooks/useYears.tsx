import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const UseYears = (years: number) => {
    const { t } = useTranslation();

    const [text, setText] = useState("");
    useEffect(() => {
        let count = years % 100;
        if (count >= 5 && count <= 20) {
            setText(t("Platform.years"));
        } else {
            count = count % 10;
            if (count === 1) {
                setText(t("Platform.year"));
            } else if (count >= 2 && count <= 4) {
                setText(t("Platform.years2"));
            } else {
                setText(t("Platform.years"));
            }
        }
    }, [years]);
    return { text };
};
