import { format, setDefaultOptions, formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
setDefaultOptions({ locale: pt });
export const formDate = (date: Date | string) => {
  const _date = new Date(date);

  return format(_date, "MM/dd/yyyy");
};

export const formatDateTime = (date: Date | string) => {
  const _date = new Date(date);

  return format(_date, "Pp");
};

export const distanteDateToNow = (date: Date | string) => {
  const _date = new Date(date);

  return formatDistanceToNow(_date);
};
