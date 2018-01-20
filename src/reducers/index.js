import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer //form is strict mapping
});

export default rootReducer;
