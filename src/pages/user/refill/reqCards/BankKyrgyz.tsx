import styles from "../Refill.module.scss";
import Icon from "../../../../assets/images/BankKyrg.png";
import { IconButton, Spacer } from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CopyIcon } from "@chakra-ui/icons";

const BankKyrgyz = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.req_card} style={{gap: "10px"}}>
      <div>
        <img src={Icon} alt="" />
      </div>

      <div className={styles.req_card_title} style={{marginBottom: "20px"}}>
        Банковские реквизиты для резидентов Кыргызстана
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>Наименование организации:</div>
        <div className={styles.req_card_40}>ОсОО «Пульс-Арт»</div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("ОсОО «Пульс-Арт»");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>ИНН:</div>
        <div className={styles.req_card_40}>02403202210142</div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("02403202210142");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>Расчетный счет:</div>
        <div className={styles.req_card_40}>1030120001079762</div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("1030120001079762");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>Наименование Банка:</div>
        <div className={styles.req_card_40}>
          ОАО «Коммерческий Банк Кыргызстан»
        </div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("ОАО «Коммерческий Банк Кыргызстан»");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>БИК банка:</div>
        <div className={styles.req_card_40}>103001</div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("103001");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>

      <div className={styles.flex_g10}>
        <div className={styles.req_card_40}>ИНН банка:</div>
        <div className={styles.req_card_40}>02712199110068</div>
        <Spacer />
        <IconButton
          onClick={() => {
            copy("02712199110068");
            toast.success(t("New.req_copy"));
          }}
          aria-label="Search database"
          icon={<CopyIcon color={"teal"} />}
        />
      </div>
    </div>
  );
};

export default BankKyrgyz;
