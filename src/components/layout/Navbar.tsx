import { Button, Layout, Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Header
      style={{
        background: "#1E40AF", // Catchy deep blue
        display: "flex",
        alignItems: "center",
        height: "80px", // Increased height
        padding: "0 20px",
        justifyContent: "space-between", // Space between logo and hamburger
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          CarNexa
        </Link>
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="lg:hidden flex items-center">
        <Button
          type="default"
          onClick={showDrawer}
          icon={<FontAwesomeIcon icon={faBars} />}
          style={{
            color: "white",
          }}
        />
      </div>

      {/* Drawer Menu (Mobile) */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        style={{
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <Menu
          theme="dark"
          mode="vertical"
          items={[
            { key: "1", label: <Link to="/">Home</Link> },
            { key: "2", label: <Link to="/cars">Cars</Link> },
            { key: "3", label: <Link to="/about">About</Link> },
            { key: "4", label: <Link to="/contact">Contact</Link> },
            { key: "5", label: <Link to="/login">Login</Link> },
            { key: "6", label: <Link to="/signup">Sign Up</Link> },
          ]}
        />
      </Drawer>

      {/* Navigation Items for larger screens */}
      <Menu
        theme="dark"
        mode="horizontal"
        className="sm:hidden"
        style={{
          marginLeft: "auto", // Move to right
          background: "transparent",
          borderBottom: "none",
          display: "flex",
          gap: "0px", // No gap between items
        }}
        items={[
          { key: "1", label: <Link to="/">Home</Link> },
          { key: "2", label: <Link to="/cars">Cars</Link> },
          { key: "3", label: <Link to="/about">About</Link> },
          { key: "4", label: <Link to="/contact">Contact</Link> },
        ]}
      />

      {/* Login & Sign Up Buttons */}
      <div className="ml-4 hidden lg:flex gap-4">
        <Button type="default">
          <Link to="/login">Login</Link>
        </Button>
        <Button type="primary">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
