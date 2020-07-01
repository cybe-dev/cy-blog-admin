import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
  Fragment,
} from "react";
import {
  EntypoHome,
  EntypoMenu,
  EntypoLogOut,
  EntypoBox,
  EntypoNewMessage,
  EntypoCog,
  EntypoUser,
  EntypoKey,
} from "react-entypo-icons";
import { Switch } from "react-router-dom";
import { asyncLocalStorage } from "../../setting";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  SidebarMenu,
} from "../../Components";

import Helmet from "react-helmet";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      title: null,
      breadcrumb: [],
      headerShown: true,
    };

    this.menuToggle = this.menuToggle.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setHeaderShown = this.setHeaderShown.bind(this);
  }

  setTitle({ title, breadcrumb }) {
    this.setState({ title, breadcrumb });
  }

  setHeaderShown(value) {
    this.setState({ headerShown: value });
  }

  menuToggle(e) {
    this.setState({ menu: !this.state.menu });
  }

  logoutHandler(e) {
    asyncLocalStorage.clear().then(() => {
      this.props.jwtHandler();
    });
  }

  render() {
    let menuDisplay;
    if (this.state.menu) {
      menuDisplay = "block";
    } else {
      menuDisplay = "hidden";
    }

    const childrenWithProps = Children.map(this.props.children, (child) => {
      // Checking isValidElement is the safe way and avoids a TS error too.
      if (isValidElement(child)) {
        return cloneElement(child, {
          setTitle: this.setTitle,
          setHeaderShown: this.setHeaderShown,
          auth: this.props.auth,
        });
      }

      return child;
    });

    const { title } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>{title ? title : "Cy-blog"}</title>
        </Helmet>
        {this.state.headerShown ? (
          <div className="flex flex-col lg:flex-row min-h-screen bg-gray-400 text-gray-700">
            {/* Sidebar */}

            <div className="w-1/1 lg:w-2/12 bg-blue-800 shadow-md lg:shadow-none border-b border-blue-900 lg:border-r">
              {/* Heading (Logo, ToggleMenu)*/}

              <div className="flex items-center justify-between lg:justify-center p-2 px-5 text-3xl text-white">
                <h3 className="title">CY-BLOG</h3>
                <button
                  type="button"
                  className="block lg:hidden"
                  onClick={this.menuToggle}
                >
                  <EntypoMenu className="border border-white" />
                </button>
              </div>

              {/* Heading End */}

              {/*Sidebar Menu*/}

              <SidebarMenu.Parent menuDisplay={menuDisplay}>
                <SidebarMenu.List
                  type="link"
                  to="/"
                  title="Dashboard"
                  icon={EntypoHome}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="link"
                  to="/category"
                  title="Kategori"
                  icon={EntypoBox}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="link"
                  to="/post"
                  title="Postingan"
                  icon={EntypoNewMessage}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="link"
                  to="/profile"
                  title="Profil"
                  icon={EntypoUser}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="link"
                  to="/change-password"
                  title="Ganti Password"
                  icon={EntypoKey}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="link"
                  to="/setting"
                  title="Pengaturan"
                  icon={EntypoCog}
                  toggle={this.menuToggle}
                />
                <SidebarMenu.List
                  type="button"
                  onClick={this.logoutHandler}
                  title="Keluar"
                  icon={EntypoLogOut}
                  toggle={this.menuToggle}
                />
              </SidebarMenu.Parent>

              {/*Sidebar Menu End */}
            </div>

            {/*Sidebar End*/}

            {/*Content Header*/}

            <div className="w-1/1 lg:w-10/12">
              <div className="flex flex-col justify-between items-start lg:flex-row lg:items-center bg-white border-b border-gray-500 px-5 py-3 shadow-sm">
                <h3 className="text-xl roboto">{this.state.title}</h3>
                <Breadcrumb>
                  {this.state.breadcrumb.map((item, index) => {
                    if (item.path) {
                      return (
                        <BreadcrumbLink
                          key={index}
                          title={item.title}
                          path={item.path}
                        />
                      );
                    } else {
                      return <BreadcrumbList key={index} title={item.title} />;
                    }
                  })}
                </Breadcrumb>
              </div>

              {/*End Content Header*/}

              <div className="m-5">
                <Switch>{childrenWithProps}</Switch>
              </div>
            </div>
          </div>
        ) : (
          <Switch>{childrenWithProps}</Switch>
        )}
      </Fragment>
    );
  }
}

export default Layout;
