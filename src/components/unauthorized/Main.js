import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
// import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
// import NavBar from "./navigation/NavBar";
// import Footer from "./footer/Footer";
// import "aos/dist/aos.css";
// import CookieRulesDialog from "./cookies/CookieRulesDialog";
// import CookieConsent from "./cookies/CookieConsent";
// import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import DialogSelector from "./register_login/DialogSelector";
// AOS.init({ once: true });

const styles = (theme) => ({
  // wrapper: {
  //   backgroundColor: theme.palette.common.darkBlack,
  //   overflowX: "hidden",
  // }
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);

  const selectHome = useCallback(() => {
    document.title =
      "WaVer - Free template for building an SaaS or admin application";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  // const selectBlog = useCallback(() => {
  //   smoothScrollTop();
  //   document.title = "WaVer - Blog";
  //   setSelectedTab("Blog");
  // }, [setSelectedTab]);

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openTermsDialog = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);

console.log(props)
  return (
    <div>
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTermsDialog={openTermsDialog}
        openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
      />
      {/*<CookieRulesDialog*/}
      {/*  open={isCookieRulesDialogOpen}*/}
      {/*  onClose={handleCookieRulesDialogClose}*/}
      {/*/>*/}
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        // blogPosts={blogPosts}
        selectHome={selectHome}
        // selectBlog={selectBlog}
      />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
