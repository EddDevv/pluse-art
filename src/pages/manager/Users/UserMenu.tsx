import React from "react";

import { UserType } from "./UserList.types";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type Iprops = {
  item: UserType;
  setChosenItem: any;
  setItem: any;
  // onOpen?: any;
  setOpenTransfer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenGA: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCorrectTransfer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenVER: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserMenu = (props: Iprops) => {
  const { login } = useAppSelector((state) => state.userData.value.userInfo);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    props.setItem(null);
  };

  return (
    <>
      {/* <IconButton
        aria-label="delete"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          props.setItem(props.item);
          props.setChosenItem(props.item);
          handleClick(e);
        }}
      >
        <MenuIcon />
      </IconButton> */}

      <Menu 
      // isOpen={open} onClose={handleClose}
      >
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={(e) => {
            props.setItem(props.item);
            props.setChosenItem(props.item);
            handleClick(e);
          }}
        />{" "}
        <MenuList>
          <MenuItem
            onClick={() => {
              props.setChosenItem(props.item);
              props.setOpenInfo(true);
              handleClose();
            }}
          >
            Информация о пользователе
          </MenuItem>
          {login === "manager" && (
            <div>
              <MenuItem
                onClick={() => {
                  props.setChosenItem(props.item);
                  props.setIsCorrectTransfer(false);
                  props.setOpenTransfer(true);
                  handleClose();
                }}
              >
                Пополнить счет
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.setIsCorrectTransfer(true);
                  props.setOpenTransfer(true);
                  handleClose();
                }}
              >
                Списать со счета
              </MenuItem>
            </div>
          )}

          {/* <MenuItem
          onClick={() => {
            props.setChosenItem(props.item);
            props.setOpenWithdrawal(true);
            handleClose();
          }}
        >
          Создать заявку на вывод
        </MenuItem> */}
          {/* <MenuItem
          onClick={() => {
            props.setIsCorrectTransfer(true);
            props.setOpenTransfer(true);
            handleClose();
          }}
        >
          Провести корректировку счета(приход/списание) 
        </MenuItem> */}

          {props.item?.confirmationType && (
            <MenuItem
              onClick={() => {
                // props.setChosenItem(props.item);
                props.setOpenGA(true);
                handleClose();
              }}
            >
              Отключить Google аутентификацию
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              props.setOpenVER(true);
              handleClose();
            }}
          >
            {props.item?.verificationDate
              ? "Отменить верификацию"
              : "Верифицировать"}
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(`/admin/transfer-history/${props.item.login}`);
              handleClose();
            }}
          >
            {/* <Link to={`/admin/transfer-history/${props.item.login}`}> */}
            История операций
            {/* </Link> */}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
