import { IDropItem } from "../../shared/interface/IDropItem";
import DropItem from "../dropItem/DropItem";
const CertList = (arr: any) => {
  const elements = arr
    ? arr.map((item: any, i: number) => {
        return <DropItem key={i} subject={arr.subject} />;
      })
    : null;

  // const { subject } = props;
  // let elements = null;
  // if (subject && Array.isArray(subject)) {
  //   elements = subject.map((subject, i: number) => {
  //     return <DropItem key={i} subject={subject[0]} />;
  //   });
  // }

  return <>{elements}</>;
};

export default CertList;
