import React, {lazy} from 'react'
import {Switch,} from "react-router-dom";
import PropsRoute from "../shared/PropsRoute";
import {makeStyles, withStyles} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import CustomerManagementDetails from "./components/customers/customerDetails/CustomerManagementDetails";
import Logs from "./components/customerLogs";
import Home from "../unauthorized/home/Home";

const AddCustomer = lazy(() => import("./components/customers/addCustomer/AddCustomer"));
const Customers = lazy(() => import("./components/customers/Customers"));

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        backgroundColor: theme.palette.primary,
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(0),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(0),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(0),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(0),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
});
const useStyles = makeStyles(styles);
const Routing = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Switch>
                <SnackbarProvider maxSnack={3}>
                    <PropsRoute
                        path="/admin/create/customer"
                        component={AddCustomer}
                    />
                    <PropsRoute
                        path="/admin/customers"
                        component={Customers}
                        theme={props.theme}
                        exact
                    />
                    <PropsRoute
                        path="/admin/customers/:customerId"
                        component={CustomerManagementDetails}
                        theme={props.theme}
                        exact
                    />
                    <PropsRoute
                        path="/admin/customers/:customerId/:tab"
                        component={CustomerManagementDetails}
                        theme={props.theme}
                        exact
                    />
                    <PropsRoute
                        path="/admin/logs/customer"
                        component={Logs}
                        theme={props.theme}
                        exact
                    />
                    <PropsRoute
                        path="/"
                        component={Home}
                        theme={props.theme}
                        exact
                    />
                </SnackbarProvider>
            </Switch>
        </div>
    )
}
export default withStyles(styles, {withTheme: true})((Routing));