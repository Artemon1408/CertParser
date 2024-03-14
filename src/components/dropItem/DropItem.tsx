import { IDropItem } from "../../shared/interface/IDropItem";
import "./dropItem.css";

const DropItem = ({ subject, onClick }: IDropItem) => {
  return (
    <div className="drop-item" onClick={onClick}>
      {subject}
    </div>
  );
};

export default DropItem;
