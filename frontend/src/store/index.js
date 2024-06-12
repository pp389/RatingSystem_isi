import {createStore} from 'redux'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    versions: 1,
    storage
}



const reducer = (state = {username:"",userID:"", serverURL:"", token:""}, action) => {
    switch(action.type) {
        case "setServerURL":
            return {...state, serverURL: action.payload}
        case "setUserID":
            return {...state, userID: action.payload}
        case "setUsername":
            return {...state, username: action.payload}
        case "setToken":
            return {...state, token: action.payload}
        default:
            return state;
    }
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
export default store