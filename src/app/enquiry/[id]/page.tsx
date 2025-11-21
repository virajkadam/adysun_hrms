"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/config";
import { formatDateToDayMonYear } from "@/utils/documentUtils";
import DashboardLayout from '@/components/layout/DashboardLayout';
import TableHeader from '@/components/ui/TableHeader';

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

export default function EnquiryViewPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
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
        { label: 'Enquiries', href: '/dashboard/enquiries' },
        { label: enquiry?.name || 'Anonymous', isCurrent: true },
      ]}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TableHeader
          title="Enquiry Details"
          backButton={{ onClick: () => router.back(), label: 'Back' }}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-gray-900">{enquiry.name || 'Anonymous'}</div>
                  <div className="text-xs text-gray-500 mt-2">Name</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.mobile || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">Mobile</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.pan || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">PAN Number</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.passoutYear || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">Passout Year</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.technology || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">Technology</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.role || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">Role</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">{enquiry.totalWorkExperience || '-'}</div>
                  <div className="text-xs text-gray-500 mt-2">Total Work Experience</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-900">
                    {enquiry.createdAt
                      ? formatDateToDayMonYear(
                          typeof enquiry.createdAt === "string"
                            ? enquiry.createdAt
                            : new Date(enquiry.createdAt.seconds * 1000)
                        )
                      : "-"}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Submitted On</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-base text-gray-900 whitespace-pre-line">
                  {enquiry.message}
                </div>
                        <div className="text-xs text-gray-500 mt-2">Message</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
} 