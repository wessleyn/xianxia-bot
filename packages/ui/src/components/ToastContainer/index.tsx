'use client';

import { useToastStore } from '../../hooks/useToastStore';
import { Toast } from '../Toast';

/**
 * A container component that should be included once in your app
 * to display the toast notifications
 */
export const ToastContainer = () => {
    // Extract the isVisible state to verify that the component is reactive to state changes
    const isVisible = useToastStore(state => state.isVisible);

    console.log('ToastContainer rendering, isVisible:', isVisible);

    return <Toast />;
};

export default ToastContainer;
