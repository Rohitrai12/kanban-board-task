import React from 'react';
import Card from './Card';
import { Task } from '../redux/tasksSlice';
import ModalForm from './ModalForm';
import { useDispatch } from 'react-redux';
import { moveTaskUp, moveTaskDown } from '../redux/tasksSlice';

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

interface ColumnProps {
  title: string;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDropTask, onEditTask, onDeleteTask }) => {
  const dispatch = useDispatch();

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('taskId');
    const status = title.toUpperCase().replace(' ', '_') as TaskStatus;
    onDropTask(taskId, status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMoveUp = (taskId: string) => {
    dispatch(moveTaskUp(taskId));
  };

  const handleMoveDown = (taskId: string) => {
    dispatch(moveTaskDown(taskId));
  };

  return (
    <div 
      className="w-1/3 bg-white p-4 rounded-lg shadow-md" 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card 
            key={task.id} 
            task={task} 
            onEdit={onEditTask} 
            onDelete={onDeleteTask}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        ))}
      </div>
      <ModalForm />
    </div>
  );
};

export default Column;
