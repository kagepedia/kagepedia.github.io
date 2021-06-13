const nl2br = (str) => {
  return str.replace("/\r?\n/g", "<br>");
};

export default nl2br;
