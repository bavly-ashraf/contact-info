import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/error/error.jsx';
import ContactListPage from './pages/contact-list/contactList.jsx';
import ContactInfoPage from './pages/contact-info/contactInfo.jsx';
import ContactActionsPage from './pages/contact-actions/contactActions.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import ContactEditPage from './pages/contact-edit/contactEdit.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path:'contact-list',
    element: <ContactListPage />
  },
  {
    path: 'contact-info/:id',
    element: <ContactInfoPage />
  },
  {
    path: 'contact-actions',
    element: <ContactActionsPage />
  },
  {
    path: 'contact/:id',
    element: <ContactEditPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
