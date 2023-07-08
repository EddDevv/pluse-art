import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import Moment from "react-moment";
// import "typeface-roboto";
import roboto from "../../assets/fonts/Roboto/Roboto-Regular.ttf";
import robotoBold from "../../assets/fonts/Roboto/Roboto-Bold.ttf";
import "moment/locale/ru";

// Font.register({
//   family: "Roboto",
//   src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 12,
    // flexDirection: "row",
    backgroundColor: "white",
    color: "black",
    padding: "10px",
  },
  section: { textAlign: "center", margin: 30 },
  main: {
    textAlign: "justify",
    margin: "4 20 4 20",
    position: "relative",
  },
  mainHeader: {
    textAlign: "justify",
    margin: "15 20 4 20",
    // fontWeight: "bold",
    fontFamily: "RobotoBold",
  },
  text: {
    fontFamily: "Roboto",
    margin: "10px",
    padding: "10px",
  },
  mainFlexBetween: {
    margin: "5 20 5 20",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    margin: "0 20",
  },
  cell: {
    border: "1px solid black",
    width: "33%",
    padding: "3px",
  },
  firstUpCell: {
    border: "1px solid black",
    width: "33%",
    padding: "3px",
  },
  secondUpCell: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    width: "33%",
    padding: "3px",
  },
  firstMiddleCell: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    width: "33%",
    padding: "3px",
  },
  secondMiddleCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    width: "33%",
    padding: "3px",
  },
  mtop: {
    paddingTop: "30px",
  },
  cleanCell: {
    // border: "1px solid black",
    width: "48%",
    padding: "2px 5px",
  },

  commonCell: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    width: "93%",
    padding: "3px",
    textAlign: "justify",
    margin: "0 20 0 20",
    position: "relative",
  },
  bold: {
    fontFamily: "RobotoBold",
  },
  bottomBorder: {
    borderBottom: "1px solid black",
  },
});

// Create Document Component
export const ContractNotification =
  // React.memo(function Contract
  ({
    userData,
    allInfoUser,
    // roboto,
    // robotoBold
  }) => {
    Font.register({ family: "Roboto", fonts: [{ src: roboto }] });
    Font.register({ family: "RobotoBold", fonts: [{ src: robotoBold }] });

    // Moment.locale("ru");
    // const { allInfoUser } = useSelector((state) => state);

    // const getInfo = async () => {
    //   // console.log('state.UserData?.value?.userInfo?.login', state.userData?.value?.userInfo?.login)
    //   const resMain = await MainApi.getMainInfo();
    //   console.log("resMain", resMain);
    //   if (resMain?.status >= 200 && resMain.status < 300) {
    //     setUserData(resMain.data);
    //   }
    // };

    // useEffect(() => {
    //   console.log("deal", deal);
    //   console.log("userData", userData);
    // }, [deal, userData]);

    const getDataForContract = (data) => {
      if (data?.length === 0) {
        return "";
      } else {
        const arr = data.split("-");
        const res1 = arr[0].slice(2, 5);
        const res2 = arr[1];
        const res3 = arr[2].slice(0, 2);
        const res = `${res1}/${res2}/${res3}`;
        return res;
      }
    };

    return (
      <Document>
        {/* ******************************************************************************************************************* */}
        <Page
          size="A4"
          style={[styles.page, { paddingTop: "20px", paddingBottom: "20px" }]}
        >
          <View style={[styles.section, styles.bold, { textAlign: "right" }]}>
            <Text>Приложение № 2</Text>
          </View>
          <View style={[styles.section, { textAlign: "right" }]}>
            <Text>
              {allInfoUser.value?.verificationDate && (
                <Moment format="DD MMMM YYYY" locale="ru">
                  {allInfoUser.value?.verificationDate}
                </Moment>
              )}{" "}
              г.
            </Text>
          </View>
          <View style={[styles.section, styles.bold, { marginTop: "50px" }]}>
            <Text>Уведомление</Text>
            <Text>
              о присвоении Уникального кода Клиента и открытии Брокерского счета
            </Text>
          </View>

          <View style={styles.main}>
            <Text>
              ОсОО «Пульс-Арт» настоящим уведомляет , что в соответствии с
              Инвестиционным Договором № {allInfoUser.value.id}-
              {getDataForContract(allInfoUser.value.verificationDate)} от{" "}
              {allInfoUser.value?.verificationDate && (
                <Moment format="DD MMMM YYYY" locale="ru">
                  {allInfoUser.value.verificationDate}
                </Moment>
              )}
              г. ФИО :{userData?.value?.userInfo?.fullName}.
            </Text>
          </View>
          <View style={styles.main}>
            <Text>
              1. Присвоен Уникальный код Клиента №
              {userData?.value?.userInfo?.id}
            </Text>
          </View>
          <View style={styles.main}>
            <Text>
              2. Открыт Брокерский счет в ОсОО «Пульс-Арт» №
              {userData?.value?.userInfo?.id}PA-{userData?.value?.userInfo?.id}
              PA (наименование валюты): американский доллар USD.
            </Text>
          </View>
          <View style={styles.main}>
            <Text>
              Вышеуказанные данные должны быть использованы для реализации
              положений Инвестиционного Договора № {allInfoUser.value.id}-
              {getDataForContract(allInfoUser.value.verificationDate)} от{" "}
              {allInfoUser.value?.verificationDate && (
                <Moment format="DD MMMM YYYY" locale="ru">
                  {allInfoUser.value.verificationDate}
                </Moment>
              )}
              г.
            </Text>
          </View>
          <View style={styles.main}></View>
          <View
            style={[styles.main, { paddingLeft: "20px", marginTop: "40px" }]}
          >
            <Text>
              Генеральный Директор ОсОО «Пульс-Арт» _______________ Цупиков В.Н.
            </Text>
          </View>
          <View style={[styles.main, { paddingLeft: "20px" }]}>
            <Text>М.П.</Text>
          </View>
          <View style={[styles.main, styles.mtop]}>
            <Image
              src="../../images/stamp.png"
              style={{
                width: "100px",
                position: "absolute",
                top: "-75px",
                right: "200px",
              }}
            />
          </View>
          <View>
            <Image
              src="../../images/signature.png"
              style={{
                width: "100px",
                marginLeft: "200px",
                position: "absolute",
                top: "-95px",
                right: "200px",
              }}
            />
          </View>
        </Page>
      </Document>
    );
  };
