import React, { useState, useEffect, useRef } from "react";

import styles from "../Settings.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store";
import instance from "../../../../api/instance";
import { toast } from "react-toastify";
import { MainApi } from "../../../../api/main/mainApi";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";

const Documents = () => {
  const { t } = useTranslation();

  const verificationDate = useAppSelector(
    (state) => state.allInfoUser.value.verificationDate
  );

  const [userDocuments, setUserDocuments] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [imageArray, setImageArray] = useState<any[]>([]);
  const [filesArray, setFilesArray] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ********ПОЛУЧЕНИЕ ДОКУМЕНТОВ ПОЛЬЗОВАТЕЛЯ***********
  const getUserDocuments = async () => {
    try {
      const response = await instance.get("api/Profile/document-list");
      setUserDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ********ПОЛУЧЕНИЕ ДОКУМЕНТОВ ПОЛЬЗОВАТЕЛЯ***********
  useEffect(() => {
    getUserDocuments();
  }, []);

  // const showImage = (image: any) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.addEventListener("load", (e) => {
  //     const image = reader.result;
  //     setImageArray((imageArray) => [...imageArray, image]);
  //   });
  // };

  // ********ЗАГРУЗКА ФОТО В МАССИВ МАССИВА***********
  const onUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files.length > 0 &&
      event.target.files.length <= 7
    ) {
      const newfilesArray = Array.from(event.target.files);

      // ***********ПРОВЕРКА НА РАЗМЕР ИЗОБРАЖЕНИЯ************
      newfilesArray.forEach((element) => {
        if (element.size > 5242880) {
          toast.error(t("DopItem2.file_size_error"));
          return;
        }
      });
      // if (event.target.files[0].size > 5242880) {
      //   toast.error("Размер изображения более 5мб");
      //   return;
      // }

      let temp = [...filesArray, ...newfilesArray];
      if (temp.length > 7) {
        toast.error(t("DopItem2.file_amount_error"));
        temp = temp.slice(0, 7);
      }
      setFilesArray(temp);
      await onSubmit(temp);
      // newfilesArray.forEach(showImage);
      // const reader = new FileReader();
      // reader.addEventListener("load", () => {
      //   const image = reader.result;
      //   setImageArray([...imageArray, image]);
      // });
      // reader.readAsDataURL(event.target.files[0]);
    }
  };

  // ********УДАЛЕНИЕ ДОКУМЕНТОВ ИЗ МАССИВА***********
  const deleteImageHandler = (index: number) => {
    const tempArr2 = [...filesArray];
    const tempArr = [...imageArray];

    tempArr2.splice(index, 1);
    tempArr.splice(index, 1);

    setFilesArray(tempArr2);
    setImageArray(tempArr);
  };

  // ********УДАЛЕНИЕ ДОКУМЕНТОВ ИЗ БЭКА***********
  const deleteDocHandler = async (image: string) => {
    try {
      await instance.delete(`api/Profile/delete-document?photo=${image}`);
      // if (setRefresh) {
      //   setRefresh(!refresh);
      // }
      toast.success(t("DopItem2.doc_delete"));
    } catch (e) {
      console.error(e);
      toast.error(t("SettingsPage.error"));
    } finally {
      await getUserDocuments();
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setFilesArray([]);
    setImageArray([]);
  };

  // ************ОТПРАВКА НА БЕК ФОТО ДОКУМЕНТОВ************
  const onSubmit = async (filesArray: any[]) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (filesArray.length > 0) {
        filesArray.forEach((file, index) => {
          formData.append("documentPhoto", file);
        });
      }

      await instance.post("/api/Profile/upload-document", formData);
      // if (setRefresh) {
      //   setRefresh(!refresh);
      // }
      toast.success(t("DopItem2.docs_ok"));
    } catch (e: any) {
      console.error(e);
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else {
        toast.error(t("SettingsPage.error"));
      }
    } finally {
      // if (!setRefresh) {
      await MainApi.getInitialMainReduxInfo();
      // }
      await getUserDocuments();
      setLoading(false);
    }

    resetHandler();
  };
  return (
    <div className={styles.collapse}>
      <div className={styles.text}>
        {verificationDate ? t("New.no_more_docs") : t("New.download_desc")}
      </div>

      <div className={styles.flex}>
        {/* ****ЕСЛИ НЕ ВЕРЕФИЦИРОВАН МОЖНО ДОБАВЛЯТЬ НОВЫЕ ДОКУМЕНТЫ******************  */}

        {!verificationDate && (
          <div className={styles.dock_blanck}>
            <input
              onChange={(e) => onUploadFile(e)}
              style={{ display: "none" }}
              id="image-input"
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              multiple={false}
              ref={fileInputRef}
            />
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || userDocuments.length >= 7}
              aria-label="Search database"
              icon={<PlusSquareIcon color={"teal"} />}
            />
          </div>
        )}

        {userDocuments?.map((image: any, index: number) => (
          <div className={styles.dock_blanck}>
            <img src={`https://api.gk-pulse.com/assets/Img/${image}`} alt="" />
            {!verificationDate && (
              <IconButton
                onClick={() => deleteDocHandler(image)}
                aria-label="Search database"
                className={styles.delete}
                icon={<DeleteIcon color={"teal"} />}
              />
            )}
          </div>
        ))}

        {/* {imageArray.length > 0 &&
          imageArray.map((image: any, index: number) => (
            <div className={styles.dock_blanck}>
              <img src={image} alt="" />
              <IconButton
                onClick={() => deleteImageHandler(index)}
                aria-label="Search database"
                className={styles.delete}
                icon={<DeleteIcon color={"teal"} />}
              />
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default Documents;
