import styles from "./ReferalStructure.module.scss";
import React, { useEffect, useState } from "react";
import { takeCountReferrals } from "./ReferalStructure";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import {
  Button,
  Center,
  Collapse,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import { LocalSpinnerAbsolute } from "../../../UIcomponents/localSpinner/LocalSpinnerAbsolute";
import instance from "../../../api/instance";
import { MarketingApi } from "../../../api/marketing/marketing";
import { StructureItemType } from "../../../assets/types/Structure";

type PropsType = {
  userId: number;
  // referrals: IStructureItem[];
  // totalCount: number;
  level: number;
  isPageReset: boolean;
  onlyActivated: boolean;
};

const itemsPerPage = 1;

const StructureLevel = (props: PropsType) => {
  const [isLagerThan760] = useMediaQuery("(min-width: 760px)");

  const [referals, setReferals] = useState<StructureItemType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [userLogin, setUserLogin] = useState<number | string>("");
  const [isPageReset, setIsPageReset] = useState(false);
  const [level, setLevel] = useState(props?.level + 1);
  const [loading, setLoading] = useState(false);

  // Reset page when parent open or close
  useEffect(() => {
    if (props.isPageReset) {
      setPage(1);
    }
  }, [props.isPageReset]);

  const getReferalsInit = async () => {
    try {
      const res = await instance.get("api/Partners/structure");
      if (res?.status === 200) {
        const tempArray = res?.data;
        let startParentId = tempArray[0].id;
        tempArray.forEach((elem: StructureItemType) => {
          if (elem.parentId === 0) {
            elem.parentId = null;
            // startParentId = elem.id;
            // elem._expanded= true;
          } else if (elem?.parentId === startParentId) {
            elem._expanded = true;
          } else {
            elem._expanded = false;
          }
        });
        setReferals(tempArray);
        // console.log("res?.data /api/Binary/structure", res?.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getReferals = async () => {
    if (!props.userId) {
      return;
    }
    setLoading(true);

    try {
      // const response = await instance.post("/api/User/structure", data, config);
      // if (response.status === 200) {
      //   if (response?.data?.items?.length > 0) {
      //     // Добавляем всем рефералам флаг для отображения дочерних рефералов
      //     const tempReferrals = [...response.data.items];
      //     for (let i = 0; i < tempReferrals.length; i++) {
      //       tempReferrals[i].isOpen = false;
      //     }
      //     setReferrals(tempReferrals);
      //     setTotalCount(response?.data?.totalCount);
      //   }
      // }
      // if (props.level === 1) {
      //   getReferalsInit();
      // } else {
      const response = await MarketingApi.getTreeForNodeId(props.userId);
      const tempReferrals = [...response.data];
      for (let i = 0; i < tempReferrals.length; i++) {
        tempReferrals[i].isOpen = false;
      }
      setReferals(tempReferrals);
      setTotalCount(response?.data?.totalCount);

      // }
    } catch (error) {
      console.error(error);
    } finally {
      // setTimeout(() => setLoading(false), 2000);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferals();
    // console.log("getReff");
  }, [props.userId]);

  const handleOpenNextLevel = async (structureItem: StructureItemType) => {
    setLoading(true);
    setUserLogin(structureItem.id);

    const tempReferrals = [...referals];
    tempReferrals.forEach((el) => {
      if (el.login === structureItem.login) {
        el.isOpen = !structureItem.isOpen;
      }
    });
    setReferals(tempReferrals);
    setIsPageReset(true);
    setLoading(false);
  };

  const loadMoreHandler = async () => {
    setLoading(true);
    // const data = {
    //   parentLogin: props.login,
    //   take: takeCountReferrals,
    //   skip: takeCountReferrals * page,
    //   onlyActivated: props.onlyActivated,
    // };

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const response = await instance.post(
      //   "/api/User/structure",
      //   data,
      //   config
      // );
      // const addingReferrals = response.data.items;
      // for (let i = 0; i < addingReferrals?.length; i++) {
      //   addingReferrals[i].isOpen = false;
      // }
      // setReferrals([...referrals, ...addingReferrals]);
      // setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.relative}>
      {loading && <LocalSpinnerAbsolute size="100" />}
      {referals?.length > 0 ? (
        referals?.map((elem) => (
          <Skeleton key={elem.id} isLoaded={!loading}>
            <div
              className={styles.table_row}
              style={{
                marginLeft: level < 5 ? `${(level - 1) * 20}px` : "100px",
              }}
            >
              <div className={styles.open_close}>
                {
                  // elem .refCount === 0 ? (
                  //   <div></div>
                  // ) :
                  elem.isOpen ? (
                    <FiMinusCircle
                      size={25}
                      color="#558A86"
                      onClick={() => handleOpenNextLevel(elem)}
                    />
                  ) : (
                    <FiPlusCircle
                      size={25}
                      color="#558A86"
                      onClick={() => handleOpenNextLevel(elem)}
                    />
                  )
                }
              </div>
              <div className={styles.table_column_login}>
                <div className={styles.cell_name}>Логин</div>
                <div className={styles.cell_login}>{elem.login}</div>
              </div>

              <div className={styles.table_column}>
                <div className={styles.cell_name}>Зарегистрирован</div>
                <div className={styles.cell_date}>
                  {elem.creationDate.split("T")[0]}
                </div>
              </div>

              <div className={styles.table_column}>
                <div className={styles.cell_name}>Email</div>
                <div className={styles.cell_date}>
                  {elem.email ? elem.email : "no"}
                </div>
              </div>

              <div className={styles.table_column}>
                <div className={styles.cell_name}>Оборот</div>
                <div className={styles.cell_login}>
                  {/* {elem.marketingStatus.accumulatedVolume} */}
                </div>
              </div>

              <div className={styles.table_column}>
                <div className={styles.cell_name}>Ранг</div>
                <div className={styles.cell_sum}>
                  {/* {elem.marketingStatus.rank} */}
                </div>
              </div>
            </div>

            <Collapse in={elem.isOpen} animateOpacity>
              {elem.isOpen && (
                <StructureLevel
                  onlyActivated={props.onlyActivated}
                  userId={+userLogin}
                  isPageReset={isPageReset}
                  level={level}
                />
              )}
            </Collapse>
          </Skeleton>
        ))
      ) : (
        <div style={{ textAlign: "center" }}>Нет рефералов</div>
      )}
      {totalCount > referals.length && (
        <Center w="100%" m={4}>
          <Button
            onClick={() => loadMoreHandler()}
            style={{ background: "#e6cb8b" }}
            boxShadow="xl"
            h="38px"
            w={["40%", "20%"]}
            borderRadius="10px"
            fontFamily="Raleway"
            fontSize={["sm", "md", "md"]}
          >
            Показать еще
          </Button>
        </Center>
      )}
    </div>
  );
};

export default StructureLevel;
