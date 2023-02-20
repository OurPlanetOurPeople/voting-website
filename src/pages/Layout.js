import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.png";
import Container from "react-bootstrap/Container";
import { Link, Outlet } from "react-router-dom";
import "./Layout.scss";
import { DynamicNav } from "../components/DynamicNav";
import { footerComponentId, headerComponentId } from "../Routing";
import {DynamicFooter} from "../components/DynamicFooter";

const Layout = () => {
  return (
    <>
      <Navbar bg="light" fixed="top" variant="light" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="Our Planet Our People logo"
              src={logo}
            />{" "}
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <DynamicNav id={headerComponentId}></DynamicNav>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <DynamicFooter id={footerComponentId}></DynamicFooter>
    </>
  );
};

export default Layout;
