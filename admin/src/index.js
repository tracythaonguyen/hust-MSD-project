import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
// import Detail from './Pages/Detail/Detail';
// import Lists from './Pages/Lists/Lists';
// import Login from './Pages/Login/Login';
// import PageNotFound from './Pages/NotFound';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <PageNotFound />,
//     },
//     {
//         path: '/login',
//         element: <Login />,
//         errorElement: <PageNotFound />,
//     },
//     {
//         path: 'users',
//         element: <Lists />,
//         errorElement: <PageNotFound />,
//     },
//     {
//         path: 'user/:userId',
//         element: <Detail />,
//         errorElement: <PageNotFound />,
//     },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

            <App />
    
    </React.StrictMode>
);

