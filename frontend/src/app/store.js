import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";


// guarda el estado global de sesion
export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
