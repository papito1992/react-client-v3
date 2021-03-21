import React, {memo} from "react";
import {Switch} from "react-router-dom";
import PropsRoute from "../../components/shared/PropsRoute";
import Home from "./home/Home";

function Routing() {

    return (
        <Switch>
            <PropsRoute path="/" component={Home}/>
        </Switch>
    );
}

Routing.propTypes = {};

export default memo(Routing);
