import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Contacts.module.scss";
import { useTranslation } from "react-i18next";
import { instanceWithoutAuth } from "../../../api/instance";
import { Flex, Spacer, useMediaQuery } from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FeedbackForm = {
  subject: string;
  contactName: string;
  phone: string;
  email: string;
  text: string;
};
const empty = {
  subject: "",
  contactName: "",
  phone: "",
  email: "",
  text: "",
};

const Feedback = () => {
  const { t } = useTranslation();
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");
  const [isLagerThan480] = useMediaQuery("(min-width: 480px)");
  const [isLoading, setIsLoading] = useState(false);
  // Initialize react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FeedbackForm>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<FeedbackForm> = async (data) => {
    setIsLoading(true);

    try {
      const res = await instanceWithoutAuth.post("api/Main/feedback", data);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Ваш запрос успешно направлен");
        reset(empty);
      }
    } catch (e) {
      console.error(e);
      toast.error("Ошибка при отправке запроса");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.feedback_container}>
      <div>
        <input
          className="white_input_w100"
          placeholder="Тема"
          {...register("subject", {
            required: t("SettingsPage.requared").toString(),
            minLength: {
              value: 4,
              message: "Минимум 4 символов!",
            },
            maxLength: {
              value: 40,
              message: "Максимум 40 символов!",
            },
          })}
        />
        {errors?.subject && (
          <div className="required">{errors.subject.message || "Error!"}</div>
        )}
      </div>

      <div>
        <input
          className="white_input_w100"
          placeholder="Как в Вам обращаться"
          {...register("contactName", {
            required: t("SettingsPage.requared").toString(),
            minLength: {
              value: 4,
              message: "Минимум 4 символов!",
            },
            maxLength: {
              value: 40,
              message: "Максимум 40 символов!",
            },
          })}
        />
        {errors?.contactName && (
          <div className="required">
            {errors.contactName.message || "Error!"}
          </div>
        )}
      </div>

      <div>
        <input
          className="white_input_w100"
          placeholder="Телефон"
          {...register("phone", {
            required: t("SettingsPage.requared").toString(),
            // pattern: {
            //   value: /[0-9]/,
            //   message: "Введите валидный номер!",
            // },
            minLength: {
              value: 10,
              message: "Минимум 10 символов!",
            },
            // maxLength: {
            //   value: 16,
            //   message: "Максимум 16 символов!",
            // },
          })}
        />
        {errors?.phone && (
          <div className="required">{errors.phone.message || "Error!"}</div>
        )}
      </div>

      <div>
        <input
          className="white_input_w100"
          placeholder="Email"
          {...register("email", {
            required: t("SettingsPage.requared").toString(),
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Введите валидный емэйл!",
            },
            minLength: {
              value: 4,
              message: "Минимум 4 символов!",
            },
            // maxLength: {
            //   value: 12,
            //   message: "Максимум 12 символов!",
            // },
          })}
        />
        {errors?.email && (
          <div className="required">{errors.email.message || "Error!"}</div>
        )}
      </div>

      <div>
        <textarea
          className="white_input_w100"
          style={{minHeight: "100px"}}
          placeholder="Текст сообщения"
          {...register("text", {
            required: t("SettingsPage.requared").toString(),
            minLength: {
              value: 4,
              message: "Минимум 4 символов!",
            },
            maxLength: {
              value: 200,
              message: "Максимум 200 символов!",
            },
          })}
        />
        {errors?.text && (
          <div className="required">{errors.text.message || "Error!"}</div>
        )}
      </div>

      <Flex>
        <Spacer/>

        <button
          className="orange_button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        >
          ОТПРАВИТЬ
        </button>
      </Flex>
    </div>
  );
};

export default Feedback;
