import React, {useContext, useRef, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    colors,
    Grid,
    Modal,
    Switch,
    TextField,
    Typography
} from '@material-ui/core';
import {useHttpClient} from "../../../../../../../../../../hooks/http-hook";
import {AuthContext} from "../../../../../../../../../../context/auth-context";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 700,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    container: {
        marginTop: theme.spacing(3)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const CustomerEdit = (props) => {
    const {open, onClose, customer, representativeList, currentRep, className, ...rest} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [formState, setFormState] = useState({
        ...customer
    });
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const usernameRef = useRef();
    const emailRef = useRef();
    const hasRepresentationRef = useRef();
    const [value, setValue] = useState(currentRep);
    const [inputValue, setInputValue] = useState('');


    function handleChange(responseData) {
        // Here, we invoke the callback with the new value
        props.onChangeDetails[0](responseData);
        props.onChangeDetails[1](responseData);
    }

    const handleFieldChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState,
            [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
        }));
    };

    const customerUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`customers/${formState.customerId}`,
                'PUT',
                JSON.stringify({
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                    representativeIsbn: value,
                    hasRepresentation: true
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            handleChange(responseData)
            onClose()
            enqueueSnackbar("Customer updated!")
        } catch (err) {
            enqueueSnackbar(err.toString())
        }
    };

    return (
        <Modal
            onClose={onClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <form>
                    <CardContent>
                        <Typography
                            align="center"
                            gutterBottom
                            variant="h3"
                        >
                            Edit Customer
                        </Typography>
                        <Grid
                            className={classes.container}
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email address"
                                    name="email"
                                    onChange={handleFieldChange}
                                    value={formState.email}
                                    variant="outlined"
                                    inputRef={emailRef}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    onChange={handleFieldChange}
                                    value={formState.username}
                                    variant="outlined"
                                    inputRef={usernameRef}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={representativeList.map((d) => (d.isbn))}
                                    renderInput={(params) => <TextField {...params} label="Current Representative"
                                                                        variant="outlined"/>}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Representation Status"
                                    name="hasRepresentation"
                                    onChange={handleFieldChange}
                                    value={formState.hasRepresentation.toString()}
                                    variant="outlined"
                                    inputRef={hasRepresentationRef}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    onChange={handleFieldChange}
                                    value={"no country set"}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Address 1"
                                    name="address1"
                                    onChange={handleFieldChange}

                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Address 2"
                                    name="address2"
                                    onChange={handleFieldChange}
                                    value={formState.address2}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item/>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography variant="h5">Email Verified</Typography>
                                <Typography variant="body2">
                                    Disabling this will automatically send the user a verification
                                    email
                                </Typography>
                                <Switch
                                    checked={formState.verified}
                                    color="secondary"
                                    edge="start"
                                    name="verified"
                                    onChange={handleFieldChange}
                                    value={formState.verified}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography variant="h5">Discounted Prices</Typography>
                                <Typography variant="body2">
                                    This will give the user discountedprices for all products
                                </Typography>
                                <Switch
                                    checked={formState.discountedPrices}
                                    color="secondary"
                                    edge="start"
                                    name="discountedPrices"
                                    onChange={handleFieldChange}
                                    value={formState.discountedPrices}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button
                            onClick={onClose}
                            variant="contained"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className={classes.saveButton}
                            onClick={customerUpdateSubmitHandler}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Modal>
    );
};

CustomerEdit.displayName = 'CustomerEdit';

CustomerEdit.propTypes = {
    className: PropTypes.string,
    customer: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    onChangeDetails: PropTypes.array
};

CustomerEdit.defaultProps = {
    open: false,
    onClose: () => {
    }
};

export default CustomerEdit;
