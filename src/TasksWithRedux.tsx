import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./TodolistWithRedux";

type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
};


export const TasksWithRedux = memo((props: TaskWithReduxPropsType) => {
    console.log("Tasks")

    const {task, todolistId} = props

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistId)), [dispatch, task.id, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))}, [dispatch, task.id, todolistId]);
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    },[dispatch, task.id, todolistId])

        return <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    });
