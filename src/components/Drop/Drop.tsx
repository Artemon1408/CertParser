import { useState, ChangeEvent, DragEvent } from "react";

import { Certificate } from "pkijs";
import { fromBER } from "asn1js";
import "./drop.css";
import DropItem from "../dropItem/DropItem";
import CertArea from "../certArea/CertArea";

const Drop = () => {
  const [drag, setDrag] = useState(false);
  const [fileContext, setFileContext] = useState<File>();
  const [certificateInfo, setCertificateInfo] = useState<any>(null);

  function Parser(state?: File) {}

  function dragStartHandler(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    setFileContext(file);
    setDrag(false);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      parseCertificate(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
    const parseCertificate = (fileContent: ArrayBuffer) => {
      const asn1 = fromBER(fileContent);
      const certificate = new Certificate({ schema: asn1.result });

      const subject = certificate.subject.typesAndValues.map(
        (item) => item.value.valueBlock.value
      );
      const issuer = certificate.issuer.typesAndValues.map(
        (item) => item.value.valueBlock.value
      );
      const validFrom = certificate.notBefore.value;
      const validTo = certificate.notAfter.value;

      setCertificateInfo({
        subject,
        issuer,
        validFrom,
        validTo,
      });
      console.log(validTo.getUTCFullYear());
    };
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      let fileList = Array.from(e.target.files);
    }
  }
  const { subject, issuer, validFrom, validTo } = certificateInfo || {};
  return (
    <>
      {certificateInfo ? (
        <div className="droppage">
          <DropItem subject={certificateInfo.subject[0]} />
          <CertArea
            subject={subject[0]}
            issuer={issuer[0]}
            validFrom={validFrom}
            validTo={validTo}
          />
        </div>
      ) : (
        <div className="drop">
          <form
            className={drag ? "drop-active" : ""}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <p>
              Перетягніть файл сетрифікату сюди <br /> або <br />
            </p>
            <label htmlFor="drop-btn" className="btn-dnd">
              Виберіть через стандартний діалог
            </label>
            <input
              type="file"
              id="drop-btn"
              onChange={(e) => onChangeHandler(e)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Drop;
