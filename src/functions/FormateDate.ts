import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

export const formatDate = (originalDate: string) => {
    const parsedDate = parseISO(originalDate);
    return format(parsedDate, 'dd.MM.yyyy');
};

