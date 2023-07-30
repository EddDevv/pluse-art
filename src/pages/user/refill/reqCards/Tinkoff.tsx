import styles from "../Refill.module.scss";
import Icon from "../../../../assets/images/Tincoff.png";
import { CopyIcon } from "@chakra-ui/icons";
import { IconButton, Spacer, useMediaQuery } from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Tinkoff = () => {
  const { t } = useTranslation();
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");

  return (
    <div className={styles.req_card}>
      <div>
        <img src={Icon} alt="" />
      </div>
      <div className={styles.req_card_title}>
        Реквизиты для оплаты через приложение Тинькофф Банк для верифицированных
        пользователей.
      </div>

      <div>
        1. В разделе ПЛАТЕЖИ выберите SWIFT – ПЕРЕВОДЫ и далее заполните
        следующие параметры:
      </div>
      {isLagerThan480 ? (
        <div className={styles.flex_g10}>
          <div>Счет или IBAN:</div>
          <div className={styles.req_card_title}>ОсОО «Пульс-Арт»</div>
          <IconButton
            onClick={() => {
              copy("ОсОО «Пульс-Арт»");
              toast.success(t("New.req_copy"));
            }}
            aria-label="Search database"
            icon={<CopyIcon color={"teal"} />}
          />
          <Spacer />

          <div>SWIFT::</div>
          <div className={styles.req_card_title}>KYRSKG22</div>
          <IconButton
            onClick={() => {
              copy("KYRSKG22");
              toast.success(t("New.req_copy"));
            }}
            aria-label="Search database"
            icon={<CopyIcon color={"teal"} />}
          />
        </div>
      ) : (
        <>
          <div className={styles.flex_g10}>
            <div>Счет или IBAN:</div>
            <div className={styles.req_card_title}>ОсОО «Пульс-Арт»</div>
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
            <div>SWIFT::</div>
            <div className={styles.req_card_title}>KYRSKG22</div>
            <IconButton
              onClick={() => {
                copy("KYRSKG22");
                toast.success(t("New.req_copy"));
              }}
              aria-label="Search database"
              icon={<CopyIcon color={"teal"} />}
            />
          </div>
        </>
      )}

      <div>
        <div>2. Далее выберите:</div>
        <div className={styles.under_flex}>
          <li>
            пункт - <b>без указания банка-корреспондента</b>
          </li>
          <li>
            категория платежа -{" "}
            <b>инвестиции/ценные бумаги/электронные деньги</b>
          </li>
          <li>
            назначение платежа -{" "}
            <b>перевод в пользу брокера для покупки ценных бумаг</b>
          </li>
          <li>
            указываете название организации - <b>PULSE-ART</b>
          </li>
        </div>
      </div>

      <div>
        3. В следующей вкладке для комментариев указываете: Contract (вписываем
        номер договора) from чч.мм.гггг (дату заключения договора).
      </div>

      <div>
        4. В следующей вкладке <b>вводите сумму</b> которую вы оплачиваете.
      </div>

      <div>
        5. Нажимаете кнопку <b>ОПЛАТИТЬ.</b>
      </div>
    </div>
  );
};

export default Tinkoff;
