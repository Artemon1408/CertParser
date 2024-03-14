import { useState, useEffect, ChangeEvent, DragEvent } from "react";

import { Certificate } from "pkijs";
import { fromBER } from "asn1js";
import "./drop.css";

import CertList from "../certLIst/CertList";

const Drop = () => {
  const [drag, setDrag] = useState(false);

  const [certificateInfo, setCertificateInfo] = useState<any>(null);

  useEffect(() => {
    const savedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );
    setCertificateInfo(savedCertificates);
  }, []);

  function Parser(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as ArrayBuffer;
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

      const newCertificate = {
        subject: subject.join(","),
        issuer: issuer.join(","),
        validFrom: new Date(validFrom).toISOString(),
        validTo: new Date(validTo).toISOString(),
      };

      const updatedCertificates = [...certificateInfo, newCertificate];
      setCertificateInfo(updatedCertificates);
      localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
    };
    reader.readAsArrayBuffer(file);
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
    e.preventDefault();
    if (e.target.files) {
      let fileList = Array.from(e.target.files)[0];

      Parser(fileList);
    }
  }

  return (
    <>
      {certificateInfo !== null && certificateInfo.length !== 0 ? (
        <div>
          <label htmlFor="drop-btn-active" className="btn-drop">
            Додати
          </label>
          <input
            type="file"
            id="drop-btn-active"
            className="drop-button"
            onChange={(e) => onChangeHandler(e)}
          />
          <div className="droppage">
            <div className="drop-list">
              <CertList subjects={certificateInfo} />
            </div>
          </div>
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
