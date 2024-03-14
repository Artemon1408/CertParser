import { useState } from "react";
import { IDropItem } from "../../shared/interface/IDropItem";
import DropItem from "../dropItem/DropItem";
import CertArea from "../certArea/CertArea";
import "./certList.css";
const CertList = ({ subjects }: any) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleTabClick = (i: number) => {
    setSelectedItem(i);
  };

  const elements = subjects.map((item: IDropItem, i: number) => {
    const { subject } = item;

    return (
      <DropItem
        key={i}
        subject={subject}
        onClick={() => handleTabClick(i)}
        active={i === selectedItem}
      />
    );
  });

  return (
    <div className="cert-field">
      <div>{elements}</div>
      <CertArea
        subject={subjects[selectedItem].subject}
        issuer={subjects[selectedItem].issuer}
        validFrom={subjects[selectedItem].validFrom}
        validTo={subjects[selectedItem].validTo}
      />
    </div>
  );
};

export default CertList;
