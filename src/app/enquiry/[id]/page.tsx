"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { formatDateToDayMonYear } from "@/utils/documentUtils";
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';

interface Enquiry {
  id: string;
  name?: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number } | string;
}

export default function EnquiryViewPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getDoc(doc(db, "enquiries", id))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setEnquiry({ id: docSnap.id, ...docSnap.data() } as Enquiry);
        } else {
          setError("Enquiry not found");
        }
      })
      .catch(() => setError("Failed to load enquiry"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DashboardLayout
      breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Enquiries', href: '/enquiry' },
        { label: enquiry?.name || 'Anonymous', isCurrent: true },
      ]}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Enquiry Details"
          backButton={{ href: '/enquiry' }}
          showStats={false}
          showSearch={false}
          showFilter={false}
          headerClassName="px-6 pt-6 mb-0"
          searchValue=""
          onSearchChange={() => {}}
        />
        <div className="px-6 pb-6">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : enquiry ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Name</div>
                <div className="text-lg font-semibold text-gray-900">{enquiry.name || 'Anonymous'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Message</div>
                <div className="text-base text-gray-800 whitespace-pre-line bg-gray-50 rounded p-3 border border-gray-100">
                  {enquiry.message}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Submitted On</div>
                <div className="text-sm text-gray-700">
                  {enquiry.createdAt
                    ? formatDateToDayMonYear(
                        typeof enquiry.createdAt === "string"
                          ? enquiry.createdAt
                          : new Date(enquiry.createdAt.seconds * 1000)
                      )
                    : "-"}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
} 