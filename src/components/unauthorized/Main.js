import React, {memo, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import DialogSelector from "./register_login/DialogSelector";

const styles = (theme) => ({
    wrapper: {
        backgroundColor: theme.palette.common.darkBlack,
        overflowX: "hidden",
    }
});

function Main(props) {
    const [selectedTab, setSelectedTab] = useState(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(null);
    const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);

    const selectHome = useCallback(() => {
        document.title =
            "";
        setSelectedTab("Home");
    }, [setSelectedTab]);

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

    //future
    const handleCookieRulesDialogOpen = useCallback(() => {
        setIsCookieRulesDialogOpen(true);
    }, [setIsCookieRulesDialogOpen]);
    //future
    const handleCookieRulesDialogClose = useCallback(() => {
        setIsCookieRulesDialogOpen(false);
    }, [setIsCookieRulesDialogOpen]);

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
                selectHome={selectHome}
            />
            <Footer/>
        </div>
    );
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
