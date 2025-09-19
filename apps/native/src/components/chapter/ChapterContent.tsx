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

    // Handle scroll events to update reading progress
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!contentHeight || !scrollViewHeight || isRestoring) return;

        const scrollY = event.nativeEvent.contentOffset.y;
        const maxScrollPosition = contentHeight - scrollViewHeight;

        if (maxScrollPosition <= 0) return; // Avoid division by zero

        // Calculate progress as a value between 0 and 1
        const progress = Math.min(Math.max(scrollY / maxScrollPosition, 0), 1);

        // Convert to percentage (0-100) when storing in state
        setReadingProgress(progress * 100);
    }, [contentHeight, scrollViewHeight, isRestoring, setReadingProgress]);

    // Handle slider change to scroll to position
    const handleSliderChange = useCallback((value: number) => {
        if (!scrollViewRef.current || !contentHeight || !scrollViewHeight) return;

        const maxScrollPosition = contentHeight - scrollViewHeight;
        const targetScrollPosition = value * maxScrollPosition;

        setIsRestoring(true);
        // prevent scroll updates
        setReadingProgress(value * 100);

        scrollViewRef.current.scrollTo({ y: targetScrollPosition, animated: false });

        // Small delay to re-enable scroll tracking
        setTimeout(() => {
            setIsRestoring(false);
        }, 200);
    }, [contentHeight, scrollViewHeight, setReadingProgress]);

    // Update the ref when the handler changes
    useEffect(() => {
        if (sliderHandlerRef) {
            sliderHandlerRef.current = handleSliderChange;
        }
    }, [handleSliderChange, sliderHandlerRef]);

    // Set initial scroll position when component mounts or when progress changes externally
    useEffect(() => {
        if (scrollViewRef.current && contentHeight && scrollViewHeight) {
            const maxScrollPosition = contentHeight - scrollViewHeight;
            // Convert percentage (0-100) back to fraction (0-1) for scroll position
            const targetScrollPosition = (readingProgress / 100) * maxScrollPosition;

            setIsRestoring(true);
            scrollViewRef.current.scrollTo({ y: targetScrollPosition, animated: false });

            // Release after the layout stabilizes
            setTimeout(() => setIsRestoring(false), 300);
        }
    }, [chapterContent, contentHeight, scrollViewHeight, readingProgress]);

    return (
        <View>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                className="text-gray-500 px-2 text-center flex gap-2"
                onScroll={handleScroll}
                scrollEventThrottle={16} // Update about every 16ms for smooth tracking
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
                        <Text className="font-bold text-lg mb-4 mt-2">{chapterContent.title}</Text>
                        {chapterContent.content.map((item, index) => (
                            <Text key={index} className="mb-4">
                                {item}
                            </Text>
                        ))}
                    </Pressable>
                </View>

                {children}
            </ScrollView>
        </View>
    );
};

export default ChapterContent;
