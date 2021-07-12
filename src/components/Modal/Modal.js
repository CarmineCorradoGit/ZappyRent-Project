import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../css/modal.css";
import configData from "../../config/config";

const { LABEL_TENANTS_PLP, LABEL_BATHS_PLP, LABEL_BEDS_PLP, LABEL_MODAL_BTN } =
  configData;

const Modal = ({
  modal_info,
  modal_img,
  info_tenants,
  info_baths,
  info_beds,
  info_street,
  info_description,
}) => {
  useEffect(() => {
    getModal();
  }, []);

  const colorInfo = {
    color: "black",
    fontWeight: 700,
  };

  // Metodo per prendermi dal dom i punti dove gestire e emettere l'evento
  const getModal = () => {
    const modalBtn = document.getElementsByClassName("modal-btn");

    const modalBg = document.querySelector(".modal-bg");

    const modalClose = document.querySelector("#modal-close");

    for (let i = 0; i < modalBtn.length; i++) {
      modalBtn[i].addEventListener("click", function () {
        modalBg.classList.add("modal-active");
      });
    }

    modalClose.addEventListener("click", function () {
      modalBg.classList.remove("modal-active");
    });
  };

  return (
    <div className="modal-bg">
      <div className="modal-body">
        <span id="modal-close" className="btn-close fw-bold "></span>
        {/* <Card.Img variant="top" src={img_modal_info} /> */}
        <Card.Body>
          <Card.Title className="text-center">{modal_info}</Card.Title>
          <div>
            <img src={modal_img} class="img-fluid mt-3" alt="image info" />
          </div>

          <Card.Text>
            <div className="d-flex justify-content-center mt-4">
              <small className="text-muted">
                <span style={colorInfo}>{info_tenants}</span>
                <span className="ms-1">{LABEL_TENANTS_PLP}</span>
              </small>
              <small className="text-muted ms-4">
                <span style={colorInfo}>{info_baths}</span>
                <span className="ms-1">{LABEL_BATHS_PLP}</span>
              </small>
              <small className="text-muted ms-4">
                <span style={colorInfo}>{info_beds}</span>
                <span className="ms-1">{LABEL_BEDS_PLP}</span>
              </small>
            </div>
          </Card.Text>
          <Card.Text className="d-flex justify-content-center fw-bolder ">
            {info_street}
          </Card.Text>
          <Card.Text className="d-flex text-muted fs-6 justify-content-center">
            {info_description}
          </Card.Text>
          <hr />
          <div className="d-flex justify-content-center">
            <Button classname="text-center" variant="primary">
              {LABEL_MODAL_BTN}
            </Button>
          </div>
        </Card.Body>
      </div>
    </div>
  );
};

export default Modal;
