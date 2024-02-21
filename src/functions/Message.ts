import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


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


export const showInfoMessage = (text: string) => {
    toast.info(text, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
        theme: "colored"
    })
}