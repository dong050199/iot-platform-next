import moment from "moment";
import { IUser } from "../../interfaces/userProfile";
import { SET_USER } from "../type";
import { Console } from "console";

interface IUserReducer {
  user: IUser;
}

const ProfilesReducer = (
  userInfo: IUserReducer = {
    user: {
      email: '',
      numberEmail: 0,
      notification: 0,
      name: ''
    },
  },
  { type, payload }: { type: any; payload: any }
) => {
  switch (type) {
    case SET_USER:
      if (payload.user === false) {
        return false;
      }
      return {
        ...userInfo,
        user: payload.user,
      };
    default:
      return userInfo;
  }
};

export default ProfilesReducer;
