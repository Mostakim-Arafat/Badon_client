

import Sidebar from "@/Components/Dashboard_sidebar";



const Layout = ({ children }) => {
    

    return (
        <div className="flex">
            <Sidebar></Sidebar>
            {children}
        </div>
    );
};

export default Layout;