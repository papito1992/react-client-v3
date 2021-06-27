import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {CustomerInfo, OtherActions} from './components';
import {useHttpClient} from "../../../../../../hooks/http-hook";
import {AuthContext} from "../../../../../../context/auth-context";
import _ from 'lodash';
import RepresentativeInfo from "../../../representatives/RepresentativeInfo/RepresentativeInfo";

const useStyles = makeStyles(() => ({
    root: {}
}));

const Summary = (props) => {
    const {className, ...rest} = props;
    const { sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [customer, setCustomer] = useState();
    const [representative, setRepresentative] = useState();
    const [value, setValue] = useState();
    const [rep, setRep] = useState();
    useEffect(() => {
        if (customer === undefined) {
            fetchCustomer();
        }
    }, [customer]);
    const fetchCustomer = async () => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`customers/${props.customerId}`, 'GET', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }).then(
                responseData => {
                    setCustomer(responseData);
                    fetchRepresentative(responseData);
                }
            );

        } catch (err) {
        }
    };

    const fetchRepresentative = async (customerData) => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`representatives/${customerData.representativeIsbn}`, 'GET', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }).then(
                responseData => {
                    setRepresentative(responseData)
                }
            );

        } catch (err) {
        }
    };

    if (!customer) {
        return null;
    }

    function handleChange(newValue) {
        setValue(newValue);
    }

    function handleRepChange(newRep) {
        if (newRep !== undefined) {
            if (!_.isEqual(rep, customer.representativeIsbn))
                setRep(rep);
            fetchRepresentative(newRep)
        }
    }

    if (value !== undefined) {
        if (!_.isEqual(value, customer))
            setCustomer(value);
    }
    return (
        <Grid
            {...rest}
            className={clsx(classes.root, className)}
            container
            spacing={3}
        >
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <CustomerInfo props={props} customer={customer} onChangeDetails={[handleChange, handleRepChange]}/>
            </Grid>
            {representative !== undefined ? <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <RepresentativeInfo props={props} representative={representative}/>
            </Grid> : ""}
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <OtherActions/>
            </Grid>
        </Grid>
    );
};

Summary.propTypes = {
    className: PropTypes.string,
    onChangeDetails: PropTypes.array
};

export default Summary;
