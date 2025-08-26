import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';

export default function CareersPage() {
  return (
    <WebsiteLayout 
      title="Careers"
      description="Let's shape the future with tech together!"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Careers</h2>
          <p className="text-gray-600 mb-6">Let's shape the future with tech together!</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p className="text-blue-700">
              <strong>Note:</strong> This is a sample page. Content will be updated with actual website content during refactoring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
              <p className="text-gray-600">
                This page is under development. We are porting the content from the React website to maintain the same UI and experience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Responsive design</li>
                <li>• Modern UI components</li>
                <li>• SEO optimized</li>
                <li>• Fast loading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
