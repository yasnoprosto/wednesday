import React, {memo, useCallback, useMemo} from "react";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = memo((props: PropsType) => {
    console.log("Todolist");
    const todolist = useSelector<AppRootStateType, TodolistType>(
        state => state.todolists.find(t => t.id === props.todolist.id) as TodolistType)

    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        const action = addTaskAC(title, id);
        dispatch(action)
    }, [dispatch, id])
    const removeTodolist = useCallback(() => {
        const action = removeTodolistAC(id);
        dispatch(action)
    } , [dispatch, id])
    const changeTodolistTitle = useCallback((title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action)
    } , [dispatch, id])
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("all", id)) , [dispatch, id])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("active", id)) , [dispatch, id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("completed", id)) , [dispatch, id])




    const memoMappedTasks = useMemo(() =>  {
        if (filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks.map((t, i) => {
            return (
                <Task key={t.id} task={t} todolistId={id}/>
            )
        })
    }, [tasks, id, filter])





    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                memoMappedTasks
            }
        </div>
        <div>
            <ButtonWithMemo variant={filter === 'all' ? "outlined" : 'text'} onClick={onAllClickHandler} color={"inherit"} text={"All"}/>
            <ButtonWithMemo variant={filter === 'active' ? "outlined" : 'text'} onClick={onActiveClickHandler} color={"primary"} text={"Active"}/>
            <ButtonWithMemo variant={filter === 'completed' ? "outlined" : 'text'} onClick={onCompletedClickHandler} color={"secondary"} text={"Completed"}/>
        </div>
    </div>
});

type ButtonPropsType = {
    variant: "text" | "outlined" | "contained"
    onClick: () => void
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    text: string
}

const ButtonWithMemo = memo((props: ButtonPropsType) => {
    console.log("Button");
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.text}
    </Button>
})


