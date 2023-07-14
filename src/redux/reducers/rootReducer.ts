import { combineReducers } from 'redux';
import ProfilesReducer from './user';

const rootReducer = combineReducers({
	profiles: ProfilesReducer,
});

export default rootReducer;
