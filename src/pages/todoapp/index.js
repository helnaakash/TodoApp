import { React, useState } from "react";

const Todos = () => {

  // const [items, setitems] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [updated, setupdated] = useState("");

  const [items, setitems] = useState([
    { id: 1, title: "Task 1", status: false },
    { id: 3, title: "Task 3", status: true },
    { id: 8, title: "Task 8", status: false },
  ]);
  const [newTask, setnewTask] = useState('')

  function formSubmit(event)
  {
    event.preventDefault();
  }

  function addTask() {

    if (!newTask) return;
     let num=items.length+1;
     let newArr={id:num,title:newTask,status:false}
     console.log(newArr)
     setitems([...items,newArr])
     setnewTask('');

  }

  function deleteTask(key) {
    setitems(items.filter((data) => data.id !== key));
  }

  function cancelBtn(id) {
    settoggle(!toggle);
  }

  function markDone(id){
    let newTask=items.map((task)=>{
      if(task.id === id)
      {
        return ({...task,status:!task.status})
      }
      return task;

    })
    // console.log(newTask)
    setitems(newTask);
  }


function cancelUpdate(){
  setupdated('')

}
function changeTask(e){
let newentry={
  id:updated.id,
  title:e.target.value,
  status:updated.status ? true: false
}
setupdated(newentry)

}
function updateTask(){
  let filterItem=[...items].filter(task=>
    task.id !== updated.id)
    let updatedItem=[...filterItem,updated]
    setitems(updatedItem)
    setupdated('');
}

  
  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={formSubmit} >
        <div className="mainContainer">
          <input
            type="text"
            onChange={(e) => setnewTask(e.target.value)}
            value={newTask}
            placeholder={
              items && items.length
                ? "Enter the items..."
                : "no tasks available"
            }
          />
          <button className="" type="submit" onClick={addTask}>
            {" "}
            <i className="fa-solid fa-plus mainContainer-icon" />{" "}
          </button>
        </div>

        <div className="mainContainer">
          <input
            type="text"
            onChange={(e) => changeTask(e)}
            value={updated && updated.title}
            placeholder=" "
          />
          <button className="" type="submit" 
          onClick={updateTask}
          >
            update
            {/* <i className="fa-solid fa-plus mainContainer-icon" />{" "} */}
          </button>
          <button className="" type="submit"
           onClick={cancelUpdate}
           >
            cancel
          </button>
        </div>

      </form>

      {items &&items
      .sort((a,b)=>a.id >b.id ?1 :-1)
          .map((val, index) => {
            return (
              <div key={val.id}>
                <ul>
                  <li>
                    <div className="mainContainer">
                        <div  className={val.status ? ' done':''}>
                        <span className="taskNumber">{index+1}</span>
                        <span >{val.title} </span>
                       
                      </div>
                      
                      <div className="subContainer">
                        <span title="completed /not completed"> 
                        <i className="fa-solid fa-square-check icon-3"
                    onClick={(e) => markDone(val.id)}
                  />
                  </span>

                    {val.status ? null: (
                      <div>
                          <i
                        className="far fa-edit icon-1"
                        onClick={() => setupdated({
                          id:val.id,title:val.title,
                          status:val.status
                        })}
                      />
                        </div>
          
                      
                    )}  
              
                  <i
                    className="fas fa-trash-alt icon-2"
                    onClick={() => deleteTask(val.id)}
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
