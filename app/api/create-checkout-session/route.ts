import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PdaYUDnjRMUmEq73dmOSWKnIi2gv6Ck1aJLRWADoidyc87An4qqOrRJF4LvRlEgaw43sEjriWcGvmB4RyqdApML00Vak5tedG",
  {
    apiVersion: "2024-06-20",
  }
);

export async function POST(req: NextRequest) {
  try {
    // Explicitly define the type for req.json()
    const body: { email: string; price: string } = await req.json();

    const { email, price } = body;

    // Check if price is a valid number
    const unitAmount = parseInt(price);
    if (isNaN(unitAmount) || unitAmount <= 0) {
      throw new Error("Invalid price value");
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Ticket",
            },
            unit_amount: unitAmount * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_BASE_URL}/cancel`,
    });

    // Return session ID as JSON response with HTTP status 200
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (error) {
    // Handle and log errors
    console.error("Error creating Stripe session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
