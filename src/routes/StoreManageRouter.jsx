import { createBrowserRouter } from 'react-router-dom';
import StoreManagementDashboard from './components/StoreManagementDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreManagementDashboard />,
  },
  {
    path: '/store-management',
    element: <StoreManagementDashboard />,
  },
]);

export default router;