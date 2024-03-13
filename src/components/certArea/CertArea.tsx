import { IDropItem } from "../../shared/interface/IDropItem";
import "./certArea.css";

const CertArea = ({ subject, issuer, validFrom, validTo }: IDropItem) => {
  return (
    <div className="cert-area">
      <p>
        Common Name: <span>{subject}</span>
      </p>
      <p>
        Issuer CN: <span>{issuer}</span>
      </p>
      <p>
        Valid From: <span>{validFrom}</span>
      </p>
      <p>
        Valid To: <span>{validTo}</span>
      </p>
    </div>
  );
};

export default CertArea;
