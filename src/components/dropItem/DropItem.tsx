import { IDropItem } from "../../shared/interface/IDropItem";
import "./dropItem.css";

const DropItem = ({ subject }: IDropItem) => {
  return <div className="drop-item">{subject}</div>;
};

export default DropItem;
