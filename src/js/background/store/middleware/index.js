import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { alias } from 'react-chrome-redux';
import aliases from './aliases';

const middleware = applyMiddleware(
    alias(aliases),
    thunkMiddleware
);

export default middleware;
