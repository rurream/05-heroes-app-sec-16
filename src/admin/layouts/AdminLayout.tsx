import { Outlet } from "react-router"

export const AdminLayout = () => {
    return (
        <div className="h-screen">
            <div className="bg-violet-200">
                <h1 className="to-white">AdminLayout</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </div>

    )
}