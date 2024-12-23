import { toast } from "react-toastify";


export const copyText = (content: string,successMessage="متن کپی شد") => {
if(!window?.navigator?.clipboard) return toast('خطا در هنگام کپی متن', { type: 'error',position: 'top-left' });

    navigator.clipboard.writeText(content).then(
      () => {
        toast(successMessage, { type: 'success' ,position: 'top-left'});
      },
      () => {
        toast('خطا در هنگام کپی متن', { type: 'error' ,position: 'top-left'});
      }
    );
  };