import { ChapterContent as ChapterContentType } from "@constants/types";
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from 'react-native';

type ChapterContentProps = {
    chapterContent: ChapterContentType;
    readingProgress: number;
    setReadingProgress: (progress: number) => void;
    onPressContent?: () => void;
    children?: ReactNode;
    sliderHandlerRef?: React.RefObject<(value: number) => void>;
};

const ChapterContent = ({
    chapterContent,
    readingProgress,
    setReadingProgress,
    onPressContent,
    children,
    sliderHandlerRef
}: ChapterContentProps) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
    const [isRestoring, setIsRestoring] = useState<boolean>(true);

    const isMomentumScrollingRef = useRef<boolean>(false);

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!contentHeight || !scrollViewHeight) return;
        if (isRestoring || isMomentumScrollingRef.current) return; // <- suppress twitch

        const scrollY = event.nativeEvent.contentOffset.y;
        const maxScrollPosition = contentHeight - scrollViewHeight;

        if (maxScrollPosition <= 0) return;

        const progress = Math.min(Math.max(scrollY / maxScrollPosition, 0), 1);
        const newProgress = progress * 100;

        // Only update if it changed significantly
        if (Math.abs(newProgress - readingProgress) > 0.5) {
            setReadingProgress(newProgress);
        }
    }, [contentHeight, scrollViewHeight, isRestoring, readingProgress, setReadingProgress]);

    const handleSliderChange = useCallback((value: number) => {
        if (!scrollViewRef.current || !contentHeight || !scrollViewHeight) return;

        const maxScrollPosition = contentHeight - scrollViewHeight;
        const targetScrollPosition = value * maxScrollPosition;

        setIsRestoring(true); // lock

        setReadingProgress(value * 100);

        scrollViewRef.current.scrollTo({
            y: targetScrollPosition,
            animated: false // <- disable animation, prevents twitching
        });

        // unlock after a short delay
        setTimeout(() => {
            setIsRestoring(false);
        }, 100);
    }, [contentHeight, scrollViewHeight, setReadingProgress]);

    useEffect(() => {
        if (sliderHandlerRef) {
            sliderHandlerRef.current = handleSliderChange;
        }
    }, [handleSliderChange, sliderHandlerRef]);

    useEffect(() => {
        if (scrollViewRef.current && contentHeight && scrollViewHeight) {
            const maxScrollPosition = contentHeight - scrollViewHeight;
            const targetScrollPosition = (readingProgress / 100) * maxScrollPosition;

            setIsRestoring(true);
            scrollViewRef.current.scrollTo({ y: targetScrollPosition, animated: false });

            setTimeout(() => setIsRestoring(false), 300);
        }
    }, [chapterContent, contentHeight, scrollViewHeight]);

    return (
        <View>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                className="text-gray-500 px-2 text-center flex gap-2"
                onScroll={handleScroll}
                scrollEventThrottle={32}
                onMomentumScrollBegin={() => { isMomentumScrollingRef.current = true; }}
                onMomentumScrollEnd={() => {
                    isMomentumScrollingRef.current = false;
                    setIsRestoring(true);
                    setTimeout(() => setIsRestoring(false), 100);
                }}
                onLayout={(event) => {
                    setScrollViewHeight(event.nativeEvent.layout.height);
                }}
            >
                <View
                    onLayout={(event) => {
                        setContentHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <Pressable onPress={onPressContent}>
                        <Text className="font-bold text-lg  mt-2">{chapterContent.title}</Text>
                        {chapterContent.content.map((item, index) => (
                            <Text key={index} className="mb-4">
                                {item}
                            </Text>
                        ))}
                    </Pressable>
                    {children}
                </View>
            </ScrollView>
        </View>
    );
};

export default ChapterContent;
