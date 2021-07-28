import React from "react";

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

import { Switch } from "react-router";
import { SignIn } from "./pages/SignIn";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { PublicRoute } from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";

function App() {
    return (
        // all components inside ProfileProvider will be able to access profile context provider *these components are consumer* //
        <ProfileProvider>
            <Switch>

                <PublicRoute path="/signin">
                    <SignIn />
                </PublicRoute>

                <PrivateRoute path="/">
                    <Home />
                </PrivateRoute>

            </Switch>
        </ProfileProvider>
    )
}

export default App;
