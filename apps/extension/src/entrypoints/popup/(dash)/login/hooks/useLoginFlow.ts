import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../stores/useAuthStore';
import { useEmailForm } from './useEmailForm';
import { useOtpForm } from './useOtpForm';

export const useLoginFlow = () => {
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const emailForm = useEmailForm();
    const otpForm = useOtpForm({ email: emailForm.email });

    const handleEmailSubmitSuccess = () => {
        setIsEmailSubmitted(true);
    };

    const handleOtpVerifySuccess = () => {
        // Perform login action
        login({
            name: 'User',
            email: emailForm.email
        });

        // Redirect to home
        navigate('/');
    };

    return {
        isEmailSubmitted,
        emailForm,
        otpForm,
        handleEmailSubmitSuccess,
        handleOtpVerifySuccess
    };
};
