import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { autor_Reducer } from "./autor_Reducer";
import { libro_Reducer } from "./libro_Reducer"

//Combinación de reduce para, poder acceder ellos de una menera mas facil
export const rootReducer = combineReducers({
    auth: authReducer,
    autor: autor_Reducer,
    libro: libro_Reducer
});