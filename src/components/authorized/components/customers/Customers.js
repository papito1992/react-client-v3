import React, {Fragment, useContext, useEffect, useState} from "react";
import UserDataArea from "./UserDataArea";
import {AuthContext} from "../../../../context/auth-context";
import {useHttpClient} from "../../../../hooks/http-hook";
import {Container, CssBaseline} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import Header from "./header/Header";

function Customers(props) {
    const [loadedCustomers, setLoadedCustomers] = useState([])
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
console.log(props)
    const fetchCustomers = async () => {
        try {
            console.log(auth.token)
            const responseData = await sendRequest(
                "http://localhost:8080/customers", 'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setLoadedCustomers(responseData)
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
            const resp = fetchCustomers()
        },
        [setLoadedCustomers]
    );
    return (
        <Fragment>
            <Header />
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
// export default function IntegrationNotistack() {
//     return (
//         <React.Fragment>
//             {/*<SnackbarProvider maxSnack={3}>*/}
//                 <Header />
//                 <hr/>
//                 <Customers />
//             {/*</SnackbarProvider>*/}
//         </React.Fragment>
//     );
// }
