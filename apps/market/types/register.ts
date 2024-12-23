import { Dispatch, SetStateAction } from 'react';

export enum RegisterStep {
    ENTER_PHONE_NUMBER = 'ENTER_PHONE_NUMBER',
    VERIFY_PHONE_NUMBER = 'VERIFY_PHONE_NUMBER',
}

export interface RegisterStepProps {
    phone: string;
    changePhone: Dispatch<SetStateAction<string>>;
    setStep: Dispatch<SetStateAction<RegisterStep>>;
}
