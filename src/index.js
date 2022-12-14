import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
            <ToastContainer />
        </React.StrictMode>
    </BrowserRouter>
);
