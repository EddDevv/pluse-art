import { useTranslation } from "react-i18next";
import styles from "./Portfolio.module.scss"
import { useAppSelector } from "../../../store";
import { AiOutlineWarning } from "react-icons/ai"
import { BsBarChart } from "react-icons/bs"
import GifMonets from "../../../assets/images/GifMonets.svg"
import { speedMaxEnum } from "../../../assets/consts/consts";


type PropsType = {
    portfolioId: number;
}

const Portfolio = ({ portfolioId }: PropsType) => {
    const { t } = useTranslation();
    const { value } = useAppSelector(state => state.investPlans)


    return (
        <div className="page_container">
            <div className={`${styles.paper}`}>
                <div className={styles.title_flex}>
                    <div className={styles.subtitle}>{t("New.portfolio")}</div>
                    <div >{value[portfolioId].name}</div>
                </div>

                <div className={styles.flex_end}>
                    <div className={styles.desc}>{t(`New.portfolio_desc_${portfolioId}_1`)}</div>
                    <div className={styles.desc}>{t(`New.portfolio_desc_${portfolioId}_2`)}</div>
                </div>

                <div className={styles.main_info}>
                    <div className={styles.main_info_1}>
                        <AiOutlineWarning size={30} />
                        <div className={styles.text}>
                            <div style={{ marginBottom: "10px" }}>{t("New.risk_level")}</div>
                            <div className={portfolioId === 2 ? styles.red : styles.green}>{t(`New.portfolio_risk_${portfolioId}`)}</div>
                        </div>
                    </div>
                    <div className={styles.main_info_2}>
                        <BsBarChart size={30} />
                        <div className={styles.text}>
                            <div style={{ marginBottom: "10px" }}>{t("New.portfolio_income")}</div>
                            <div className={styles.green}>
                                {portfolioId === 0 && <b className={styles.dop}>{t("Programs.to")} &nbsp;</b>}
                                {value[portfolioId].percentPerMonth * 100}% &nbsp;
                                <b className={styles.dop}>({t("New.pers_with_speed")} &nbsp;</b>
                                {(value[portfolioId].percentPerMonth * 100) + value[portfolioId].speedPercent * 100 * speedMaxEnum[portfolioId]}%
                                <b className={styles.dop}>&nbsp;)</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles.main_info_3}>
                        <img src={GifMonets} alt="" />
                        <div className={styles.text}>
                            <div style={{ marginBottom: "10px" }}>{t("New.portfolio_sum")}</div>
                            <div className={styles.green}>
                                <b className={styles.dop}>{t("Programs.from")} &nbsp;</b>
                                {value[portfolioId].minSum} $ &nbsp;
                                <b className={styles.dop}>{t("Programs.to")} &nbsp;</b>
                                {value[portfolioId].maxSum.toLocaleString()} $
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio;