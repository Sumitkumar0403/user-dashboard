const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
            <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-gray-100"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-black border-t-transparent"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
