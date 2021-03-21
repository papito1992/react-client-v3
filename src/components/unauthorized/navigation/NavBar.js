import React, {memo, useContext} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppBar, Button, Hidden, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import NavigationDrawer from "../../shared/NavigationDrawer";
import {AuthContext} from "../../../context/auth-context";

const styles = theme => ({
    appBar: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.common.darkBlack
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.h6.fontWeight
    },
    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400
    },
    noDecoration: {
        textDecoration: "none !important"
    }
});

function NavBar(props) {
    const auth = useContext(AuthContext);
    const {
        classes,
        openRegisterDialog,
        openLoginDialog,
        handleMobileDrawerOpen,
        handleMobileDrawerClose,
        mobileDrawerOpen,
        selectedTab
    } = props;
    let menuItems;
    menuItems = [
        {
            link: "/",
            name: "Home",
            icon: <HomeIcon className="text-white"/>
        },
        {
            name: "Register",
            onClick: openRegisterDialog,
            icon: <HowToRegIcon className="text-white"/>
        },
        {
            name: "Login",
            onClick: openLoginDialog,
            icon: <LockOpenIcon className="text-white"/>
        }
    ];
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div>
                        <Typography
                            variant="h4"
                            className={classes.brandText}
                            display="inline"
                            color="primary"
                        >
                            Alpaka
                        </Typography>
                    </div>
                    <div>
                        <Hidden mdUp>
                            <IconButton
                                className={classes.menuButton}
                                onClick={handleMobileDrawerOpen}
                                aria-label="Open Navigation"
                            >
                                <MenuIcon color="primary"/>
                            </IconButton>
                        </Hidden>
                        <Hidden smDown>
                            {!auth.isLoggedIn && menuItems.map(element => {
                                if (element.link) {
                                    return (
                                        <Link
                                            key={element.name}
                                            to={element.link}
                                            className={classes.noDecoration}
                                            onClick={handleMobileDrawerClose}
                                        >
                                            <Button
                                                color="primary"
                                                size="large"
                                                classes={{text: classes.menuButtonText}}
                                            >
                                                {element.name}
                                            </Button>
                                        </Link>
                                    );
                                }
                                return (
                                    <Button
                                        color="primary"
                                        size="large"
                                        onClick={element.onClick}
                                        classes={{text: classes.menuButtonText}}
                                        key={element.name}
                                    >
                                        {element.name}
                                    </Button>
                                );
                            })}
                            {auth.isLoggedIn &&
                            <Link
                                key="loggedInRedirecToDash"
                                to={"/admin/customers"}
                                className={classes.noDecoration}
                                onClick={handleMobileDrawerClose}
                            >
                                <Button
                                    color="primary"
                                    size="large"
                                    classes={{text: classes.menuButtonText}}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            }
                        </Hidden>
                    </div>
                </Toolbar>
            </AppBar>
            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={mobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleMobileDrawerOpen: PropTypes.func,
    handleMobileDrawerClose: PropTypes.func,
    mobileDrawerOpen: PropTypes.bool,
    selectedTab: PropTypes.string,
    openRegisterDialog: PropTypes.func.isRequired,
    openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, {withTheme: true})(memo(NavBar));
