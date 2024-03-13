import { useState, useEffect, ChangeEvent, DragEvent } from "react";

import { Certificate } from "pkijs";
import { fromBER } from "asn1js";
import "./drop.css";
import DropItem from "../dropItem/DropItem";
import CertArea from "../certArea/CertArea";
import CertList from "../certLIst/CertList";

const Drop = () => {
  const [drag, setDrag] = useState(false);

  const [certificateInfo, setCertificateInfo] = useState<any>(null);

  useEffect(() => {
    const savedSubject = localStorage.getItem("subject") ?? "";
    const savedIssuer = localStorage.getItem("issuer") ?? "";
    const savedValidFrom = localStorage.getItem("validFrom") ?? "";
    const savedValidTo = localStorage.getItem("validTo") ?? "";

    if (savedSubject && savedIssuer && savedValidFrom && savedValidTo) {
      setCertificateInfo({
        subject: savedSubject.split(","),
        issuer: savedIssuer.split(","),
        validFrom: new Date(savedValidFrom),
        validTo: new Date(savedValidTo),
      });
    }
  }, []);

  function Parser(state: File) {
    const reader = new FileReader();
    reader.onload = () => {
      parseCertificate(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(state);
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

      const subjectString = subject.join(",");
      const issuerString = issuer.join(",");
      const validFromDate = new Date(validFrom);
      const validToDate = new Date(validTo);

      localStorage.setItem("subject", subjectString);
      localStorage.setItem("issuer", issuerString);
      localStorage.setItem("validFrom", validFromDate.toISOString());
      localStorage.setItem("validTo", validToDate.toISOString());

      setCertificateInfo({
        subject: subject,
        issuer: issuer,
        validFrom: validFromDate,
        validTo: validToDate,
      });
    };
  }

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

    setDrag(false);
    if (!file) return;

    Parser(file);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      let fileList = Array.from(e.target.files)[0];
      Parser(fileList);
    }
  }

  const savedSubject = localStorage.getItem("subject") ?? "";
  const savedIssuer = localStorage.getItem("issuer") ?? "";
  const savedValidFrom = localStorage.getItem("validFrom") ?? "";
  const savedValidTo = localStorage.getItem("validTo") ?? "";

  console.log(certificateInfo);

  return (
    <>
      {certificateInfo ? (
        <div>
          <label htmlFor=" drop-btn-active" className="btn">
            Додати
          </label>
          <input
            type="file"
            id="drop-btn-active"
            className="drop-button"
            onChange={(e) => onChangeHandler(e)}
          />
          <div className="droppage">
            {/* <CertList subject={certificateInfo} /> */}
            <DropItem subject={savedSubject} />
            <CertArea
              subject={savedSubject}
              issuer={savedIssuer}
              validFrom={savedValidFrom}
              validTo={savedValidTo}
            />
          </div>
        </div>
      ) : (
        <div className="drop">
          <button className="btn">Назад</button>
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
              className="drop-button"
              onChange={(e) => onChangeHandler(e)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Drop;
