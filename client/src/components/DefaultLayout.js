import React from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-2-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-3-line",
      path: "/bookings",
    },
    {
      name: "Profile",
      icon: "ri-user-line",
      path: "/profile",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-fill",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          {/* {collapsed ? (
            <i
              className="ri-menu-2-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              className="ri-close-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )} */}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img className="ubus-logo" src="bus2.png" alt="UBus" />
            <h2 className="logo">UBus</h2>
            <h1 className="role">Logged in as {user?.name}</h1>
            <h1 className="role">{user?.isAdmin && "Admin"}</h1>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
                onClick={() => {
                  if (item.path === "/logout") {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
