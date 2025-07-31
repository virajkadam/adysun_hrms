import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SimpleBreadcrumb from '../ui/SimpleBreadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  showBreadcrumb?: boolean;
}

const DashboardLayout = ({ 
  children, 
  breadcrumbItems = [],
  showBreadcrumb = true 
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6">
          {showBreadcrumb && breadcrumbItems.length > 0 && (
            <SimpleBreadcrumb items={breadcrumbItems} className="mb-4" />
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 