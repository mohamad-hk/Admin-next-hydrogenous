import moment from "moment-jalaali";

export default function convertToPersianDate(timestamp){
  const persianDate = moment(timestamp).format("jYYYY/jMM/jDD");
  return persianDate;
};