import React, { useEffect, useState } from "react";
import styles from "./Leader.module.scss";
import instance from "../../api/instance";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import getRefresh from "../../api/getRefresh";
import { Link } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { IconButton, MenuItem, Select, useMediaQuery } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export type ProgramStatType = {
  programId: number;
  partnersCount: number;
  count: number;
  sum: number;
  avg: number;
};

export type ContractInfoType = {
  partnersCount: number;
  count: number;
  sum: number;
  avg: number;
  groupedByPrograms: ProgramStatType[];
};

const PeriodEnum = [
  {
    name: "Весь период",
    value: 0,
  },
  {
    name: "Сутки",
    value: 1,
  },
  {
    name: "Неделя",
    value: 7,
  },
  {
    name: "Месяц",
    value:
      (+new Date() - +new Date().setMonth(new Date().getMonth() - 1)) /
      (1000 * 60 * 60 * 24),
  },
];

const Leader = () => {
  const { value } = useAppSelector((state) => state.investPlans);
  const { auth } = useAppSelector((state) => state);
  const [isSmalerThan760] = useMediaQuery("(max-width:760px)");

  const [income, setIncome] = useState(0);
  const [incomeT, setIncomeT] = useState(PeriodEnum[0].value);
  const [contracts, setContracts] = useState<ContractInfoType | null>(null);
  const [withdrawal, setWithdrawal] = useState(0);
  const [withdrawalT, setWithdrawalT] = useState(PeriodEnum[0].value);
  const [reinvest, setReinvest] = useState(0);
  const [profit, setProfit] = useState<any>(0);
  const [profitT, setProfitT] = useState(PeriodEnum[0].value);
  const [refsum, setRefsum] = useState<any>(0);
  const [refsumT, setRefsumT] = useState(PeriodEnum[0].value);
  const [profitCompany, setProfitCompany] = useState<any>(0);
  const [profitComunity, setProfitComunity] = useState<any>(0);

  const push = useNavigate();

  const authRefresh = async () => {
    const isOK = await getRefresh();
    if (!isOK) {
      push("/login");
    }
  };

  useEffect(() => {
    if (auth?.token === undefined) {
      push("/login");
    }
    if (auth?.token === null) {
      authRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  const getIncome = async () => {
    try {
      const resGetStat1: AxiosResponse = await instance.get(
        `api/Stat/income-sum?days=${incomeT}`
      );
      if (resGetStat1.status >= 200 && resGetStat1.status < 300) {
        setIncome(resGetStat1.data);
      }
      const resGetStat4: AxiosResponse = await instance.get(
        `api/Stat/reinvest-sum?days=${incomeT}`
      );
      if (resGetStat4.status >= 200 && resGetStat4.status < 300) {
        setReinvest(resGetStat4.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getContract = async () => {
    try {
      const resGetStat2: AxiosResponse<ContractInfoType> = await instance.get(
        "api/Stat/contracts-stat"
      );
      if (resGetStat2.status >= 200 && resGetStat2.status < 300) {
        const arr = [...resGetStat2.data.groupedByPrograms];
        arr.sort((a, b) => a.programId - b.programId);
        const temp = {
          ...resGetStat2.data,
          groupedByPrograms: arr,
        };
        setContracts(temp);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getWithdrawal = async () => {
    try {
      const resGetStat3: AxiosResponse = await instance.get(
        `api/Stat/withdrawal-sum?days=${withdrawalT}`
      );
      if (resGetStat3.status >= 200 && resGetStat3.status < 300) {
        setWithdrawal(resGetStat3.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProfit = async () => {
    try {
      const resGetStat5: AxiosResponse = await instance.get(
        `api/Stat/profit-sum?days=${profitT}`
      );
      if (resGetStat5.status >= 200 && resGetStat5.status < 300) {
        setProfit(resGetStat5.data);
      }

      const res: AxiosResponse = await instance.get(
        `api/Stat/company-profit-sum?days=${profitT}`
      );
      if (res.status >= 200 && res.status < 300) {
        setProfitCompany(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getRefSum = async () => {
    try {
      const res: AxiosResponse = await instance.get(
        `api/Stat/referal-sum?days=${refsumT}`
      );
      if (res.status >= 200 && res.status < 300) {
        setRefsum(res.data);
      }
      const res2: AxiosResponse = await instance.get(
        `api/Stat/community-profit-sum?days=${refsumT}`
      );
      if (res2.status >= 200 && res2.status < 300) {
        setProfitComunity(res2.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   getStat();
  // }, [incomeT, withdrawalT, profitT]);

  useEffect(() => {
    getIncome();
  }, [incomeT]);

  useEffect(() => {
    getContract();
  }, []);

  useEffect(() => {
    getWithdrawal();
  }, [withdrawalT]);

  useEffect(() => {
    getProfit();
  }, [profitT]);

  useEffect(() => {
    getRefSum();
  }, [refsumT]);

  return (
    <div className={styles.container}>
      <div className={styles.main_flex}>
        <div className={styles.left}>
          Поступление
          <div className={styles.abs}>
            <Link to="/lk" className="dashBoard__navLink">
              <IconButton
                onClick={() => {}}
                aria-label="Search database"
                icon={<ExternalLinkIcon color={"teal"} />}
              />
              <AiOutlineRollback color="white" />
            </Link>
          </div>
        </div>
        <div
          className={styles.right}
          style={{ marginTop: isSmalerThan760 ? "0px" : "10px" }}
        >
          <div className={styles.paper}>
            <Select
              className={styles.select}
              value={incomeT}
              onChange={(e) => setIncomeT(+e.target.value)}
            >
              {PeriodEnum.map((elem) => (
                <option key={elem.name} value={elem.value}>
                  {elem.name}
                </option>
              ))}
            </Select>
            <div className={`${styles.table}`}>
              <div className={styles.column}>
                <div className={styles.header}> Поступление</div>
                <div>{income.toLocaleString()}</div>
              </div>
              <div className={styles.column}>
                <div className={styles.header}> Сумма реинвеста</div>
                <div>{reinvest.toLocaleString()}</div>
              </div>
              <div className={styles.column}>
                <div className={styles.header}> Сумма совместно</div>
                <div>{(income + reinvest).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* *********************************** */}
      <div className={styles.main_flex}>
        <div className={styles.left}>Расход</div>
        <div className={styles.right}>
          <div className={styles.paper}>
            <Select
              className={styles.select}
              value={withdrawalT}
              onChange={(e) => setWithdrawalT(+e.target.value)}
            >
              {PeriodEnum.map((elem) => (
                <option key={elem.name} value={elem.value}>
                  {elem.name}
                </option>
              ))}
            </Select>
            <div className={`${styles.column_100} `}>
              <div className={styles.header}> Расход</div>
              <div>{withdrawal.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* *********************************** */}
      <div className={styles.main_flex}>
        <div className={styles.left}>Заработок</div>
        <div className={styles.right}>
          <div className={styles.paper}>
            <Select
              className={styles.select}
              value={profitT}
              onChange={(e) => setProfitT(+e.target.value)}
            >
              {PeriodEnum.map((elem) => (
                <option key={elem.name} value={elem.value}>
                  {elem.name}
                </option>
              ))}
            </Select>
            <div className={`${styles.table}`}>
              <div className={`${styles.column_100} `}>
                <div className={styles.header}> Заработок</div>
                <div>{profit.toLocaleString()}</div>
              </div>
              <div className={`${styles.column_100} `}>
                <div className={styles.header}> Прибыль компании</div>
                <div>{profitCompany.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ****************************************************** */}

      <div className={styles.main_flex}>
        <div className={styles.left}>Статистика</div>
        <div className={styles.right}>
          <div className={styles.paper}>
            <Select
              className={styles.select}
              value={refsumT}
              onChange={(e) => setRefsumT(+e.target.value)}
            >
              {PeriodEnum.map((elem) => (
                <option key={elem.name} value={elem.value}>
                  {elem.name}
                </option>
              ))}
            </Select>

            <div className={`${styles.table}`}>
              <div className={`${styles.column_100} `}>
                <div className={styles.header}>
                  Сумма реферальных вознаграждений
                </div>
                <div>{refsum.toLocaleString()}</div>
              </div>
              <div className={`${styles.column_100} `}>
                <div className={styles.header}> Доход с дохода </div>
                <div>{profitComunity.toLocaleString()}</div>
              </div>
            </div>

            {!isSmalerThan760 && (
              <div className={`${styles.row} ${styles.header}`}>
                <div className={styles.cell}></div>
                <div className={`${styles.cell} ${styles.header}`}>Всего</div>
                <div className={styles.cell}>{value?.[0]?.name}</div>
                <div className={styles.cell}>{value?.[1]?.name}</div>
                <div className={styles.cell}>{value?.[2]?.name}</div>
              </div>
            )}

            <div className={`${styles.row}`}>
              <div className={`${styles.cell} ${styles.header}`}>
                Активных партнеров
              </div>
              <div className={styles.cell}>
                {contracts?.partnersCount.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[0]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[0]?.partnersCount.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[1]?.name}:</>}
                {contracts?.groupedByPrograms?.[1]?.partnersCount.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[2]?.name}:</>}
                {contracts?.groupedByPrograms?.[2]?.partnersCount.toLocaleString()}
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className={`${styles.cell} ${styles.header}`}>
                Активных портфелей
              </div>
              <div className={styles.cell}>
                {contracts?.count.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[0]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[0]?.count.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[1]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[1]?.count.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[2]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[2]?.count.toLocaleString()}
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className={`${styles.cell} ${styles.header}`}>
                Сумма всех портфелей
              </div>
              <div className={styles.cell}>
                {contracts?.sum.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[0]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[0]?.sum.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[1]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[1]?.sum.toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[2]?.name}:</>}{" "}
                {contracts?.groupedByPrograms?.[2]?.sum.toLocaleString()}
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className={`${styles.cell} ${styles.header}`}>
                Средняя сумма портфеля
              </div>
              <div className={styles.cell}>
                {contracts &&
                  Number(contracts?.avg?.toFixed(2)).toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[0]?.name}:</>}{" "}
                {contracts &&
                  Number(
                    contracts?.groupedByPrograms?.[0]?.avg?.toFixed(2)
                  ).toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[1]?.name}:</>}{" "}
                {contracts &&
                  Number(
                    contracts?.groupedByPrograms?.[1]?.avg?.toFixed(2)
                  ).toLocaleString()}
              </div>
              <div className={styles.cell}>
                {isSmalerThan760 && <>{value?.[2]?.name}:</>}{" "}
                {contracts &&
                  Number(
                    contracts?.groupedByPrograms?.[2]?.avg?.toFixed(2)
                  ).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.main_flex} style={{ flex: "1" }}>
        <div className={styles.left} style={{ padding: "0px" }}></div>
      </div>
    </div>
  );
};

export default Leader;
