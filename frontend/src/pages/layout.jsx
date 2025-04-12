import Nav from "../components/Nav"
import { Outlet } from "react-router-dom"
export default function Layout() {
    return(
        <div>
            <Nav />
            <main>
                <Outlet />  {/* 渲染子路由内容 */}
            </main>
        </div>
    )
}