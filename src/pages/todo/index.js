import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToDo,
  deleteToDo,
  editTodo,
  // taskSuccess,
  // taskStart,
} from "../../store/slices/task";
import axios from "axios";
import {todoTask} from "../../store/slices/task";

const Todos = (props) => {
  const { todoList1, errors } = useSelector((state) => state.toDo);
  const dispatch = useDispatch();
  const [newTask, setnewTask] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isId, setId] = useState("");
  const [isTitle, setTitle] = useState("");

  useEffect( () =>  {
    dispatch(todoTask());

  }, []);



  function addTask() {
    dispatch(addToDo({ newContent: newTask }));
    setnewTask("");
  }

  function formSubmit(event) {
    event.preventDefault();
  }

  const handleChange = (e) => {
    setnewTask(e.target.value);
  };
  function deleteTodo() {
    dispatch(deleteToDo({ newContent: newTask }));
  }

  function edit(id, title) {
    // alert(title)
    setId(id);
    setTitle(title);
    // console.log("title"+title)
    setEditing(true);
  }
  function updateTask() {
    dispatch(editTodo({ newContent: isTitle, id: isId }));
    setTitle("");
    setEditing(false);
  }
  function changeTask(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={formSubmit}>
        <div className="mainContainer">
          <input
            type="text"
            onChange={(e) => (!isEditing ? handleChange(e) : changeTask(e))}
            //  onChange={(e) => setnewTask(e.target.value)}
            value={!isEditing ? newTask : isTitle}
            placeholder="Please enter an item"
          />
          <button
            className=""
            type="submit"
            onClick={!isEditing ? addTask : updateTask}
          >
            {!isEditing ? (
              <i className="fa-solid fa-plus mainContainer-icon" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>

      {todoList1.map((value, index) => {
        // console.log(value)
        return (
          <div key={value.id}>
            <ul>
              <li>
                <div className="mainContainer">
                  <div>
                    <span className="taskNumber">{index + 1}</span>
                    <span>{value.title}</span>
                  </div>

                  <div className="subContainer">
                    <span title="completed /not completed"></span>

                    <div>
                      <i
                        className="far fa-edit icon-1"
                        onClick={(e) => edit(value.id, value.title)}
                      />
                    </div>

                    <i
                      className="fas fa-trash-alt icon-2"
                      onClick={() => dispatch(deleteToDo(value.id))}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
