import AuthModal from '@components/AuthModal';
import CustomSafeArea from "@components/custom/CustomSafeArea";
import SettingsSection from "@components/SettingsSection";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAccountStore } from '@stores/account';
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Toast from 'react-native-toast-message';
import { createTheme } from '../../../constants/themes';

export default function Account() {
  const { isLoggedIn, user, logout } = useAccountStore();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { primaryBgColor, secondaryBgColor, textColor, mutedColor, borderColor, pillSelectedBg, badgeBg, badgeText } = createTheme(isDark);

  const handleSignOut = async () => {
    try {
      await logout();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have been signed out',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to sign out',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const toggleModal = () => setIsAuthModalVisible(prev => !prev);

  return (
    <CustomSafeArea className="items-center gap-5 h-full">
      <View className="font-bold text-3xl items-center gap-4">
        <View className="w-32 h-32 rounded-full overflow-hidden items-center justify-center">
          {isLoggedIn ? (
            <Image
              source={{ uri: user?.user_metadata?.avatar_url || "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" }}
              className="w-32 h-32"
            />
          ) : (
            <View style={{ backgroundColor: borderColor }} className="w-32 h-32 rounded-full items-center justify-center">
              <MaterialIcons name="account-circle" size={96} color={mutedColor} />
            </View>
          )}
        </View>

        <View className="items-center">
          <Text style={{ color: textColor, fontSize: 18, fontWeight: '700' }}>
            {isLoggedIn ? (user?.user_metadata?.full_name || 'User') : 'Guest User'}
          </Text>
          {isLoggedIn && <Text style={{ color: mutedColor }}>{user?.email}</Text>}

          <TouchableOpacity
            onPress={isLoggedIn ? handleSignOut : () => setIsAuthModalVisible(true)}
            style={{
              marginTop: 16,
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: isLoggedIn ? pillSelectedBg : badgeBg,
            }}
          >
            <Text style={{ color: isLoggedIn ? textColor : badgeText }}>
              {isLoggedIn ? 'Sign Out' : 'Sign in to your account'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AuthModal showModal={isAuthModalVisible} toggleModal={toggleModal} />

      <SettingsSection />

    </CustomSafeArea>
  );
}
