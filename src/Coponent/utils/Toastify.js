import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // تأكد من استيراد الـ CSS

export default function Toastify(message, type) {
    switch(type) {
        case "success":
            toast.success(message, {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                style: { backgroundColor: "#799351" , color: "#fff" }, 

                });
            break;
        case "error":
            toast.error(message, {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                style: { backgroundColor: "#D32F2F" , color: "#fff" }, 
                });
            break;
        default:
    }
}