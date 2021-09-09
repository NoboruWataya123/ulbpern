import React, {useContext} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Context } from '..'
import { authRoutes, publicRouters } from '../routes'

export default function AppRouter() {
    const {user} = useContext(Context)
    console.log(user);

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} />
            )}
                {publicRouters.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact />
                )}
                <Redirect to='/' />
        </Switch>
    )
}
