import React, { useState } from 'react';
import Column from './Column';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateTaskStatus, deleteTask, Task, updateTask } from '../redux/tasksSlice';
import EditTaskModal from './EditTaskModal';

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="flex space-x-4 p-4 bg-gray-100 h-screen">
      <Column 
        title="TO DO" 
        tasks={tasks.filter(task => task.status === 'TODO')} 
        onDropTask={handleDropTask} 
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Column 
        title="IN PROGRESS" 
        tasks={tasks.filter(task => task.status === 'IN_PROGRESS')} 
        onDropTask={handleDropTask} 
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Column 
        title="DONE" 
        tasks={tasks.filter(task => task.status === 'DONE')} 
        onDropTask={handleDropTask} 
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      {isEditModalOpen && taskToEdit && (
        <EditTaskModal 
          task={taskToEdit} 
          onUpdateTask={handleUpdateTask} 
          onClose={closeEditModal} 
        />
      )}
    </div>
  );
};

export default Board;
