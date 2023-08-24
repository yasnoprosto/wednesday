import React, {useEffect, useState} from "react";
import {tasksAPI, todolistAPI} from "../api/api";

export default {
    title: "API"
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "29e60e7b-78e5-41c9-9654-5a5008e2bb5b"
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "29e60e7b-78e5-41c9-9654-5a5008e2bb5b"
        const title = "Buy Avocado"
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            });
    }, [])

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "29e60e7b-78e5-41c9-9654-5a5008e2bb5b"
        const tasksId = "31b5ff10-5013-4d11-8b60-0f52b1d13815"
        tasksAPI.deleteTask(todolistId, tasksId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "29e60e7b-78e5-41c9-9654-5a5008e2bb5b"
        const tasksId = "8d60a7d8-c4b7-458a-99d1-ee2121a11629"
        const title = "Buy Peppers"
        tasksAPI.updateTaskTitle(todolistId, tasksId, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

