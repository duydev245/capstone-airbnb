import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { CinemaManagement } from "../modules/Admin/CinemaManagement";
import { UserManagement } from "../modules/Admin/UserManagement";
import { LoginPage } from "../modules/Auth/Login";
import { RegisterPage } from "../modules/Auth/Register";
import { PATH } from "./path";
import { useSelector } from "react-redux";
import { HomePage } from "../modules/User/Home"


const RejectedRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser === null) {
    return <Outlet />;
  }

  return currentUser.maLoaiNguoiDung === "Admin" ? (
    <Navigate to={PATH.ADMIN} />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const ProtectedRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser === null) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return currentUser.maLoaiNguoiDung === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const ProtectedUserRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser === null) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return currentUser.maLoaiNguoiDung === "USER" ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const useRouteElement = () => {
  const routes = useRoutes([
    // Home
    {
      path: PATH.HOME,
      element: <HomePage />,
    },
    // Auth
    {
      path: "auth",
      element: <RejectedRouter />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          ),
        },
      ],
    },
    // Admin
    {
      path: PATH.ADMIN,
      element: <ProtectedRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_USER} />,
        },
        {
          path: PATH.ADMIN_USER,
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_CINEMA,
          element: (
            <AdminLayout>
              <CinemaManagement />
            </AdminLayout>
          ),
        },
      ],
    },


  ]);

  return routes;
};

export default useRouteElement;
