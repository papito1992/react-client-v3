import React, {Fragment, Suspense, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {CardContent, Grid} from '@material-ui/core';

// import axios from 'utils/axios';
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
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [customer, setCustomer] = useState();
    const [representative, setRepresentative] = useState();
    // const representativeIsbnRef = useRef();
    const [value, setValue] = useState();
    const [rep, setRep] = useState();
    // console.log(props)
    useEffect(() => {
        let mounted = true;
        console.log('summary fetch')
        if (customer === undefined) {
            fetchCustomer();
        }
        return () => {
            mounted = false;
        };
    }, [setRep]);
    const fetchCustomer = async () => {
        try {
            await sendRequest(
                `http://localhost:8080/customers/${props.customerId}`, 'GET', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }).then(
                responseData => {
                    // console.log(responseData)
                    setCustomer(responseData);
                    fetchRepresentative(responseData);
                }
            );

        } catch (err) {
        }
    };

    const fetchRepresentative = async (customerData) => {
        try {
            // console.log("00000000000000000000000000000000")
            // console.log(customerData)
            // console.log("00000000000000000000000000000000")
            await sendRequest(
                `http://localhost:8080/representatives/${customerData.representativeIsbn}`, 'GET', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }).then(
                responseData => {
                    // console.log(responseData)
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
        console.log(newRep)
        if (newRep !== undefined) {
            console.log(_.isEqual(newRep, customer.representativeIsbn));
            if (!_.isEqual(rep, customer.representativeIsbn))
                setRep(rep);
            fetchRepresentative(newRep)
        }
    }
    if (value !== undefined) {
        console.log(_.isEqual(value, customer));
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

            {/*<Suspense fallback={<Fragment/>}>*/}
                {representative !== undefined ?<Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    <RepresentativeInfo props={props} representative={representative} />
                </Grid>: ""}
            {/*</Suspense>*/}

            {/*<Grid*/}
            {/*    item*/}
            {/*    lg={4}*/}
            {/*    md={6}*/}
            {/*    xl={3}*/}
            {/*    xs={12}*/}
            {/*>*/}
            {/*    <Invoices customer={customer}/>*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*    item*/}
            {/*    lg={4}*/}
            {/*    md={6}*/}
            {/*    xl={3}*/}
            {/*    xs={12}*/}
            {/*>*/}
            {/*    <SendEmails customer={customer}/>*/}
            {/*</Grid>*/}
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
