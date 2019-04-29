import * as React from "react"
import createHistory from "history/createBrowserHistory"
import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "react-router-redux"
import { VinCheckView } from "./VinCheck"
import "./App.scss"

export const Routes = () => (
    <ConnectedRouter history={createHistory()}>
        <Switch>
            <Route path="/" component={VinCheckView} exact />
        </Switch>
    </ConnectedRouter>
)
