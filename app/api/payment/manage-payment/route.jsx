import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    try {
        // Initialize Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        // Parse the request body properly
        const body = await req.json();
        const { customerId } = body;  // Extract customerId from the request body

        // Validate customerId
        if (!customerId) {
            return NextResponse.json(
                { error: 'Customer ID is required' },
                { status: 400 }
            );
        }

        // Get return URL from environment
        const returnUrl = process.env.HOST_URL;
        
        // Validate return URL
        if (!returnUrl) {
            return NextResponse.json(
                { error: 'Return URL is not configured' },
                { status: 500 }
            );
        }

        // Create portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });

        // Return the portal session data
        return NextResponse.json(portalSession);
        
    } catch (error) {
        console.error('Stripe billing portal error:', error);
        
        // Return appropriate error message based on error type
        if (error.type === 'StripeInvalidRequestError') {
            return NextResponse.json(
                { error: 'Invalid customer ID provided' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create billing portal session' },
            { status: 500 }
        );
    }
}