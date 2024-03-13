import { IDropItem } from "../../shared/interface/IDropItem";
import "./certArea.css";

const CertArea = ({ subject, issuer, validFrom, validTo }: IDropItem) => {
  const fromTime = validFrom?.getUTCFullYear();
  const toTime = validTo?.getUTCFullYear();
  return (
    <div className="cert-area">
      <p>
        Common Name: <span>{subject}</span>
      </p>
      <p>
        Issuer CN: <span>{issuer}</span>
      </p>
      <p>
        Valid From: <span>{fromTime}</span>
      </p>
      <p>
        Valid To: <span>{toTime}</span>
      </p>
    </div>
  );
};

export default CertArea;
