import { Spinner } from "react-bootstrap";
import configData from "../../config/config";

const { LABEL_SPINNER } = configData;

const Bunner = () => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center my-5">
      <h2>{LABEL_SPINNER}</h2>

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Bunner;
