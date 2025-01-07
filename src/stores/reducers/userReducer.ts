// stores/reducers.ts or userSlice.ts  
import { createSlice, PayloadAction } from '@reduxjs/toolkit';  

interface User {  
    id: string;  
    email: string;  
    name: string;  
}  

interface UserSliceState {  
    user: User | null;  
}  

const initialState: UserSliceState = {  
    user: null,  
};  

const userSlice = createSlice({  
    name: 'user',  
    initialState,  
    reducers: {  
        setUser: (state, action: PayloadAction<User | null>) => {  
            state.user = action.payload; // Correctly assign user data  
        },  
        clearUser: (state) => {  
            state.user = null;  
        },  
    },  
});  

// Export actions and reducer  
export const { setUser, clearUser } = userSlice.actions;  
export default userSlice.reducer;