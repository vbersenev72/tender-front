import {format, parseISO} from "date-fns";

export const formatDate = (originalDate: string) => {
    const parsedDate = parseISO(originalDate.slice(0,10));
    return format(parsedDate, 'dd.MM.yyyy');
};
