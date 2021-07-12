import React from "react";
import { Logo, WrapHeader, WrapCheckbox } from "./Header.elements";
import logo from "../../assets/images/zappyrent.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import "../../css/header.css";
import configData from "../../config/config";

const {
  LABEL_TITLE_DROPDOWN_1,
  LABEL_TITLE_DROPDOWN_2,
  LABEL_TITLE_DROPDOWN_3,
  LABEL_TITLE_DROPDOWN_4,
  LABEL_TITLE_DROPDOWN_5,
} = configData;

const Header = ({
  handleFlagAvailable,
  handleFlagPrivateRoom,
  handleFlagEntireProperty,
  handleFlagSharedRoom,
  handleFlagStudio,
}) => {
  return (
    <div className="ps-lg-5 ps-md-0 ps-sm-0">
      <WrapHeader>
        <Logo src={logo} />
      </WrapHeader>
      <WrapCheckbox className="mt-5 ms-5">
        <DropdownButton id="tipologia" title={LABEL_TITLE_DROPDOWN_1}>
          <Dropdown.ItemText>
            <Form.Check
              onClick={handleFlagPrivateRoom}
              className="ms-1 fs-6"
              aria-label="option 1"
              label={LABEL_TITLE_DROPDOWN_2}
            />
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            <Form.Check
              onClick={handleFlagEntireProperty}
              className="ms-1 fs-6"
              aria-label="option 1"
              label={LABEL_TITLE_DROPDOWN_3}
            />
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            <Form.Check
              onClick={handleFlagSharedRoom}
              className="ms-1 fs-6"
              aria-label="option 1"
              label={LABEL_TITLE_DROPDOWN_4}
            />
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            <Form.Check
              onClick={handleFlagStudio}
              className="ms-1 fs-6"
              aria-label="option 1"
              label={LABEL_TITLE_DROPDOWN_5}
            />
          </Dropdown.ItemText>
        </DropdownButton>
        <span className="ms-5">Disponibile</span>
        <Form.Check
          onClick={handleFlagAvailable}
          className="ms-3"
          aria-label="option 1"
        />
      </WrapCheckbox>
      <hr />
    </div>
  );
};

export default Header;
