import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { DatabaseProvider } from './context/DatabaseContext';
import AttendanceTracker from './AttendanceTracker';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DatabaseProvider>
            <AttendanceTracker />
        </DatabaseProvider>
    </React.StrictMode>,
)
