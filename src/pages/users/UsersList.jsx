import { useState, useMemo, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { Link } from "react-router-dom";

const PAGE_SIZE = 5;

const UsersList = () => {
    const { users, search, status, setSearch, setStatus } = useUserStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("name"); // name | createdAt
    const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

    const processedUsers = useMemo(() => {
        let data = [...users];

        // 🔍 Filter
        data = data.filter((u) => {
            const matchesName = u.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                status === "all" ? true : u.status === status;

            return matchesName && matchesStatus;
        });

        // 🔃 Sort
        data.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }

            if (sortBy === "createdAt") {
                return sortOrder === "asc"
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            }

            return 0;
        });

        return data;
    }, [users, search, status, sortBy, sortOrder]);

    const totalPages = Math.ceil(processedUsers.length / PAGE_SIZE);

    const paginatedUsers = processedUsers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Users</h1>
                    <p className="text-gray-500 mt-1">Manage and view user accounts</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <span className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all w-full sm:w-64"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </span>

                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="p-4 pl-6 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { setSortBy("name"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
                                    <div className="flex items-center gap-2">
                                        User
                                        {sortBy === "name" && (
                                            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { setSortBy("createdAt"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
                                    <div className="flex items-center gap-2">
                                        Created
                                        {sortBy === "createdAt" && (
                                            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=random`}
                                                    alt={u.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                                                />
                                                <span className="font-medium text-gray-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">{u.email}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${u.status === "active"
                                                    ? "bg-green-50 text-green-700 border border-green-100"
                                                    : "bg-red-50 text-red-700 border border-red-100"
                                                    }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                                                <span className="capitalize">{u.status}</span>
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(u.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <Link
                                                to={`/users/${u.id}`}
                                                className="text-gray-400 hover:text-black font-medium text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100 inline-block"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-100 bg-gray-50/30 gap-4">
                        <span className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">{Math.min((currentPage - 1) * PAGE_SIZE + 1, processedUsers.length)}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * PAGE_SIZE, processedUsers.length)}</span> of <span className="font-medium text-gray-900">{processedUsers.length}</span> results
                        </span>

                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Previous
                            </button>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
