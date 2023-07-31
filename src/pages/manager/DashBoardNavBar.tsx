import React from "react";
import { Link } from "react-router-dom";
import "./DashBoard.scss";
import {
  AiOutlineRollback,
  AiFillHome,
  AiOutlineCreditCard,
  AiOutlineYoutube,
} from "react-icons/ai";
import { GiNewspaper, GiTrade } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";

type Iprops = {
  onClose?: any;
};

const DashBoardNavBar = (props: Iprops) => {
  // const navigate = useNavigate();
  // const { push } = useNavigate();

  return (
    <>
      <div className="dashBoard__nav">
        {/* <div style={{ textAlign: "center" }}>

          <MdAdminPanelSettings color="white" />
        </div> */}

        <div style={{ display: "flex", margin: "10px", color: "white" }}>
          <div style={{ marginRight: "20px" }}>
            <AiFillHome />
          </div>
          Admin Panel
        </div>

        {/* <Collapse in={true} > */}
        <div style={{ marginLeft: "10%", marginTop: "30px" }}>
          <div className="dashBoard__navLink_box">
            <BiGroup />
            <Link
              to="/admin"
              className="dashBoard__navLink"
              onClick={props?.onClose}
            >
              Пользователи
            </Link>
          </div>

          <div className="dashBoard__navLink_box">
            <AiOutlineCreditCard />
            <Link
              to="/admin/withdrawals"
              className="dashBoard__navLink"
              onClick={props?.onClose}
            >
              Заявки на вывод
            </Link>
          </div>

          <div className="dashBoard__navLink_box">
            <AiOutlineYoutube />
            <Link
              to="/admin/transfer-history"
              className="dashBoard__navLink"
              onClick={props?.onClose}
            >
              История операций
            </Link>
          </div>

          <div className="dashBoard__navLink_box">
            <GiNewspaper />
            <Link
              to="/admin/news"
              className="dashBoard__navLink"
              onClick={props?.onClose}
            >
              Новости
            </Link>
          </div>

          <div className="dashBoard__navLink_box">
            <GiTrade />
            <Link
              to="/admin/trade"
              className="dashBoard__navLink"
              onClick={props?.onClose}
            >
              Торговля
            </Link>
          </div>
        </div>
        {/* </Collapse> */}

        <div>
          <Link to="/user" className="dashBoard__navLink">
            <AiOutlineRollback color="white" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashBoardNavBar;
