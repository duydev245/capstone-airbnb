import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { UserLayout } from "../layouts/UserLayout";
import { UserManagement } from "../modules/Admin/UserManagement";
import { LocationManagement } from "../modules/Admin/LocationManagement"
import { RoomManagement } from "../modules/Admin/RoomManagement"
import { BookingManagement } from "../modules/Admin/BookingManagement"
import { LoginPage } from "../modules/Auth/Login";
import { RegisterPage } from "../modules/Auth/Register";
import { PATH } from "./path";
import { useSelector } from "react-redux";
import { HomePage } from "../modules/User/Home"
import { RoomsPage } from "../modules/User/ListRooms";
import { AccountSettings } from "../modules/Admin/AccountSettings";
import { RoomDetail } from "../modules/User/RoomDetail";


const RejectedRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser === null) {
    return <Outlet />;
  }

  return currentUser.role === "ADMIN" ? (
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

  return currentUser.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

// const ProtectedUserRouter = () => {
//   const { currentUser } = useSelector((state) => state.user);

//   if (currentUser === null) {
//     return <Navigate to={PATH.LOGIN} />;
//   }

//   return currentUser.role === "USER" ? (
//     <Outlet />
//   ) : (
//     <Navigate to={PATH.HOME} />
//   );
// };

const useRouteElement = () => {
  const routes = useRoutes([
    // Home
    {
      path: PATH.HOME,
      element:
        <UserLayout>
          <HomePage />
        </UserLayout>,
    },
    //RoomsPage
    {
      path: PATH.ROOMS,
      element:
        <UserLayout>
          <RoomsPage />
        </UserLayout>
    },
    // Room details page
    {
      path: PATH.ROOM_DETAIL,
      element: (
        <RoomDetail />
      ),
    },
    // Auth
    {
      path: PATH.AUTH,
      element: <RejectedRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.LOGIN} />,
        },
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
          path: PATH.ADMIN_LOCATION,
          element: (
            <AdminLayout>
              <LocationManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ROOM,
          element: (
            <AdminLayout>
              <RoomManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_BOOKING,
          element: (
            <AdminLayout>
              <BookingManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ACCOUNT_SETTINGS,
          element: (
            <AdminLayout>
              <AccountSettings />
            </AdminLayout>
          ),
        },
      ],
    },


  ]);

  return routes;
};

export default useRouteElement;
