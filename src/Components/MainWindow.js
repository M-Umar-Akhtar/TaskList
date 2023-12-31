import Task from './Task';
import { useState, useEffect } from 'react';
import '../Assets/css/mainwindow.css'
import '../Assets/css/inputwindow.css'


export default function MainWindow() {
    const [showDisplay, setDisplay] = useState(false);
    const [tasksList, setTaskList] = useState([])
    const [currentPosition, setPosition] = useState(0);
    const [remove, setRemove] = useState(-1);
    const [edit, setEdit] = useState(-1);
    const [modeOfOperation, setMode] = useState('Add');

    useEffect(() => { setPosition(tasksList.length); }, [tasksList]);
    useEffect(() => { setTaskList(prevArray => prevArray.filter((item) => item.position !== remove)); setRemove(-1) }, [remove])
    useEffect(() => { setMode('Edit') }, [edit]);

    function InputWindow() {
        const [task, setTask] = useState({
            name: "",
            priority: "Low",
            position: modeOfOperation === 'Add' ? currentPosition : edit
        })
        const [activeButton, setActive] = useState(2);

        const [buttonsRecord, setButtons] = useState(["high", "medium", "low lowActive"]);
        function handleChange(event) {
            event.preventDefault();
            const { name, value } = event.target;
            setTask((prev) => { return { ...prev, [name]: value } })
        }

        function updateButtons(index, className, value) {
            setTask((prev) => { return { ...prev, ["priority"]: value } })
            setButtons((prev) => {
                const temp = [...prev];
                temp[activeButton] = temp[activeButton].split(' ')[0];
                temp[index] = temp[index] + className;
                return temp;
            })
            setActive(index);
        }

        function add_editTask(event) {
            event.preventDefault();
            console.log("Adding")
            modeOfOperation === 'Add' ? (
                setTaskList(prevList => [...prevList, task])
            ) : (
                setTaskList((prevArray) => {
                    let newArray = [...prevArray];
                    let index = newArray.findIndex((item) => item.position === edit);
                    newArray[index] = task;
                    return newArray;
                })
            )
            setDisplay(false)
        }

        return (
            <div className={"transparent-container " + (showDisplay ? "show" : "hidden")} >
                <div className="form-container">
                    <div className='subheading-container'>
                        <h2 style={{ color: "white" }}>{modeOfOperation} Task</h2>
                        <button className="close-button" onClick={() => setDisplay(false)}><i class="fas fa-times"></i></button>
                    </div>
                    <form onSubmit={add_editTask}>
                        <div className='inputs-container'>
                            <label htmlFor="name">
                                <p>Task</p>
                                <input type="text" name="name" placeholder="Type your task here..." onChange={handleChange} required />
                            </label>
                            <label>
                                <p>Priority</p>
                                <div className='priority-container'>
                                    <a className={buttonsRecord[0]} onClick={() => { updateButtons(0, " highActive", "High") }}>High</a>
                                    <a className={buttonsRecord[1]} onClick={() => { updateButtons(1, " mediumActive", "Medium") }}>Medium</a>
                                    <a className={buttonsRecord[2]} onClick={() => { updateButtons(2, " lowActive", "Low") }}>Low</a>
                                </div>
                            </label>
                        </div>
                        <div className='add-button-container'>
                            <button type="submit" className='add-button'>{modeOfOperation}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


    return (
        <>
            <InputWindow />
            <div className="main-container">
                <div className="heading-container">
                    <h1><strong>Task List</strong></h1>
                    <button className="add-task-button" onClick={() => { setDisplay(true); setMode('Add') }}><i class="fas fa-plus" style={{ marginRight: "10px" }}></i> Add Task</button>
                </div>
                <div className="tasks-container">
                    {tasksList.length > 0 ? (tasksList.map((task) => {
                        return <Task name={task.name} priority={task.priority} setRemove={setRemove} position={task.position} setEdit={setEdit} setDisplay={setDisplay} />
                    })) : (<h2 style={{ color: "white" }}>No tasks to display</h2>)}
                </div>
            </div>
        </>
    );
}



