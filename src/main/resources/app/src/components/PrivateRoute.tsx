import {Redirect, Route, RouteProps} from 'react-router-dom';
import React from 'react';
import {checkRole} from "./helpers";


interface PrivateRouteProps extends RouteProps {
    component: any,
    path: any,
    roles?: string
}


const PrivateRoute = (props: PrivateRouteProps) => {  // TODO: send request to server?
    const { component: Component, path, roles, ...rest } = props;
    return (
        <Route path={path}
            {...rest}
            render={
                (props) => localStorage["user"] &&
                    (roles === undefined || checkRole(roles))
                ? <Component {...props} />
                : <Redirect to='/login'/>
            }
        />
    );
};

export default PrivateRoute;