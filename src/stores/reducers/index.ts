import { combineReducers } from 'redux';  
import userReducer from './userReducer'; // Ensure this import path is correct  

// Combine your reducers here  
const rootReducer = combineReducers({  
    user: userReducer,  
    // Add other reducers here  
});  

// Type for Root State  
export type RootState = ReturnType<typeof rootReducer>;  

export default rootReducer;