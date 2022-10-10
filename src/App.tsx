import React from 'react';
import {TodosPage, DeskPage, HomePage } from './pages'
import  Layout  from './components/Layout'
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
<div id="container" className="flex flex-col">
   <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/desk" element={<DeskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
</div>
  );
}

export default App;
