import React, {Fragment, memo} from 'react'
import {withStyles} from "@material-ui/core";
import Routing from "../authorized/Routing";
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
    }
});
const Main = (props) => {
    const {classes} = props;
    return (
        <Fragment>
            <NavBar>
            </NavBar>
            <main className={classes.main}>
                <Routing
                />
            </main>
        </Fragment>
    )
}

export default withStyles(styles, {withTheme: true})(memo(Main));