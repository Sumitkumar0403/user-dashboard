import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";
import Modal from "../../components/common/Modal";

// Mock Activity Data
const MOCK_ACTIVITY = {
    logins: 42,
    lastActive: "2 hours ago",
    role: "Admin",
    location: "New York, USA",
};

const MOCK_HISTORY = [
    { action: "Logged in", date: "Today, 10:23 AM" },
    { action: "Updated profile picture", date: "Yesterday, 4:15 PM" },
    { action: "Changed password", date: "Jan 5, 2024" },
    { action: "Downloaded invoice", date: "Jan 2, 2024" },
    { action: "Created new project", date: "Dec 28, 2023" },
];

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, updateUser } = useUserStore();
    const user = users.find((u) => u.id === id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", status: "" });

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="mb-4">User not found</p>
                <button
                    onClick={() => navigate('/users')}
                    className="text-black underline hover:text-gray-700"
                >
                    Back to Users
                </button>
            </div>
        );
    }

    const handleEditClick = () => {
        setFormData({ name: user.name, status: user.status });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.name.trim()) return;
        updateUser(id, formData);
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/users')}
                    className="text-sm text-gray-500 hover:text-black mb-4 flex items-center gap-1 transition-colors"
                >
                    ← Back to Users
                </button>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Profile</h1>
                        <p className="text-gray-500 mt-1">View and manage user details</p>
                    </div>
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md"
                    >
                        Edit User
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                            alt={user.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500 mb-4">{user.email}</p>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 ${user.status === "active"
                                    ? "bg-green-50 text-green-700 border border-green-100"
                                    : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                            <span className="capitalize">{user.status}</span>
                        </span>

                        <div className="w-full mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Joined</p>
                                <p className="font-medium text-gray-900 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Role</p>
                                <p className="font-medium text-gray-900 mt-1">{MOCK_ACTIVITY.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity & Stats */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium mb-1">Total Logins</p>
                            <p className="text-3xl font-bold text-gray-900">{MOCK_ACTIVITY.logins}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium mb-1">Last Active</p>
                            <p className="text-3xl font-bold text-gray-900">{MOCK_ACTIVITY.lastActive}</p>
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {MOCK_HISTORY.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-medium text-sm">{item.action}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Edit User"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            placeholder="Enter full name"
                        />
                        {!formData.name.trim() && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-3 mt-6 pt-2">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!formData.name.trim()}
                            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserDetails;
