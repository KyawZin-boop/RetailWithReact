import {sidebarData} from "@/components/sidebar/sidebarData";
import {NavLink, useLocation} from "react-router-dom";

const DesktopSidebar = () => {

    const location = useLocation()
    const checkLocation = (paths: string[]):string => {
        if (paths.includes(location.pathname)) return 'bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-medium shadow'
        return ''
    }

    return <aside className={'lg:flex flex-col hidden min-h-svh min-w-[220px] lg:min-w-[240px] bg-white h-full'}>
        <div className="flex flex-col items-center justify-center h-20">
            <h4
                className="text-3xl leading-[0.75] font-bold tracking-normal cursor-pointer"
            >
                <b className="text-blue-500 font-semibold"> FUSION </b>
                STORE
            </h4>
        </div>
        <ul className={'px-3'}>
            {
                sidebarData.map((item) =>
                    <NavLink to={item.routeNames[0]} key={item.name}>
                        <li
                            className={"hover:bg-yellow-500 flex items-center justify-between p-2 mb-3 rounded-sm cursor-pointer "
                                + checkLocation(item.routeNames)
                            }
                        >
                            <div className={'flex items-center gap-3'}>
                                {item.icon && <item.icon className="w-4 h-4"/>}
                                <p className={"text-[13px]"}>{item.name}</p>
                            </div>
                        </li>
                    </NavLink>
                )
            }
        </ul>
    </aside>
}
export default DesktopSidebar