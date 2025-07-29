import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DynamicBreadcrumb from '../ui/DynamicBreadcrumb';

interface DashboardLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

const DashboardLayout = ({ children, showBreadcrumb = true }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6">
          <DynamicBreadcrumb show={showBreadcrumb} className="mb-4" />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 