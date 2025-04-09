import { Button, Layout, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/features/auth/authSlice";
import Footer from "./Footer";

const { Header, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header className="flex" style={{ padding: "0 0" }}>
          <div
            className="flex gap-4 custom-link-style"
            style={{ marginLeft: "auto" }}
          >
            <Link to="/home" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/cars" className="text-white hover:text-gray-200">
              Cars
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-200">
              Contact
            </Link>
          </div>

          <Button
            onClick={handleLogout}
            style={{
              margin: "auto 20px",
              backgroundColor: "red",
              color: "white",
              border: "0",
              fontWeight: "800",
            }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", minHeight: "100vh" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
