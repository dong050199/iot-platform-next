import { IUser } from '../../interfaces/userProfile';
import { SET_USER } from '../type';

export const setUserInfo = (user: IUser) => ({
	type: SET_USER,
	payload: {
		user,
	},
});
