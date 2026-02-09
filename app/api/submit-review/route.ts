import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, rating, title, body: reviewBody, reviewer_name_format, productId } = body;

    // Validate required fields
    if (!name || !email || !rating || !reviewBody || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract numeric product ID from Shopify GID
    const numericProductId = productId.split('/').pop();

    // Get client IP for location detection
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                request.headers.get('x-real-ip') || 
                '';

    const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;

    if (!shopDomain) {
      throw new Error('SHOPIFY_STORE_DOMAIN not configured');
    }

    console.log('Submitting review to Judge.me:', {
      shop_domain: shopDomain,
      product_id: numericProductId,
      rating
    });

    // Submit to Judge.me API
    const response = await fetch('https://judge.me/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_domain: shopDomain,
        platform: 'shopify',
        name: name,
        email: email,
        rating: Number(rating),
        body: reviewBody,
        title: title || undefined,
        id: parseInt(numericProductId),
        ip_addr: ip || undefined
      })
    });

    const responseText = await response.text();
    console.log('Judge.me response:', response.status, responseText);

    if (!response.ok) {
      let errorMessage = 'Failed to submit review';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(responseText);

    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully',
      data 
    });

  } catch (error: any) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}