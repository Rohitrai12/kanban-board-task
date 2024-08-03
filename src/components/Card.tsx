
import React from 'react';
import { Task } from '../redux/tasksSlice';

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMoveUp: (taskId: string) => void;
  onMoveDown: (taskId: string) => void;
}

const Card: React.FC<CardProps> = ({ task, onEdit, onDelete, onMoveUp, onMoveDown }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div 
      className="bg-white p-4 shadow-md rounded-lg border-l-4 border-blue-500 relative" 
      draggable 
      onDragStart={handleDragStart}
    >
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="flex items-center mt-2">
        <img src={task.userAvatar} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
        <span className="text-gray-600">{task.storyPoints}</span>
      </div>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button 
          className="text-blue-500 hover:text-blue-700" 
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button 
          className="text-red-500 hover:text-red-700" 
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button 
          className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full" 
          onClick={() => onMoveUp(task.id)}
        >
          ↑
        </button>
        <button 
          className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full" 
          onClick={() => onMoveDown(task.id)}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default Card;
