import dayjs from "dayjs";

const dateformat = (date, format) => {
  return dayjs(date).format(format);
};

export default dateformat;
