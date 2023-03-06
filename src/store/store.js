import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import toDoReducer from "./slices/task";


export const store = configureStore({
  reducer: {
    user: userReducer,
    toDo: toDoReducer,
  },
});


