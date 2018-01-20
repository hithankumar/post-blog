import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostNew from './components/post_new';
import PostShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>       
        <Route path="/posts/new" component={PostNew}/>
        <Route path="/posts/:id" component={PostShow}/>
        <Route exact path="/" component={PostsIndex}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
