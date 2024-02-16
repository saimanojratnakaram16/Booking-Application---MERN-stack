import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: ()=>void;
}


const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        }, 5000)

        return () => clearTimeout(timer);
    },[onClose])
    return (
        <div className={`fixed bottom-4 right-2 z-50 rounded-md  text-white  ${type === "SUCCESS" ? "bg-green-600":"bg-red-600"}`}>
            <div className='flex justify-center items-center px-6 py-2'>
                <span className='text-md'>{message}</span>
            </div>
        </div>
    )
}

export default Toast
