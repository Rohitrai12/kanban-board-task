import React, { useState } from 'react';
import { Task } from '../redux/tasksSlice';

interface EditTaskModalProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onUpdateTask, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [storyPoints, setStoryPoints] = useState(task.storyPoints);

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      storyPoints
    };
    onUpdateTask(updatedTask);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <label className="block mb-2">
          Title:
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded mt-1" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea 
            className="w-full p-2 border border-gray-300 rounded mt-1" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </label>
        <label className="block mb-2">
          Story Points:
          <input 
            type="number" 
            className="w-full p-2 border border-gray-300 rounded mt-1" 
            value={storyPoints} 
            onChange={(e) => setStoryPoints(Number(e.target.value))} 
          />
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={handleUpdate}
          >
            Update
          </button>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
