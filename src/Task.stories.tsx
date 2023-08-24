import type {Meta, StoryObj} from "@storybook/react";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./TodolistWithRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: "TODOLISTS/AppWithRedux",
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

const TasksWithRedux = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0]);

    if(!task) task = {id: "11", title: "Task", isDone: false}


    return <Task task={task} todolistId={"todolistId1"}/>;
};


// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskStory: Story = {
    render: () => <TasksWithRedux/>
};
