const Skeleton = ({ className, height, width, variant = "text" }) => {
    const baseClasses = "bg-gray-200 animate-pulse rounded";
    const variants = {
        text: "rounded-md",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            style={{
                height: height,
                width: width,
            }}
        />
    );
};

export default Skeleton;
