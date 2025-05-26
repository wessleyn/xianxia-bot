const StripedBg = ({
    width = 360,
    height = 53,
    color1 = '#e9b5bb',
    color2 = '#f5c6cc',
    stripeWidth = 20,
    angle = -45,
    className = ''
}) => {
    const backgroundStyle = {
        backgroundImage: `repeating-linear-gradient(${angle}deg, ${color1} 0px, ${color1} ${stripeWidth}px, ${color2} ${stripeWidth}px, ${color2} ${stripeWidth * 2}px)`
    };

    return (
        <div
            className={`rounded-md overflow-hidden ${className}`}
            style={{ width: `${width}px`, height: `${height}px`, ...backgroundStyle }}
        />
    );
};

export const stripedClass = (
    color1 = '#e9b5bb',
    color2 = '#f5c6cc',
    stripeWidth = 20,
    angle = -45,
) => `repeating-linear-gradient(${angle}deg, ${color1} 0px, ${color1} ${stripeWidth}px, ${color2} ${stripeWidth}px, ${color2} ${stripeWidth * 2}px)`

export default StripedBg;
