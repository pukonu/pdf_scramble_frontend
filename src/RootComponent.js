import React from 'react';
import {Route, Switch} from "react-router-dom";
import {ViewGenerator} from "./component/generator";
import {Top} from "./component/layout";

const RootComponent = () => {
    return (
        <div>
            <Switch>
                <Route path={`/(|generator|about)`} render={() => {
                    return (
                        <div>
                            <div className="page-container">
                                <Top />
                                <Switch>
                                    <Route path="/" component={ViewGenerator} />
                                </Switch>
                            </div>
                        </div>
                    )}} />
            </Switch>
        </div>
    )
};

export default RootComponent;