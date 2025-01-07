// store.ts  
import { configureStore } from '@reduxjs/toolkit';  
import userReducer from '@/stores/reducers/userReducer'; // Your user reducer path  

const store = configureStore({  
    reducer: {  
        user: userReducer,  
    },  
});  

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;  

