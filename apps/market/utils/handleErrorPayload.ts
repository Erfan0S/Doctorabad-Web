import { isServerSide } from '@/constants/constants';
import { toast } from 'react-toastify';

export const handleErrorPayload = (err: any) => {
  if (err?.data && !isServerSide) {
    const errors = err?.data?.errors || err?.data?.messages;

    let msg;
    if (Array.isArray(errors)) {
      msg = errors[0];
    } else if (errors?.messages && Array.isArray(errors?.messages)) {
      msg = errors.messages[0];
    } else if (Object.values(errors || {}).length) {
      // @ts-ignore
      msg = Object.values(errors)?.[0]?.[0];
    }

    if (msg) toast(msg, { type: 'error' ,position: 'top-left'});
  }

  return Promise.reject(err);
};
