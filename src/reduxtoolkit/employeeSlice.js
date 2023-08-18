import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: [],
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload;
            const index = state.employees.findIndex(employee => employee._id === updatedEmployee._id);
            if (index !== -1) {
                state.employees[index] = updatedEmployee;
            }
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(employee => employee._id !== action.payload);
        },
    },
});

export const { setEmployees, deleteEmployee, updateEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
