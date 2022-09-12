import {putEditUserReducer} from "../../slices/user/putEditUserSlice";
import {deleteUserReducer} from "../../slices/user/deleteUserSlice"
import {getUserReducer} from "../../slices/user/getUsersSlice"
import {postAddUserReducer} from "../../slices/user/postAddUserSlice"

export const userReducer = {
    deleteUser:deleteUserReducer,
    putEditUser:putEditUserReducer,
    postAddUser:postAddUserReducer,
    getUser:getUserReducer
};
                                                                                             