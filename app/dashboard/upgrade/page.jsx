"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { USER_TABLE } from '@/configs/schema'
import { eq } from 'drizzle-orm'

function Upgrade() {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    user && GetUserDetails();
  }, [user])

  const GetUserDetails = async () => {
    try {
      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
      setUserDetail(result[0]);
      setError('');
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError('Failed to fetch user details. Please try again.');
    }
  }

  const OnCheckoutClick = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/api/payment/checkout', {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
      });

      if (response.data?.url) {
        window.open(response.data.url);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError('Unable to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const onPaymentManage = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!userDetail?.customerId) {
        throw new Error('Customer ID not found');
      }

      const response = await axios.post('/api/payment/manage-payment', {
        customerId: userDetail.customerId
      });

      if (response.data?.url) {
        window.open(response.data.url);
      } else {
        throw new Error('No management URL received');
      }
    } catch (error) {
      console.error("Payment management error:", error);
      setError(
        error.message === 'Customer ID not found'
          ? 'Unable to find your payment details. Please contact support.'
          : 'Unable to manage payment settings. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10">
      <div>
        <h2 className="font-medium text-3xl">Plans</h2>
        <p>Update your plan to generate unlimited courses for your exam</p>

        {error && (
          <div className="my-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Free
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">0$</strong>
                  <span className="text-sm font-medium text-gray-700">/month</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">5 Course Generate</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Limited Support</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Help center access</span>
                </li>
              </ul>

              <Button 
                variant="outline" 
                className="w-full mt-5"
                disabled={loading}
              >
                Current Plan
              </Button>
            </div>

            {/* Monthly Plan */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Monthly
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">5.00$</strong>
                  <span className="text-sm font-medium text-gray-700">/Monthly</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Unlimited Course Generate</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Unlimited Flashcard, Quiz</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon />
                  <span className="text-gray-700">Help center access</span>
                </li>
              </ul>

              {userDetail?.member === false ? (
                <Button
                  onClick={OnCheckoutClick}
                  className="w-full mt-5"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Get Started'}
                </Button>
              ) : (
                <Button
                  onClick={onPaymentManage}
                  className="w-full mt-5"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Manage Payment'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5 text-indigo-700"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
)

export default Upgrade