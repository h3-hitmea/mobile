import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userState {
	user: any;
}

const initialState: userState = {
	user: {},
};

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, payload) => {
			console.log(payload);
			state.user = payload.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
