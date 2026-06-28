import Sidebar from "@/Components/Dashboard_sidebar";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 md:shrink-0 bg-white border-r border-slate-100 md:sticky md:top-0 md:h-screen">
                <Sidebar />
            </aside>
            
            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;