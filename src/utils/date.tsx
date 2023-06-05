const dateHijri = new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(Date.now());

const dateMasehi = new Intl.DateTimeFormat("id", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(Date.now());

export const tanggal = {
  hijriah: dateHijri,
  masehi: dateMasehi,
};
