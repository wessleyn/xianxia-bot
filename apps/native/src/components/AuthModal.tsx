import { Alert, Button, Text, TextInput, View } from 'react-native';

import { supabase } from '@constants/supabase';
import React, { useState } from 'react';
import { useAccountStore } from '../stores/account';
import CustomModal from './CustomModal';

const AuthModal = ({ showModal = false, toggleModal = () => { } }) => {
    const { setSession } = useAccountStore();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEmail = async () => {
        if (!email) {
            setError('Please enter your email');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                },
            });

            if (error) {
                setError(error.message);
                console.log('Error sending OTP:', error.message);
            } else {
                console.log('OTP sent to email:', email);
                setOtpSent(true);
                Alert.alert('Success', `OTP sent to ${email}. Please check your email.`);
            }
        } catch (e) {
            console.error('Unexpected error:', e);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtp = async () => {
        if (!otp) {
            setError('Please enter the OTP');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email'
            });

            if (error) {
                setError(error.message);
                console.log('Error verifying OTP:', error.message);
            } else {
                console.log('OTP verified, user logged in:', data.user);
                setSession(data.session);
                toggleModal();
                Alert.alert('Success', 'You have successfully logged in!');
            }
        } catch (e) {
            console.error('Unexpected error:', e);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomModal
            visible={showModal}
            onRequestClose={toggleModal}
            animationType="slide"
            transparent={true}
            className="flex-row gap-2 items-center  h-[26%]"
            modalBar
        >
            {/* <View className='flex-1 justify-center items-center bg-black/30'> */}
            <View className='p-8 rounded-2xl bg-white shadow-lg w-4/5 max-w-md'>
                <Text className="text-2xl font-bold mb-6 text-center">
                    {otpSent ? 'Enter Verification Code' : 'Sign In'}
                </Text>

                {error && (
                    <View className="bg-red-50 p-3 rounded-md mb-4">
                        <Text className="text-red-600">{error}</Text>
                    </View>
                )}

                {!otpSent ? (
                    <>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className='border border-gray-300 rounded-md p-3 mb-4 w-full'
                        />
                        <Text className="text-gray-500 mb-4 text-sm">
                            We'll send you a one-time code to verify your email.
                        </Text>
                    </>
                ) : (
                    <>
                        <TextInput
                            onChangeText={setOtp}
                            value={otp}
                            placeholder="Enter verification code"
                            keyboardType="numeric"
                            className='border border-gray-300 rounded-md p-3 mb-4 w-full'
                        />
                        <Text className="text-gray-500 mb-4 text-sm">
                            Enter the verification code we sent to {email}
                        </Text>
                    </>
                )}

                <View className='flex-row justify-between gap-2 mt-2'>
                    <Button
                        title="Cancel"
                        onPress={toggleModal}
                        color="#6B7280"
                    />
                    <Button
                        title={otpSent ? "Verify Code" : "Send Code"}
                        onPress={otpSent ? handleOtp : handleEmail}
                        disabled={loading}
                        color="#4287f5"
                    />
                </View>

                {otpSent && (
                    <View className="mt-4">
                        <Button
                            title="Resend Code"
                            onPress={() => {
                                setOtpSent(false);
                                handleEmail();
                            }}
                            color="#6B7280"
                        />
                    </View>
                )}
            </View>
            {/* </View> */}
        </CustomModal>
    );
}

export default AuthModal;