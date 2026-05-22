import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    // Auth check — konsisten dengan API lain di project
    const authHeader = req.headers.get('x-admin-secret');
    if (authHeader !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { banner, planUpdates } = body;

    // Update banner — upsert agar aman meski row belum ada
    if (banner) {
      const { error: bannerError } = await supabase
        .from('promo_banner')
        .upsert({
          id: 1,
          is_active: banner.is_active,
          end_date: banner.end_date,
          badge_text: banner.badge_text,
          headline: banner.headline,
          slot_count: banner.slot_count,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (bannerError) {
        console.error('Error updating banner:', bannerError);
        return NextResponse.json({ error: bannerError.message, detail: bannerError }, { status: 500 });
      }
    }

    // Update pricing plans promo status
    if (planUpdates && Array.isArray(planUpdates)) {
      for (const update of planUpdates) {
        const { error: planError } = await supabase
          .from('pricing_plans')
          .update({
            is_promo_active: update.is_promo_active,
            promo_discount_percent: update.promo_discount_percent,
          })
          .eq('id', update.id);

        if (planError) {
          console.error('Error updating plan:', planError);
          return NextResponse.json({ error: planError.message, detail: planError }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating promo:', error);
    return NextResponse.json({ error: 'Failed to update promo' }, { status: 500 });
  }
}
