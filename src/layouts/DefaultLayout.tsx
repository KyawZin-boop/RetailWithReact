import { useAuth } from "@/hooks";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.tsx";
import ProfileBox from "./common/ProfileBox";
import { useAppSelector } from "@/store";
import { selectTotalQuantity } from "@/store/features/cartSlice";

const DefaultLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const totalQuantity = useAppSelector(selectTotalQuantity);

  return !isAuthenticated ? (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  ) : (
    <div className="h-svh flex overflow-hidden">
      <DesktopSidebar />
      <main className="w-full min-h-full overflow-y-auto">
        <nav className="flex justify-end p-3 border-b-2 border-blue-200 shadow-md">
          <NavLink to="/cart" className="relative cursor-pointer me-5">
            <i className="fa fa-cart-shopping text-blue-600 text-xl align-middle">
              {totalQuantity > 0 ? (
                <span className="text-white absolute -top-1.5 -right-3 text-xs bg-red-500 font-semibold rounded-full px-1.5 z-10">
                  {totalQuantity}
                </span>
              ) : null}
            </i>
          </NavLink>
          <ProfileBox />
        </nav>

        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
