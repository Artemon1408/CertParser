import DropItem from "../dropItem/DropItem";
const CertList = ({ subjects }: any) => {
  if (!subjects || !subjects.subject) {
    return null;
  }
  const { subject } = subjects;

  const resultArr = [subject.join("")];

  console.log(subject);

  return (
    <>
      {resultArr.map((subject: any, index: number) => (
        <DropItem key={index} subject={subject} />
      ))}
    </>
  );
};

export default CertList;
