import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout>
      {/* <Navbar /> */}
      <Content style={{ padding: "24px", minHeight: "100vh" }}>
        <h1>public layout</h1>
        <Outlet /> {/* This will render Home, Products, etc. */}
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};

export default PublicLayout;
