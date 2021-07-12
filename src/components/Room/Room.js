import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import configData from "../../config/config";
import "../../css/room.css";
import Modal from "../Modal/Modal";

const {
  LABEL_AVAILABLE_PLP,
  LABEL_TENANTS_PLP,
  LABEL_BATHS_PLP,
  LABEL_BEDS_PLP,
  LABEL_RENT_PLP,
  LABEL_RENT_PRICE_PLP,
} = configData;

const Room = ({ room }) => {
  const [text, setText] = useState(true);

  // Metodo per troncare il testo oppure no a seconda del flag
  const toggleText = () => {
    setText(!text);
  };

  const colorInfo = {
    color: "black",
    fontWeight: 700,
  };

  return (
    <div>
      <Card>
        <Card.Img variant="top" src={room.images[0].url} />
        {room.available && (
          <span className={room.available ? "text_available" : ""}>
            {LABEL_AVAILABLE_PLP}
          </span>
        )}
        <Card.Body>
          <small className="text-muted">{room.type}</small>
          <Card.Title className="mt-2 fs-6"> {room.title}</Card.Title>
          <div className="info_box d-flex justify-content-start mt-4">
            <small className="text-muted">
              <span style={colorInfo}>{room.tenants}</span>
              <span className="ms-1">{LABEL_TENANTS_PLP}</span>
            </small>
            <small className="text-muted ms-4">
              <span style={colorInfo}>{room.baths}</span>
              <span className="ms-1">{LABEL_BATHS_PLP}</span>
            </small>
            <small className="text-muted ms-4">
              <span style={colorInfo}>{room.beds}</span>
              <span className="ms-1">{LABEL_BEDS_PLP}</span>
            </small>
          </div>
          <Card.Text
            onClick={() => toggleText()}
            className={
              text ? "text-truncate modal-btn text-muted mt-3 fs-9" : ""
            }
          >
            {room.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="color_text d-flex justify-content-between">
            {LABEL_RENT_PLP}
            <span style={colorInfo}>
              {room.price}
              <span className="color_text">{LABEL_RENT_PRICE_PLP}</span>
            </span>
          </small>
        </Card.Footer>
        <Modal
          modal_info={room.title}
          modal_img={room.images[0].url}
          info_tenants={room.tenants}
          info_baths={room.baths}
          info_beds={room.beds}
          info_street={room.street}
          info_description={room.description}
        />
      </Card>
    </div>
  );
};

export default Room;
