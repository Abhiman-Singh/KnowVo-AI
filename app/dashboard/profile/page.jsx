import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs';

const ProfilePage = ({ pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignedIn>
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserProfile routing="hash" />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">Please sign in to view your profile.</p>
          </div>
        </SignedOut>
      </div>
    </ClerkProvider>
  );
};

export default ProfilePage;
