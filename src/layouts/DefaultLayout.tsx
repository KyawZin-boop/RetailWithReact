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
        <nav className="flex justify-end p-3">
          <NavLink to="/cart" className="relative cursor-pointer">
            <i className="fa fa-cart-shopping text-blue-600 text-2xl align-middle">
              {totalQuantity > 0 ? (
                <span className="text-red-500 absolute -top-2 -right-1 text-xs bg-white font-semibold rounded-full px-1 z-10">
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
