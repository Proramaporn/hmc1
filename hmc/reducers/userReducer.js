import { ADD_USER, EDIT_USER } from '../actions/types';

const initialState = {
    user: {},
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_USER:
            return{
                ...state,
                user: action.user,
            };
        case EDIT_USER:
            return{
                ...state,
                user: action.user,
            };
        default:
            return state;
    }   
};

export default userReducer;