import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';
import RecoverUsernamePage from './pages/RecoverUsernamePage';
import RecoverSubmitPage from './pages/RecoverSubmitPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                     <Route path="/recover-username" element={<RecoverUsernamePage />} />
                    <Route path="/recover-submit/:username" element={<RecoverSubmitPage />} />

                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/" element={<TasksPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;