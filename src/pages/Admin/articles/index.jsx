import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ArticleList from './list'
import UpdateArticles from './update-articles'
import AddArticles from './add-articles'
import Details from './detail'

export default class Articles extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/articles" component={ArticleList}></Route>
                <Route path="/articles/add" component={AddArticles}></Route>
                <Route path="/articles/update" component={UpdateArticles}></Route>
                <Route path='/articles/detail' component={Details}></Route>
                <Redirect to="/articles" />
            </Switch>
        )
    }
}