import React, {Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Box, Button, Card, Grid, Hidden, isWidthUp, Typography, withStyles, withWidth,} from "@material-ui/core";

const styles = (theme) => ({
    extraLargeButtonLabel: {
        fontSize: theme.typography.body1.fontSize,
        [theme.breakpoints.up("sm")]: {
            fontSize: theme.typography.h6.fontSize,
        },
    },
    extraLargeButton: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        [theme.breakpoints.up("xs")]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        [theme.breakpoints.up("lg")]: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },
    card: {
        boxShadow: theme.shadows[4],
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("xs")]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
        [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(5.5),
            paddingBottom: theme.spacing(5.5),
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
        },
        [theme.breakpoints.down("lg")]: {
            width: "auto",
        },
    },
    wrapper: {
        position: "relative",
        backgroundColor: theme.palette.darkColor,
        paddingBottom: theme.spacing(5),
    },
    image: {
        maxWidth: "100%",
        verticalAlign: "middle",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(15),
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(15),
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(15),
        },
    },
    containerFix: {
        [theme.breakpoints.up("md")]: {
            maxWidth: "none !important",
        },
    }
});

function HeadSection(props) {
    const {classes, width} = props;
    return (
        <Fragment>
            <div className={classNames("lg-p-top", classes.wrapper)}>
                <div className={classNames("container-fluid", classes.container)}>
                    <Box display="flex" justifyContent="center" className="row">
                        <Card
                            className={classes.card}
                        >
                            <div className={classNames(classes.containerFix, "container")}>
                                <Box justifyContent="space-between" className="row">
                                    <Grid item xs={12} md={5}>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="space-between"
                                            height="100%"
                                        >
                                            <Box mb={4}>
                                                <Typography
                                                    variant={isWidthUp("lg", width) ? "h3" : "h4"}
                                                >
                                                    Website built with React +Material-UI, fun combo!
                                                </Typography>
                                            </Box>
                                            <div>
                                                <Box mb={2}>
                                                    <Typography
                                                        variant={isWidthUp("lg", width) ? "h6" : "body1"}
                                                        color="error"
                                                    >
                                                        If you are interested in the code, visit the link below
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    fullWidth
                                                    className={classes.extraLargeButton}
                                                    classes={{label: classes.extraLargeButtonLabel}}
                                                    href="https://github.com/dunky11/react-saas-template"
                                                >
                                                    Download from GitHub
                                                </Button>
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Hidden smDown>
                                        <Grid item md={6}>
                                            <img
                                                alt=""
                                                src={"https://earthsky.org/upl/2018/10/moon-waxing-crescent-earthshine-1-8-2019-Chuck-Reinhart-Vincennes-IN-e1547258318928.jpg"}
                                                className={classes.image}
                                            />
                                        </Grid>
                                    </Hidden>
                                </Box>
                            </div>
                        </Card>
                    </Box>
                </div>
            </div>
        </Fragment>
    );
}

HeadSection.propTypes = {
    classes: PropTypes.object,
    width: PropTypes.string,
    theme: PropTypes.object,
};

export default withWidth()(
    withStyles(styles, {withTheme: true})(HeadSection)
);
