import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
            ? "bg-white text-black shadow-md font-bold"
            : "text-gray-400 hover:bg-gray-900 hover:text-white font-medium"
        }`;

    return (
        <aside className="w-64 bg-black border-r border-gray-900 hidden md:flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-gray-900 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold">A</div>
                    <span className="font-bold text-xl tracking-tight text-white">AdminPanel</span>
                </div>
            </div>

            <div className="flex-1 px-4 py-4 space-y-1">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">DASHBOARD</p>

                <NavLink to="/users" className={linkClass}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Users</span>
                </NavLink>

                <NavLink to="/analytics" className={linkClass}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Analytics</span>
                </NavLink>
            </div>

            <div className="p-4 border-t border-gray-900">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin+User&background=333&color=fff"
                        alt="Admin"
                        className="w-9 h-9 rounded-full bg-gray-800"
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">Admin User</p>
                        <p className="text-xs text-gray-400">admin@demo.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
