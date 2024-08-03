import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  userAvatar: string;
  storyPoints: number;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: 'TODO' | 'IN_PROGRESS' | 'DONE' }>) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.status = status;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
    moveTaskUp: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      if (taskIndex > 0) {
        const [task] = state.tasks.splice(taskIndex, 1);
        state.tasks.splice(taskIndex - 1, 0, task);
      }
    },
    moveTaskDown: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      if (taskIndex < state.tasks.length - 1) {
        const [task] = state.tasks.splice(taskIndex, 1);
        state.tasks.splice(taskIndex + 1, 0, task);
      }
    }
  },
});

export const { addTask, updateTaskStatus, deleteTask, updateTask, moveTaskUp, moveTaskDown } = tasksSlice.actions;
export default tasksSlice.reducer;
export type { Task };
