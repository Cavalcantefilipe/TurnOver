import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Stock from '../pages/Stock';
import NotFound from '../pages/404';


export function Routes(){
    return(
        <Switch>
            <Route path="/" exact  component={Stock} />
            <Route path="/create" component={Home} />
            <Route  component={NotFound} />

        </Switch>
    )
} 