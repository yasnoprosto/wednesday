import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export type AddTaskAC = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

type TasksActionsType =
    RemoveTaskAC
    | AddTaskAC
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC
    | AddTodolistActionType
    | RemoveTodolistActionType

    const initialState: TasksStateType = {
        ['todolistId1']: [
            {id: 'todolistId1', title: "HTML&CSS", isDone: true},
            {id: 'todolistId1', title: "JS", isDone: true}
        ],
        ['todolistId2']: [
            {id: 'todolistId2', title: "Milk", isDone: true},
            {id: 'todolistId2', title: "React Book", isDone: true}
        ]
    }

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        case "ADD-TASK":
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.newStatus
                } : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            };
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            };
        case "REMOVE-TODOLIST":
            const {[action.id]: [], ...rest} = state
            return rest
        default:
            return state
    }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId
    } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const;
};

export const changeTaskStatusAC = (taskId: string, newStatus: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        newStatus,
        todolistId
    } as const;
};

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        newTitle,
        todolistId
    } as const;
};
