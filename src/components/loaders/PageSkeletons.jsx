import Skeleton from "../common/Skeleton";

export const UsersListSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <Skeleton height="2.5rem" width="12rem" className="mb-2" />
                    <Skeleton height="1rem" width="16rem" />
                </div>
                <div className="flex gap-3">
                    <Skeleton height="2.5rem" width="12rem" className="rounded-lg" />
                    <Skeleton height="2.5rem" width="8rem" className="rounded-lg" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} height="1rem" width="15%" />
                    ))}
                </div>
                <div>
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="p-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3 w-[25%]">
                                <Skeleton variant="circular" height="2.5rem" width="2.5rem" />
                                <div className="flex-1">
                                    <Skeleton height="1rem" width="80%" />
                                </div>
                            </div>
                            <Skeleton height="1rem" width="20%" />
                            <Skeleton height="1.5rem" width="15%" className="rounded-full" />
                            <Skeleton height="1rem" width="15%" />
                            <Skeleton height="2rem" width="5rem" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const UserDetailsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            {/* Breadcrumb & Header */}
            <Skeleton height="1rem" width="8rem" className="mb-6" />
            <div className="flex justify-between items-start mb-8">
                <div>
                    <Skeleton height="2.5rem" width="14rem" className="mb-2" />
                    <Skeleton height="1rem" width="10rem" />
                </div>
                <Skeleton height="2.5rem" width="8rem" className="rounded-lg" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                        <Skeleton variant="circular" height="8rem" width="8rem" className="mb-4" />
                        <Skeleton height="2rem" width="12rem" className="mb-2" />
                        <Skeleton height="1rem" width="10rem" className="mb-4" />
                        <Skeleton height="1.5rem" width="6rem" className="rounded-full mb-6" />
                        <div className="w-full pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Skeleton height="0.8rem" width="3rem" />
                                <Skeleton height="1.2rem" width="5rem" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton height="0.8rem" width="3rem" />
                                <Skeleton height="1.2rem" width="5rem" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & History */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Skeleton height="8rem" width="100%" className="rounded-2xl" />
                        <Skeleton height="8rem" width="100%" className="rounded-2xl" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <Skeleton height="1.5rem" width="10rem" className="mb-6" />
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton variant="circular" height="2rem" width="2rem" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton height="1rem" width="60%" />
                                        <Skeleton height="0.8rem" width="30%" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
