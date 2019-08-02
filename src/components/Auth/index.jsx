import React from 'react'
import { Route, Redirect } from "react-router-dom";

const Auth = ({
    path, 
    componentProps,
    component:Component,
    isAuthenticated
}) => {
    return <Route
                path={path}
                render={
                    (props) => {
                        if(isAuthenticated){
                            return <Component
                                {...componentProps}
                                {...props}
                            ></Component>
                        }
                        
                        return <Redirect
                                to="/auth/login"
                            />
                    }
                }
            >
            </Route>
}

export default Auth