import { Button, Text, TextInput, View, useColorScheme } from 'react-native';

import { useAccountStore } from '@stores/account';
import { supabase } from '@utils/supabase';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { createTheme } from '../constants/themes';
import CustomModal from './custom/CustomModal';

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
                setOtpSent(true);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: `OTP sent to ${email}. Please check your email.`,
                    position: 'top',
                    visibilityTime: 2000,
                });
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
                setSession(data.session);
                resetAuth()
                toggleModal();
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'You have successfully logged in!',
                    position: 'top',
                    visibilityTime: 2000,
                });
            }
        } catch (e) {
            console.error('Unexpected error:', e);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetAuth = () => {
        setEmail('')
        setOtp('')
        setOtpSent(false)
    }

    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const { primaryBgColor, textColor, mutedColor, activityColor } = createTheme(isDark);

    return (
        <CustomModal
            visible={showModal}
            onRequestClose={toggleModal}
            animationType="slide"
            className="px-4 py-8 "
            position="bottom"
            transparent
            blur
            bar
        >
            <View className='px-6 w-full' style={{ backgroundColor: primaryBgColor }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center', color: textColor }}>
                    {otpSent ? 'Enter Verification Code' : 'Sign In'}
                </Text>

                {error && (
                    <View style={{ backgroundColor: isDark ? '#4b1e1e' : '#fee2e2', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                        <Text style={{ color: isDark ? '#fca5a5' : '#b91c1c' }}>{error}</Text>
                    </View>
                )}

                {!otpSent ? (
                    <>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter your email"
                            placeholderTextColor={mutedColor}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={{ borderWidth: 1, borderColor: mutedColor, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor, width: '100%' }}
                        />
                        <Text className="text-gray-500 mb-4 text-sm">
                            <Text style={{ color: mutedColor }}>We'll send you a one-time code to verify your email.</Text>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 8 }}>
                    <Button
                        title="Cancel"
                        onPress={toggleModal}
                        color={activityColor}
                    />
                    <Button
                        title={otpSent ? "Verify Code" : "Send Code"}
                        onPress={otpSent ? handleOtp : handleEmail}
                        disabled={loading}
                        color={activityColor}
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
                            color={activityColor}
                        />
                    </View>
                )}
            </View>
        </CustomModal>
    );
}

export default AuthModal;