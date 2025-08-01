import { ReactNode } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import Header from './Header';
import SimpleBreadcrumb from '../ui/SimpleBreadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface EmployeeLayoutProps {
  children: ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  showBreadcrumb?: boolean;
}

const EmployeeLayout = ({ 
  children, 
  breadcrumbItems = [],
  showBreadcrumb = true 
}: EmployeeLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeSidebar />
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

export default EmployeeLayout; 