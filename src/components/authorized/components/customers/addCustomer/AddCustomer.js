import React, {Fragment, useContext, useRef, useState} from 'react'
import {useHttpClient} from "../../../../../hooks/http-hook";
import {AuthContext} from "../../../../../context/auth-context";
import {Button, Card, CardHeader, Grid, TextField} from "@material-ui/core";
import {useSnackbar} from 'notistack';


const AddCustomer = (props) => {
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const usernameRef = useRef();
    const emailRef = useRef();
    const {enqueueSnackbar} = useSnackbar();
    const [variant] = useState("success");
    const {history} = props;

    const customerSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL+'customer',
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
            <Card >
                <CardHeader title="Input customer data" style={{color: '#ffb74d'}} >
                </CardHeader>
                <form onSubmit={customerSubmitHandler} style={{margin: 10}}>
                    <div >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            inputRef={emailRef}
                            autoFocus
                            autoComplete="off"
                            type="email"
                            FormHelperTextProps={{error: true}}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Customer name"
                            inputRef={usernameRef}
                            autoFocus
                            autoComplete="off"
                            type="text"
                            FormHelperTextProps={{error: true}}

                        />
                        <Button
                            type="submit"
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
