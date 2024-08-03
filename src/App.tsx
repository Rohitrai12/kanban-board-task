import React from 'react';
import Board from './components/Board';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ModalForm from './components/ModalForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="p-4">
        <Board />
        <ModalForm />
      </div>
    </Provider>
  );
};

export default App;
