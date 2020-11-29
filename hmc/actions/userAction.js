import { ADD_USER, EDIT_USER } from './types';

export const addUser = (user) => ({
    type: ADD_USER,
    user: user,
});

export const editUser = (user) => ({
    type: EDIT_USER,
    user: user,
});