import React, { useState, useEffect } from "react"

const ToDoList = () => {
    //lazy initialization, load from saved local storage when initialize
    //prevents unnecessary re-render
    const [ tasks, setTasks ] = useState(()=>{
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    //save tasks on to local storage whenever tasks change
    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // text box
    function handleInputChange(event) {
        //changes text box to reflect input
        setNewTask(event.target.value);
    }
    function addTask() {
        if(newTask.trim()!==""){
            //updater function, previous state tasks is t
            setTasks(t => [...t, newTask]);
            //reset val
            setNewTask("");
        }
    }
    function deleteTask(index) {
        //filter out chosen deleted task
        const updatedTasks = tasks.filter((_, i)=> i !== index)
        setTasks(updatedTasks);

    }

    function moveTaskUp(index) {
        if(index > 0){
            const updatedTasks = [...tasks];
            //array destructuring to swapt positions
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index) {
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            //array destructuring to swapt positions
            [updatedTasks[index], updatedTasks[index+1]] = 
            [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    return (<div className="to-do-list">

        <h1>To-Do-List</h1>
        <div>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}
            />
            <button
                className="add-button"
                onClick={addTask}>
                New Task
            </button>
        </div>
        <ol>
            {tasks.map((task, index)=>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button 
                        className="delete-button"
                        // arrow function prevents immediate call of function
                        onClick={()=>deleteTask(index)}>
                        Delete
                    </button>
                    <button 
                        className="priority-button"
                        // arrow function prevents immediate call of function
                        onClick={()=>moveTaskUp(index)}>
                        Higher priority
                    </button>
                    <button 
                        className="priority-button"
                        // arrow function prevents immediate call of function
                        onClick={()=>moveTaskDown(index)}>
                        Lower priority
                    </button>
                </li>
            )}
        </ol>

    </div>);
}

export default ToDoList