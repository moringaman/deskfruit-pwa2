import React from 'react';
import { TodosPage, DeskPage, HomePage, AuthPage, ProfilePage } from './pages'
import { ConfigCatProvider } from "configcat-react"
import Layout from './components/Layout'
import { store } from './app/store';
import { Provider } from 'react-redux';


import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  // const logger = configcat.createConsoleLogger(3); 


  return (
    <div id="container" className="flex flex-col">
      <ConfigCatProvider sdkKey="3bjaCGNG2k6K57N_TxanTw/6-EeL5ikRUyVKddosnxmgQ">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/desk" element={<DeskPage />} />
                <Route path="/auth/:scanned" element={<AuthPage />} />

                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ConfigCatProvider>
    </div>
  );
}

export default App;
