import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const ModalForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');
  const [storyPoints, setStoryPoints] = useState(0);
  const [userAvatar, setUserAvatar] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addTask({ id: Date.now().toString(), title, description, status, storyPoints, userAvatar }));
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="mt-4 p-2 bg-blue-500 text-white rounded">+ Create issue</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full mb-2 p-2 border rounded" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full mb-2 p-2 border rounded"></textarea>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE')} className="block w-full mb-2 p-2 border rounded">
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <input type="number" placeholder="Story Points" value={storyPoints} onChange={(e) => setStoryPoints(Number(e.target.value))} className="block w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="User Avatar URL" value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} className="block w-full mb-2 p-2 border rounded" />
            <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Add Task</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
