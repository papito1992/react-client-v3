import React, {Fragment, useContext, useRef, useState} from 'react'
import {useHttpClient} from "../../../../../hooks/http-hook";
import {AuthContext} from "../../../../../context/auth-context";
import {Button, Card, CardHeader, Grid, Paper, TextField, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import classNames from "classnames";
import {useSnackbar} from 'notistack';
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px",
        // marginBottom: `${theme.spacing(20)}px !important`
    },
    darkColor: {
        color: theme.palette.darkBlack, // or theme.palette.primary.main
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35ch'
    },
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light
        },
        '& .MuiInputBase-root': {
            color: "white"
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.primary.dark
        }
    },
    backCol: {
        backgroundColor: theme.palette.common.darkBlack
    },
    lightBackCol: {
        backgroundColor: theme.palette.common.lightBlack
    }

}));

const AddCustomer = (props) => {
    const classes = useStyles();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const usernameRef = useRef();
    const emailRef = useRef();
    const {enqueueSnackbar} = useSnackbar();
    const [variant, setVariant] = useState("error");
    const {history} = props;
    // const hasRepresentation = useRef();
    // const representativeIsbn = useRef();

    const customerSubmitHandler = async event => {
        event.preventDefault();
        try {
            console.log(auth.token)
            const responseData = await sendRequest('http://localhost:8080/customer',
                'POST',
                JSON.stringify({
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                    'representativeIsbn': "defaultRep",
                    'hasRepresentation': false
                })
                ,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            history.push('/admin/customers');
            enqueueSnackbar("Customer added!", {variant})
        } catch (err) {
            console.log(err)
            enqueueSnackbar(err.toString(), {variant})
        }
    };

    return (

        <Fragment>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
            <Card className={classes.lightBackCol}>
                <CardHeader title="Input customer data" style={{color: '#ffb74d'}} className={classes.backCol}>
                </CardHeader>
                <form onSubmit={customerSubmitHandler} style={{margin: 10}}>
                    <div className={classNames(classes.textField)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            // error={status === "invalidEmail"}
                            required
                            fullWidth
                            label="Email Address"
                            inputRef={emailRef}
                            autoFocus
                            autoComplete="off"
                            type="email"
                            FormHelperTextProps={{error: true}}
                            className={classes.root}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            // error={status === "invalidEmail"}
                            required
                            fullWidth
                            label="Customer name"
                            inputRef={usernameRef}
                            autoFocus
                            autoComplete="off"
                            type="text"
                            FormHelperTextProps={{error: true}}
                            className={classes.root}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            className={classNames(classes.margin)}
                            variant="contained"
                            size="large"
                        >
                            ADD CUSTOMER
                        </Button>
                    </div>
                </form>
            </Card>
            </Grid>
        </Fragment>
    )
}

export default AddCustomer;
