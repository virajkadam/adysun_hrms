'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMapPin, FiSave, FiX } from 'react-icons/fi';
import EmployeeLayout from '@/components/layout/EmployeeLayout';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { updateUserProfile, validateProfileData } from '@/utils/profileUtils';
import { updateEmployeeSelf, getEmployeeSelf } from '@/utils/firebaseUtils';
import TableHeader from '@/components/ui/TableHeader';

export default function EditEmployeeProfilePage() {
    const { currentUserData, currentEmployee } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        currentAddress: '',
        permanentAddress: '',
        dateOfBirth: '',
        homeTown: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Redirect if not authenticated or not an employee
    useEffect(() => {
        if (!currentUserData || currentUserData.userType !== 'employee') {
            router.push('/login');
        }
    }, [currentUserData, router]);

    // Initialize form data
    useEffect(() => {
        if (currentEmployee) {
            const emp = currentEmployee as any;
            const currentAddr = emp.currentAddress || '';
            const permanentAddr = emp.permanentAddress || '';
            const addressesMatch = currentAddr && currentAddr === permanentAddr;

            setFormData({
                name: currentEmployee.name || '',
                email: currentEmployee.email || '',
                phone: currentEmployee.phone || '',
                currentAddress: currentAddr,
                permanentAddress: permanentAddr,
                dateOfBirth: emp.dateOfBirth || '',
                homeTown: emp.homeTown || ''
            });
            setSameAsCurrentAddress(addressesMatch);
        }
    }, [currentEmployee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            // If current address changes and checkbox is checked, update permanent address too
            if (name === 'currentAddress' && sameAsCurrentAddress) {
                updated.permanentAddress = value;
            }
            return updated;
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSameAsCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setSameAsCurrentAddress(checked);
        if (checked) {
            // Copy current address to permanent address
            setFormData(prev => ({
                ...prev,
                permanentAddress: prev.currentAddress
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUserData || !currentEmployee) return;

        // Validate basic profile data
        const validation = validateProfileData({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare update data
            const updateData: any = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim()
            };

            // Add additional fields if provided
            if (formData.currentAddress) updateData.currentAddress = formData.currentAddress.trim();
            if (formData.permanentAddress) updateData.permanentAddress = formData.permanentAddress.trim();
            if (formData.dateOfBirth) updateData.dateOfBirth = formData.dateOfBirth;
            if (formData.homeTown) updateData.homeTown = formData.homeTown.trim();

            // Update basic profile (name, email, phone) using updateUserProfile
            await updateUserProfile(currentUserData.id, {
                name: updateData.name,
                email: updateData.email,
                phone: updateData.phone
            }, 'employee');

            // Update additional fields using updateEmployeeSelf (for employee self-service)
            const additionalData: any = {};
            if (updateData.currentAddress !== undefined) additionalData.currentAddress = updateData.currentAddress;
            if (updateData.permanentAddress !== undefined) additionalData.permanentAddress = updateData.permanentAddress;
            if (updateData.dateOfBirth) additionalData.dateOfBirth = updateData.dateOfBirth;
            if (updateData.homeTown) additionalData.homeTown = updateData.homeTown;

            if (Object.keys(additionalData).length > 0) {
                await updateEmployeeSelf(currentUserData.id, additionalData);
            }

            // Fetch updated employee data from Firebase
            const updatedEmployeeData = await getEmployeeSelf(currentUserData.id);

            // Update localStorage with fresh data from Firebase
            const storedData = localStorage.getItem('employeeData');
            if (storedData) {
                const userData = JSON.parse(storedData);
                const mergedData = {
                    ...userData,
                    ...updatedEmployeeData,
                    name: updateData.name,
                    email: updateData.email,
                    phone: updateData.phone
                };
                localStorage.setItem('employeeData', JSON.stringify(mergedData));
            }

            // Update fullEmployeeData in localStorage if it exists
            localStorage.setItem('fullEmployeeData', JSON.stringify(updatedEmployeeData));

            // Dispatch custom event to notify Header and other components of profile update
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('profileUpdated'));
            }

            toast.success('Profile updated successfully!');

            // Navigate back to profile page
            router.push('/employee/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/employee/profile');
    };

    // Show loading if no user data
    if (!currentUserData || !currentEmployee) {
        return (
            <EmployeeLayout>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </EmployeeLayout>
        );
    }

    return (
        <EmployeeLayout
            breadcrumbItems={[
                { label: 'Dashboard', href: '/employee-dashboard' },
                { label: 'My Profile', href: '/employee/profile' },
                { label: 'Edit Profile', isCurrent: true }
            ]}
        >
            <Toaster position="top-center" />

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <TableHeader
                    title="Edit Profile"
                    total={0}
                    active={0}
                    inactive={0}
                    searchValue=""
                    onSearchChange={() => { }}
                    searchPlaceholder=""
                    showStats={false}
                    showSearch={false}
                    showFilter={false}
                    headerClassName="px-6 py-6"
                    backButton={{
                        href: '/employee/profile',
                        label: 'Back'
                    }}
                />

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiUser className="mr-2" /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Home Town
                                </label>
                                <input
                                    type="text"
                                    name="homeTown"
                                    value={formData.homeTown}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiMapPin className="mr-2" /> Contact Information
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Address
                                </label>
                                <textarea
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Permanent Address
                                    </label>
                                    <label className="flex items-center text-sm text-gray-600 space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={sameAsCurrentAddress}
                                            onChange={handleSameAsCurrentChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span>Same as current address</span>
                                    </label>
                                </div>
                                <textarea
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    disabled={sameAsCurrentAddress}
                                    readOnly={sameAsCurrentAddress}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${sameAsCurrentAddress ? 'bg-gray-100 cursor-not-allowed' : ''
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                            disabled={isSubmitting}
                        >
                            <FiX className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            <FiSave className="w-4 h-4" />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </EmployeeLayout>
    );
}
