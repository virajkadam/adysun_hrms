"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";
import { formatDateToDayMonYear } from "@/utils/documentUtils";
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Enquiry {
  id: string;
  name?: string;
  mobile?: string;
  pan?: string;
  passoutYear?: string;
  technology?: string;
  role?: string;
  totalWorkExperience?: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number } | string;
}

export default function EnquiryListPage() {
  const { currentAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data: Enquiry[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Enquiry[];
        setEnquiries(data);
      } catch (err: any) {
        setError("Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-gray-500">Checking permissions...</div>
      </DashboardLayout>
    );
  }

  if (!currentAdmin) {
    if (typeof window !== 'undefined') {
      router.replace('/login');
    }
    return null;
  }

  return (
    <DashboardLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Enquiries', isCurrent: true },
      ]}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Enquiries"
          backButton={{ href: '/dashboard' }}
          showStats={false}
          showSearch={false}
          showFilter={false}
          headerClassName="px-6 pt-6 mb-0"
          searchValue=""
          onSearchChange={() => {}}
        />
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {enquiry.name || "Anonymous"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.mobile || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.technology || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.role || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.totalWorkExperience || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.createdAt
                          ? formatDateToDayMonYear(
                              typeof enquiry.createdAt === "string"
                                ? enquiry.createdAt
                                : new Date(
                                    enquiry.createdAt.seconds * 1000
                                  )
                            )
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-3">
                        <ActionButton
                          icon={<FiEye className="w-5 h-5" />}
                          title="View Enquiry Details"
                          colorClass="bg-blue-100 text-blue-600 hover:text-blue-900"
                          href={`/enquiry/${enquiry.id}`}
                        />
                        <ActionButton
                          icon={<FiTrash2 className="w-5 h-5" />}
                          title="Delete"
                          colorClass="bg-red-100 text-red-600 hover:text-red-900"
                          onClick={() => {
                            // TODO: Implement delete functionality
                            console.log('Delete enquiry:', enquiry.id);
                          }}
                          as="button"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
