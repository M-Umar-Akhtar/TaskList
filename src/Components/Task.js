import { useState } from 'react'
import { Circle } from 'rc-progress';
import '../Assets/css/task.css'

export default function Task({ name, priority, setRemove, position, setEdit, setDisplay}) {
    const [percentage, setPercentage] = useState(0);
    const status = ["To Do", "In Progress", "Done"];
    const colors = {
        Low: "#0ac947",
        Medium: "#ffbd21",
        High: "#ff5061"
    }
    return (
        <div className="task" key={position}>
            <div className="task-div flex">
                <p className="label">Task</p>
                <p className="name">{name}</p>
            </div>
            <div className="priority-div flex">
                <p className="label">Priority</p>
                <p className="priority" style={{ color: colors[priority] }}>{priority}</p>
            </div>
            <div className="status-div">
                <button className='status-btn' onClick={() => { setPercentage((percentage + 50) % 150) }}>{status[percentage/50]}</button>
            </div>
            <div className="loadbar-div flex">
                <Circle percent={percentage} strokeWidth="9" strokeColor="#865ff5" trailWidth="9" trailColor='#e5e6e9' style={{width: "30px", height: "30px"}}/>
            </div>
            <div className="edit-div">
                <i class="fas fa-file-pen" style={{marginRight: "30px",color: "rgb(177, 177, 177)",backgroundColor:"rgb(68, 68, 68)"}} onClick={()=>{setEdit(position);setDisplay(true)}}></i>
                <i class="fas fa-trash-alt" style={{color: "#ff5061",backgroundColor:"rgb(68, 68, 68)"}} onClick={()=>{setRemove(position)}}></i>
            </div>
        </div>
    );
}