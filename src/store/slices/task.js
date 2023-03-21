import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const todoTask = createAsyncThunk(
  "user/taskAdd",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(taskStart());
    const newArrId = [];
    axios
      .get("https://63fee817571200b7b7d1cfda.mockapi.io/todoList1")
      .then((res) => {
        for (let i = 0; i <= res.data.length; i++) {
          if (res.data[i]) {
            newArrId.push(res.data[i]);
          }
        }
        dispatch(taskSuccess(newArrId));
        return newArrId;
      })
      .catch((error) => dispatch(taskFail(error.message)));
  }
);

export const toDoSlider = createSlice({
  name: "toDo",
  initialState: {
    todoList1: [],
    loading: false,
    errors: "",
  },

  reducers: {
    taskStart: (state) => {
      state.loading = true;
    },
    taskSuccess: (state, action) => {
      state.loading = false;
      state.todoList1 = action.payload;
    },
    taskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToDo: (state, action) => {
      state.todoList1.push(action.payload.newContent);
    },
    deleteToDo: (state, action) => {
      let { todoList1 } = state;
      state.todoList1 = todoList1.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      let newTodoList = {
        id: Math.random(),
        title: action.payload.newContent,
        status: false,
      };
      let { todoList1 } = state;
      state.todoList1 = todoList1.map((item) =>
        item.id === action.payload.id ? newTodoList : item
      );
    },
  },
});

export const {
  addToDo,
  deleteToDo,
  editTodo,
  taskStart,
  taskFail,
  taskSuccess,
} = toDoSlider.actions;

export default toDoSlider.reducer;
