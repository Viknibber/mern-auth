import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './src/App';
import { AuthProvider } from './src/context/AuthContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/*' element={<App />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);
