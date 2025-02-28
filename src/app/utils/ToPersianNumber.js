const PersianNumbers = (number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};
export default PersianNumbers;
