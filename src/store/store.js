import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../reduxtoolkit/employeeSlice';
import projectReducer from '../reduxtoolkit/projectSlice'
import isadminReducer from '../reduxtoolkit/isadminSlice'

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
        project: projectReducer,
        isadmin: isadminReducer
    },
});
