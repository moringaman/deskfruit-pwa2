import React from 'react';
import {TodosPage, DeskPage, HomePage } from './pages'
import { store } from './app/store';
import { Provider } from 'react-redux';


import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todos" element={<TodosPage />} />
        <Route path="/desk" element={<DeskPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
