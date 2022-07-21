import moment from "moment";

export const formatDateTimeFromUTC = (dateUtc: string) => {
  const date = new Date(dateUtc);
  return `${date.getDate()}.${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export const formatDateFromUTC = (dateUtc: string) => {
  const date = new Date(dateUtc);
  return `${date.getDate()}.${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}.${date.getFullYear()}`;
};

export const formatDate = (date: string) => {
  return moment(date.split('T')[0]).format("DD.MM.YYYY");
}