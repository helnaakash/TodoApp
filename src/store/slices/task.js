import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateSchema } from "yup";

export const todoTask = () => (dispatch) => {
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
      // console.log(newArrId);
      return newArrId;
    })
    .catch((error) => dispatch(taskFail(error.message)));
};

export const toDoSlider = createSlice({
  name: "toDo",
  initialState: {
    todoList1: [
      { id: 1, title: "Task 1", status: false },
      { id: 3, title: "Task 3", status: true },
      { id: 8, title: "Task 8", status: false },
    ],
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
      // console.log("success" + JSON.stringify(state));
    },
    taskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("fail"+action.payload);
    },
    addToDo: (state, action) => {
      // console.log("action" + JSON.stringify(action));
      if (!action.payload.newContent) return;
      let newTodoList = {
        id: Math.random(),
        title: action.payload.newContent,
        status: false,
      };
      state.todoList1.push(newTodoList);
      // console.log(newTodoList);
    },
    deleteToDo: (state, action) => {
      let { todoList1 } = state;
      state.todoList1 = todoList1.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      //  console.log("action" + JSON.stringify( action.payload.newContent));
      //  console.log("paylod" + JSON.stringify( action.payload.id));
      let newTodoList = {
        id: Math.random(),
        title: action.payload.newContent,
        status: false,
      };
      let { todoList1 } = state;
      state.todoList1 = todoList1.map((item) =>
        item.id === action.payload.id ? newTodoList : item
      );

      //  console.log(todoList1)
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
