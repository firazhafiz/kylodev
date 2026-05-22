import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch promo banner config
    const { data: banner, error: bannerError } = await supabase
      .from('promo_banner')
      .select('*')
      .single();

    if (bannerError) {
      return NextResponse.json({ isValid: false }, { status: 500 });
    }

    // Fetch pricing plans with active promo
    const { data: promoPlans } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_promo_active', true)
      .order('sort_order', { ascending: true });

    const now = new Date();
    const endDate = new Date(banner.end_date);
    
    // Check if promo is valid
    const isValid = banner.is_active && now < endDate;

    return NextResponse.json({
      isValid,
      banner: {
        ...banner,
        serverTime: now.toISOString(),
      },
      promoPlans: promoPlans || [],
    });
  } catch (error) {
    console.error('Error fetching promo:', error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
