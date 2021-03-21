import React, {Fragment, useContext, useEffect, useState} from "react";
import UserDataArea from "./UserDataArea";
import {AuthContext} from "../../../../context/auth-context";
import {useHttpClient} from "../../../../hooks/http-hook";
import Header from "./header/Header";

function Customers(props) {
    const [loadedCustomers, setLoadedCustomers] = useState([])
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const fetchCustomers = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"customers", 'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setLoadedCustomers(responseData)
        } catch (err) {
        }
    };
    useEffect(() => {
            const resp = fetchCustomers()
        },
        [setLoadedCustomers]
    );
    return (
        <Fragment>
            <Header/>
            <hr/>
            <UserDataArea
                loadedCustomers={loadedCustomers}
                setLoadedCustomers={setLoadedCustomers}
                theme={props.theme}
            />
        </Fragment>
    );
}

Customers.propTypes = {};

export default Customers;
