import { toast } from "react-toastify";


export const showSuccesMessage = (text: string) => {
    toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

export const showErrorMessage = (text: string) => {
    toast.error(text, {
        position: toast.POSITION.TOP_RIGHT,
    });
};