import React, { FC, useEffect, useRef, useState } from "react";
import instance, { BASEAPPURL, BASEIMAGEURL } from "../../../api/instance";
import Moment from "react-moment";
import "../../../utils/pagination/pagination.scss";
import { toast } from "react-toastify";

// import { Theme } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import PaginationManager from "../PaginationManager";
// import { useParams } from "react-router-dom";
import { IFormInput, INews, INewsList } from "./News.types";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import { TabList, TabPanel } from "@mui/lab";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Loader } from "../../../api/Loader";
import copy from "copy-to-clipboard";
import {
  Collapse,
  IconButton,
  Input,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaginationNew } from "../../../utils/paginationNew/usePaginationNew";
import ModalMain from "../../../UIcomponents/mainModal/ModalMain";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";

const itemPerPage = 25;

export enum LangEnum {
  Ru = "Ru",
  Eng = "Eng",
  Cn = "Cn",
}

const NewsList: FC = () => {
  // let { id } = useParams();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [item, setItem] = useState<INews | null>(null);
  const [chosenItem, setChosenItem] = useState<INews | null>(null);
  const [deletingItem, setDeletingItem] = useState<INews | null>(null);

  const [itemsList, setItemsList] = useState<INewsList | null>(null);
  const [itemsTotalCount, setItemsTotalCount] = useState<number>(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [imagesForChosenNews, setImagesForChosenNews] = useState<string[]>([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [publishTimestamp, setPublishTimestamp] = useState<Date | string>("");
  const newsMainImageInputRef = useRef<HTMLInputElement>(null);
  const newsfileInputRef = useRef<HTMLInputElement>(null);
  const [refresh, setRefresh] = useState<boolean>(false); //Переменная для обновления таблицы
  // const [file, setFile] = useState<any>(null);
  // const [contents, setContents] = useState<IContent[]>(
  //   Object.keys(LangEnum).map((e: string) => {
  //     const newC: IContent = { lang: e, title: "", preview: "", text: "" };
  //     return newC;
  //   })
  // );
  // const [editorStateArray, setEditorStateArray] = useState<EditorState[]>(
  //   Object.keys(LangEnum).map((e: string) => {
  //     return EditorState.createEmpty();
  //   })
  // );
  // const [contents, setContents] = useState<IContent[]>(
  //   Object.keys(LangEnum).map((e: string) => {
  //     const newC: IContent = { lang: e, title: "", preview: "", text: "" };
  //     return newC;
  //   })
  // );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "all",
  });

  // Pagination
  const { nextPage, prevPage, page, gaps, setPage, totalPages } =
    usePaginationNew({
      contentPerPage: itemPerPage,
      count: itemsTotalCount,
    });

  // Получение списка новостей
  const getAllNews = async () => {
    let url = `api/manager/news/list?`;
    setIsLoading(true);

    if (page > 0) {
      if (url.endsWith("?")) {
        url += `PageNumber=${page}&PageSize=${itemPerPage}`;
      } else {
        url += `&PageNumber=${page}&PageSize=${itemPerPage}`;
      }
    }

    try {
      const response = await instance.get(url);
      if (response.status >= 200 && response.status < 300) {
        setItemsList(response?.data?.items);
        setItemsTotalCount(response?.data?.totalCount);
        if (response.status === 200 && response.data) {
          setItemsList(response?.data);
        }
      }
    } catch (e) {
      console.error("Ошибка получения новостей", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refresh]);

  // Default values hook form initialize
  useEffect(() => {
    if (!chosenItem) {
      reset(emptyNews);
      return;
    }
    // console.log("useEffect chosenItem:", chosenItem);

    const newNews: IFormInput = {
      objectName: chosenItem.objectName,
      desc: chosenItem.desc,
      text: chosenItem.text,
      publishTimestamp: new Date(chosenItem.publishDate),
      finishTimestamp: "",
      isPublic: chosenItem?.isPublic,
    };
    // console.log("newNews", newNews);
    reset(newNews);

    let tempEditorState: EditorState = EditorState.createEmpty();
    if (chosenItem?.text?.length > 0) {
      try {
        JSON.parse(chosenItem.text);
        tempEditorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(chosenItem.text))
        );
      } catch (e) {
        console.error(e);
        tempEditorState = EditorState.createWithContent(
          ContentState.createFromText(chosenItem.text)
        );
      }
    }
    if (chosenItem.publishDate) {
      // console.log("chosenItem.publishDate", chosenItem.publishDate);
      // console.log(
      //   "new Date(chosenItem.publishDate)",
      //   new Date(chosenItem.publishDate)
      // );
      setPublishTimestamp(chosenItem.publishDate);
    }
    setEditorState(tempEditorState);
    getImagesForChosenNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenItem]);

  // const getTdColor = (user: INews) => {
  //   if (user.id === item?.id) {
  //     return "#00FF3833";
  //   } else return "";
  //   return "";
  // };
  // const getTdBlur = (id: string) => {
  //   if (!chosenItem) {
  //     return "";
  //   } else if (id === chosenItem.id) {
  //     return "";
  //   } else return "2px";
  // };

  const emptyNews: IFormInput = {
    // "content[0].title": "",
    objectName: "",
    desc: "",
    text: "",
    // publishTimestamp: "",
    publishTimestamp: new Date(),
    finishTimestamp: "",
    isPublic: true,
  };

  const resetForm = () => {
    setChosenItem(null);
    // reset(emptyNews);
    setEditorState(EditorState.createEmpty());
    setRefresh(!refresh);
    setImagesForChosenNews([]);
    // setBlob(null);
  };

  // Создание или сохранение новости
  const onSubmitNewsForm: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    // console.log(data);
    const rdNews: IFormInput = {
      objectName: data.objectName,
      desc: data.desc,
      text: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      isPublic: data.isPublic,
      publishTimestamp: +new Date(data.publishTimestamp) ?? new Date(),
    };
    if (data.finishTimestamp) {
      rdNews.finishTimestamp = +new Date(data.finishTimestamp);
    }
    // let j = 0;
    // contents.forEach((element: IContent, i: number) => {
    //   if (element?.title?.length > 0) {
    //     rdNews[`Content[${j}].Lang`] = Object.keys(LangEnum)[i];
    //     rdNews[`Content[${j}].Title`] = element?.title;
    //     rdNews[`Content[${j}].Preview`] = element.preview;
    //     rdNews[`Content[${j}].Text`] = JSON.stringify(
    //       convertToRaw(editorStateArray[i].getCurrentContent())
    //     );
    //     j++;
    //   }
    // });

    if (!chosenItem) {
      try {
        const response = await instance.post("api/manager/news/create", rdNews);
        if (response.status >= 200 && response.status < 300 && response?.data) {
          toast.success("Новость успешно создана");
          // resetForm();

          const responseGetById = await instance.get(
            `api/manager/news/detail/${response?.data}`
          );
          // console.log("responseGetById", responseGetById);
          if (responseGetById.status === 200 && responseGetById?.data) {
            setChosenItem(responseGetById.data);
          }
          setRefresh(!refresh);
          // setIsEditOpen(false);
        }
      } catch (e: any) {
        console.error("Ошибка добавления новости", e);
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        } else if (e?.response) {
          toast.error(e?.response);
        } else {
          toast.error("ошибка добавления новости");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response2 = await instance.put(
          `api/manager/news/update/${chosenItem.id}`,
          rdNews
        );
        if (response2.status >= 200 && response2.status < 300) {
          resetForm();
          toast.success("Новость успешно обновлена");
          setIsEditOpen(false);
        }
      } catch (e: any) {
        console.error("Ошибка редактирования новости", e);
        if (e?.response?.data) {
          toast.error(e?.response?.data);
        } else if (e?.response) {
          toast.error(e?.response);
        } else {
          toast.error("ошибка редактирования новости");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Удаление новости
  const deleteNews = async () => {
    if (!deletingItem) return;
    setIsLoading(true);
    try {
      const res = await instance.delete(
        `api/manager/news/delete/${deletingItem?.id}`
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Новость успешно удалена");
        setDeletingItem(null);
        setIsOpenModalDelete(false);
        setRefresh(!refresh);
      }
    } catch (e: any) {
      console.error(e);
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.response) {
        toast.error(e?.response);
      } else {
        toast.error("ошибка удаления новости");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка заглавного изображения
  const onUploadMainImage = async (event: any) => {
    if (!chosenItem) return;
    if (event.target.files && event.target.files.length > 0) {
      setIsLoading(true);
      // const reader = new FileReader();
      // reader.addEventListener("load", () => {
      //   setFile(reader.result);
      //   // setOpenCrop(true);
      // });
      // reader.readAsDataURL(event.target.files[0]);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("newsImage", event.target.files[0], "imageNews.jpeg");
      try {
        const response = await instance.post(
          `api/manager/news/upload-image/${chosenItem.id}`,
          formData,
          config
        );
        if (response.status === 200) {
          const news = { ...chosenItem };
          news.image = response.data;
          setChosenItem(news);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Загрузка дополнительных изображений
  const onUploadFile = async (event: any) => {
    if (!chosenItem) return;
    if (event.target.files && event.target.files.length > 0) {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("documentPhoto", event.target.files[0], "imageNews.jpeg");
      try {
        await instance.post(
          `api/manager/news/upload-gallery-image/${chosenItem.id}`,
          formData,
          config
        );
        getImagesForChosenNews();
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // const [value, setValue] = React.useState(LangEnum.Ru);

  // const handleChange = (event: React.SyntheticEvent, newValue: LangEnum) => {
  //   setValue(newValue);
  // };

  // Получение списка доп изображений для новости
  const getImagesForChosenNews = async () => {
    if (!chosenItem) return;
    setIsLoading(true);
    try {
      const res = await instance.get(
        `api/manager/news/gallery-images/${chosenItem?.id}`
      );
      if (res.status >= 200 && res.status < 300) {
        setImagesForChosenNews(res?.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // удаление доп изображения
  const deleteImage = async (image: string) => {
    if (!chosenItem) return;
    setIsLoading(true);
    try {
      await instance.delete(
        `api/manager/news/delete-gallery-image/${chosenItem?.id}?image=${image}`
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ************************************************************************* Удаление новости */}
      <ModalMain
        isOpen={isOpenModalDelete}
        title={`Подтвердите удаление новости ${deletingItem?.objectName}`}
        handleClose={() => {
          setDeletingItem(null);
          setIsOpenModalDelete(false);
        }}
        handleSubmit={deleteNews}
        // isLoading={isLoading}
      />
      <div style={{ width: "100%" }}>
        <div className="manager__main">
          <div className="wrap">
            {/* *********************************************************************** NEW NEWS */}

            <Collapse in={!isEditOpen}>
              <button
                className="manager__button_ok"
                onClick={() => setIsEditOpen(true)}
              >
                Добавить
              </button>
            </Collapse>
            <Collapse in={isEditOpen} style={{ width: "100%" }}>
              <div>
                <div style={{ width: "100%" }}>
                  <div className="manager__total" style={{ fontSize: "20px" }}>
                    {chosenItem
                      ? `Редактирование новости ${chosenItem?.objectName}`
                      : "Добавление новости"}{" "}
                  </div>

                  {/* <form onSubmit={handleSubmit(onSubmitNewsForm)}> */}
                  {/* <div style={{ width: "100%" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1 }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            {Object.keys(LangEnum).map((e, i) => (
                              <Tab key={i} label={e} value={e} />
                            ))}
                          </TabList>
                        </Box>

                        {Object.keys(LangEnum).map((e, i) => (
                          <TabPanel
                            key={i}
                            value={e}
                            style={{ padding: "0", margin: "0" }}
                          >
                            <h2>Заполните на {e}</h2>
                            <div>
                              <div>
                                <TextField
                                  variant="outlined"
                                  sx={{ marginTop: 4, width: "100%" }}
                                  label={`Название ${e}`}
                                  value={contents?.[i]?.title}
                                  onChange={(event) => {
                                    if (!contents) return;
                                    const newContents = [...contents];
                                    const content = newContents.find(
                                      (el) => el.lang === e
                                    );
                                    if (content) {
                                      content.title = event.target.value;
                                      setContents(newContents);
                                    } else {
                                      const content: IContent = {
                                        lang: e,
                                        title: event.target.value,
                                        preview: "",
                                        text: "",
                                      };
                                      newContents.push(content);
                                      setContents(newContents);
                                    }
                                  }}
                                />
                              </div>
                              <div>
                                <TextField
                                  variant="outlined"
                                  sx={{ marginTop: 4, width: "100%" }}
                                  label={`Краткое описание ${e}`}
                                  value={contents?.[i]?.preview}
                                  onChange={(event) => {
                                    if (!contents) return;
                                    const newContents = [...contents];
                                    const content = newContents.find(
                                      (el) => el.lang === e
                                    );
                                    if (content) {
                                      content.preview = event.target.value;
                                      setContents(newContents);
                                    } else {
                                      const content: IContent = {
                                        lang: e,
                                        preview: event.target.value,
                                        title: "",
                                        text: "",
                                      };
                                      newContents.push(content);
                                      setContents(newContents);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                              Описание {e}
                            </div>
                            <Editor
                              editorState={editorStateArray[i]}
                              editorState={editorStateArray[i]}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              onEditorStateChange={(editorState: any) => {
                                const newEditorStateArray = [
                                  ...editorStateArray,
                                ];
                                newEditorStateArray[i] = editorState;
                                setEditorStateArray(newEditorStateArray);
                              }}
                            />
                          </TabPanel>
                        ))}
                      </TabContext>
                    </div> */}

                  <div>
                    <div className="title_input">Название*</div>
                    <Input
                      variant="outlined"
                      sx={{ width: "100%" }}
                      {...register("objectName", {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                          value: 20,
                          message: "Минимальная длина 20 символов",
                        },
                      })}
                    />
                    {errors?.objectName && (
                      <div className="worning_universal">
                        {errors.objectName.message || "Error!"}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="title_input">Краткое описание*</div>
                    <Input
                      variant="outlined"
                      sx={{ width: "100%" }}
                      {...register("desc", {
                        required: "Поле обязательно к заполнению",
                      })}
                    />
                    {errors?.desc && (
                      <div className="worning_universal">
                        {errors.desc.message || "Error!"}
                      </div>
                    )}
                  </div>

                  <div className="title_input">Текст*</div>

                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(editorState: any) => {
                      setEditorState(editorState);
                    }}
                  />

                  <div>
                    <div className="title_input">Дата публикации*</div>
                    <Input
                      variant="outlined"
                      sx={{ width: "100%" }}
                      type="datetime"
                      // value={publishTimestamp}
                      // onChange={(e) => setPublishTimestamp(e.target.value)}
                      {...register("publishTimestamp", {
                        // onChange: (e) => setPublishTimestamp(e.target.value),
                        // required: "Поле обязательно к заполнению",
                      })}
                    />
                    {/* {errors?.publishTimestamp && (
                      <div className="worning_universal">
                        {errors.publishTimestamp.message || "Error!"}
                      </div>
                    )} */}
                  </div>

                  <div>
                    <div className="title_input">Дата актуальности</div>
                    <Input
                      variant="outlined"
                      sx={{ width: "100%" }}
                      type="date"
                      {...register("finishTimestamp")}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="checkbox"
                      {...register("isPublic")}
                      className="checkbox_input"
                    />
                    <div className="title_input">Публична</div>
                  </div>

                  {/* *********************основное изображение****************** */}

                  <div style={{ margin: "20px" }} className="column_item_value">
                    Главное изображение:
                  </div>
                  {chosenItem?.image ? (
                    <div style={{ maxHeight: "400px", overflow: "hidden" }}>
                      <img
                        style={{
                          objectFit: "contain",
                        }}
                        src={`${BASEAPPURL}assets/Img/${chosenItem?.image}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div>нет изображения</div>
                  )}
                  <input
                    style={{ display: "none" }}
                    id="image-input"
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple={false}
                    ref={newsMainImageInputRef}
                    onChange={(e) => onUploadMainImage(e)}
                  />
                  {chosenItem && (
                    <button
                      className="manager__button_ok"
                      onClick={() => newsMainImageInputRef.current?.click()}
                      disabled={isLoading}
                    >
                      <div className="loader_for_button">
                        <Loader loading={isLoading} />
                      </div>
                      Загрузить
                    </button>
                  )}

                  {/* *********************дополнительные изображения****************** */}

                  <div style={{ margin: "20px" }} className="column_item_value">
                    Дополнительные изображения для этой новости:
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {imagesForChosenNews?.length > 0 ? (
                      imagesForChosenNews.map((elem) => (
                        <div key={elem} className="newsImage">
                          <img src={`${BASEAPPURL}assets/Img/${elem}`} alt="" />
                          <div className="tooltip_for_picture_copy">
                            <Tooltip
                              title="Скопировать url"
                              placement="right-start"
                            >
                              <IconButton
                                onClick={() => {
                                  copy(`${BASEAPPURL}assets/Img/${elem}`);
                                  toast.success(
                                    "URL картинки успешно скопирован"
                                  );
                                }}
                                aria-label="Search database"
                                icon={<CopyIcon color={"teal"} />}
                              />
                            </Tooltip>
                          </div>
                          <div className="tooltip_for_picture_delete">
                            <Tooltip title="Удалить" placement="right-start">
                              <IconButton
                                onClick={() => deleteImage(elem)}
                                aria-label="Search database"
                                icon={<DeleteIcon color={"teal"} />}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ margin: "10px" }}>нет изображений</div>
                    )}
                  </div>

                  {/* {chosenItem && !blob && (
                        <img src={chosenItem?.imageUrl} alt="" />
                      )} */}
                  {/* {blob && <img src={blob.url} alt="" />} */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      id="image-input"
                      type="file"
                      accept="image/jpeg,image/png"
                      multiple={false}
                      ref={newsfileInputRef}
                      onChange={(e) => onUploadFile(e)}
                    />
                    {chosenItem && (
                      <button
                        className="manager__button_ok"
                        onClick={() => newsfileInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <div className="loader_for_button">
                          <Loader loading={isLoading} />
                        </div>
                        Загрузить
                      </button>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="manager__button_ok"
                        onClick={handleSubmit(onSubmitNewsForm)}
                        disabled={!isValid || isLoading}
                      >
                        <div className="loader_for_button">
                          <Loader loading={isLoading} />
                        </div>
                        {chosenItem
                          ? "Сохранить"
                          : "Сохранить и добавить изображения"}
                      </button>
                      <button
                        className="manager__button_close"
                        onClick={() => {
                          resetForm();
                          setIsEditOpen(false);
                        }}
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div
          className="wrap"
          style={{
            margin: "20px",
            justifyContent: isLargerThan500 ? "space-between" : "start",
          }}
        >
          <div className="manager_head">Новости</div>
          <div className="manager__total">
            {`Найдено: `}
            {` ${itemsTotalCount} `}
          </div>
        </div>

        {/* **********************************************************************************TABLE HEAD */}
        <div className="manager__table_part">
          <div className="admin__table">
            {isLargerThan850 && (
              <div className="admin__table--item">
                <div className="table__item--column5">Меню</div>
                <div className="table__item--column10">Дата публикации</div>
                <div className="table__item--column7-5">
                  Количество просмотров
                </div>
                <div className="table__item--column30">Название</div>
                <div className="table__item--column30">Описание</div>
                <div className="table__item--column7-5">Публична</div>
                <div className="table__item--column7-5">Картинка</div>
              </div>
            )}

            {/* *************************************************************************TABLE DATA */}

            {itemsList &&
              itemsList?.items?.length > 0 &&
              itemsList?.items.map((elem, index) => (
                <div
                  key={elem.id}
                  style={{
                    width: "100%",
                    color: "black",
                    borderBottom: "1px solid #dfdfdf",
                    filter: item && elem?.id !== item?.id ? "blur(4px)" : "",
                  }}
                >
                  <div
                    key={elem.id}
                    className={
                      elem?.isPublic
                        ? "admin__table--item--green"
                        : "admin__table--item"
                    }
                    style={{ padding: "4px" }}
                  >
                    <div
                      className={
                        isLargerThan850
                          ? "table__item--column5"
                          : "myAbsoluteLeft"
                      }
                    >
                      {/* <UserMenu
                        item={elem}
                        setItem={setItem}
                        setChosenItem={setChosenItem}
                        setOpenTransfer={setOpenTransfer}
                        setOpenGA={setOpenGA}
                        setOpenWithdrawal={setOpenWithdrawal}
                        setIsCorrectTransfer={setIsCorrectTransfer}
                        setOpenVER={setOpenVER}
                        setOpenInfo={setOpenInfo}
                      /> */}
                      <Tooltip title="Удалить" placement="right-start">
                        <IconButton
                          onClick={() => {
                            setDeletingItem(elem);
                            setIsOpenModalDelete(true);
                          }}
                          aria-label="Search database"
                          icon={<DeleteIcon color={"teal"} />}
                        />
                      </Tooltip>
                    </div>

                    <div className="table__item--column10">
                      {!isLargerThan850 && "Дата публикации: "}
                      <Moment format="DD-MM-YY, hh:mm:ss">
                        {elem?.publishDate}
                      </Moment>
                    </div>

                    <div className="table__item--column7-5">
                      {!isLargerThan850 &&
                        elem?.visitorsCount &&
                        "Количество просмотров: "}
                      {elem?.visitorsCount}
                    </div>

                    <div
                      className="table__item--column30"
                      style={{
                        cursor: "pointer",
                        color: "#3786E5",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        setChosenItem(elem);
                        setIsEditOpen(true);
                      }}
                    >
                      <div>
                        {!isLargerThan850 && "Название: "}
                        {elem.objectName}
                      </div>
                    </div>

                    <div
                      className="table__item--column30"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <div>
                        {!isLargerThan850 && "Описание: "}
                        {elem.desc}
                      </div>
                    </div>

                    <div
                      className="table__item--column7-5"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {!isLargerThan850 && "Публична: "}
                      {elem.isPublic && "+"}
                    </div>

                    <div
                      className="table__item--column7-5"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      {/* {!isLargerThan850 && elem.email && "Телефон: "}
                      {elem.phoneNumber} */}
                      <img src={`${BASEIMAGEURL}${elem.image}`} alt="" />
                    </div>
                  </div>
                </div>
              ))}

            {/* ................ПАГИНАЦИЯ......................................... */}
            {itemsList && itemsList?.totalCount > itemPerPage && (
              <PaginationManager
                page={page}
                prevPage={prevPage}
                nextPage={nextPage}
                setPage={setPage}
                gaps={gaps}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsList;
