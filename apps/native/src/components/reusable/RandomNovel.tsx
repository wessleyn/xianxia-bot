import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import findRandomNovel from '../../utils/sources/findRandomNovel';

const RandomNovel = ({
    text = false,
    isDark = false,
    className = '',
    containerClassName = ""
}) => {
    const [isLoadingRandom, setIsLoadingRandom] = useState(false);
    const router = useRouter();

    const handleRandomNovel = async () => {
        setIsLoadingRandom(true);

        try {
            const novel =  await findRandomNovel(className);
            if (novel) {
                router.push({
                    pathname: "/novel/[novelLink]",
                    params: {
                        novelLink: novel
                    }
                });
            } else {
                console.log("Zero novel")
            }
        } catch (error) {
            setIsLoadingRandom(false);

            Toast.show({
                text1: "Error",
                text2: String(error),
                type: "error",
                position: "bottom"
            })
        } finally {
            setIsLoadingRandom(false);
        }
    };

    return (
        <Pressable
            onPress={handleRandomNovel}
            disabled={isLoadingRandom}
            className={`${(!text && !containerClassName)
                ? "flex justify-center items-center"
                : containerClassName
                }`}
        >
            {isLoadingRandom ? (
                <ActivityIndicator size="small" color="#4b5563" />
            ) : (
                    <MaterialCommunityIcons
                        name="dice-multiple-outline"
                        size={24}
                        color={isDark ? "#0369a1" : "#4b5563"}
                    />
            )}
            {
                text && <Text className="font-medium dark:text-sky-700 dark:font-bold">Random</Text>
            }
        </Pressable>
    );
};

export default RandomNovel;