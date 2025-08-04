"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";
import { formatDateToDayMonYear } from "@/utils/documentUtils";

interface Enquiry {
  id: string;
  name?: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number } | string;
}

export default function EnquiryListPage() {
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

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Anonymous Enquiries</h1>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="text-gray-500">No enquiries found.</div>
          ) : (
            enquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white shadow rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    {enquiry.name ? enquiry.name : "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-400">
                    {enquiry.createdAt
                      ? formatDateToDayMonYear(
                          typeof enquiry.createdAt === "string"
                            ? enquiry.createdAt
                            : new Date(
                                enquiry.createdAt.seconds * 1000
                              )
                        )
                      : "-"}
                  </span>
                </div>
                <div className="text-gray-800 whitespace-pre-line">{enquiry.message}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
