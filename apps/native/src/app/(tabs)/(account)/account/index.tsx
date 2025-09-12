import CustomSafeArea from "@//components/custom/CustomSafeArea";
import AuthModal from '@components/AuthModal';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAccountStore } from '@stores/account';
import { useState } from "react";
import { Alert, Image, Switch, Text, TouchableOpacity, View } from "react-native";
import 'react-native-url-polyfill/auto';

export default function Account() {
  const { isLoggedIn, user, logout } = useAccountStore();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isAutoSync, setIsAutoSync] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      Alert.alert('Success', 'You have been signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const toggleSync = () => setIsAutoSync(prev => !prev);
  const toggleModal = () => setIsAuthModalVisible(prev => !prev);

  return (
    <CustomSafeArea className="items-center gap-5 h-full">
      <View className="font-bold text-3xl items-center gap-4">
        {
          isLoggedIn ?
            <Image source={{ uri: user?.user_metadata?.avatar_url || "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" }}
              className="w-32 h-32 rounded-full" />
            : <MaterialIcons name="account-circle" size={128} color="gray" />
        }
        {
          isLoggedIn ? (
            <View className="items-center">
              <Text className="text-xl font-bold">{user?.user_metadata?.full_name || 'User'}</Text>
              <Text className="text-gray-500">{user?.email}</Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="mt-4 bg-gray-200 px-4 py-2 rounded-md"
              >
                <Text className="text-gray-700">Sign Out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => setIsAuthModalVisible(true)}
                className="bg-[#6366f1] px-4 py-2 rounded-md"
              >
                <Text className="text-white">Sign in to your account</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>

      <AuthModal showModal={isAuthModalVisible} toggleModal={toggleModal} />

      {/* Settings Section */}
      <View className="w-full px-5 mt-6">
        <Text className='text-xl font-bold text-gray-500 mb-4'>Settings</Text>

        <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
          <Text className="text-lg">
            Auto Sync
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAutoSync ? '#4287f5' : '#f4f3f4'}
            value={isAutoSync}
            onValueChange={toggleSync}
          />
        </View>
      </View>

    </CustomSafeArea>
  );
}
