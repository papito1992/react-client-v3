import React, {Fragment, memo} from 'react'
import {withStyles} from "@material-ui/core";
import Routing from "../authorized/Routing";
import classNames from "classnames";
import NavBar from "./components/navigation/NavBar";

const styles = (theme) => ({
    main: {
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(9),
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
        },
    },
    wrapper: {
        backgroundColor: theme.palette.common.black,
        overflowX: "hidden",
        overflowY: "hidden",
        width: "100%",
        height: "100vh"
    },
});
const Main = (props) => {
    const {classes} = props;
    console.log(props)
    return (
        <Fragment>
            <NavBar>
            </NavBar>
            <main className={classNames(classes.main)}>
                <Routing theme={props.theme}
                />
            </main>
        </Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(memo(Main));