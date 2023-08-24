import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`);
    },
    createTodolist() {
        return instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title: "What to think about"});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    }
};

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type ResponseType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType>(`todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{items: TaskType[]}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title});
    }
};


type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTaskType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}
