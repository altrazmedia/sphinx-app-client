import moment from "moment";

export function formatDate(date) { 
  return moment(date).local().format("DD.MM.YYYY");
}