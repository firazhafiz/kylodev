"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PromoBanner {
  id: number;
  is_active: boolean;
  end_date: string;
  badge_text: string;
  headline: string;
  slot_count: number;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  is_promo_active: boolean;
  promo_discount_percent: number;
}

export default function PromoAdminClient({ 
  initialBanner, 
  initialPlans 
}: { 
  initialBanner: PromoBanner | null; 
  initialPlans: PricingPlan[];
}) {
  const defaultBanner: PromoBanner = {
    id: 1,
    is_active: false,
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    badge_text: '🎯 Early Bird',
    headline: 'Promo untuk 5 orang tercepat!',
    slot_count: 5,
  };

  // Normalize end_date ke format datetime-local (YYYY-MM-DDTHH:MM)
  const normalizedBanner = initialBanner
    ? {
        ...initialBanner,
        end_date: initialBanner.end_date
          ? new Date(initialBanner.end_date).toISOString().slice(0, 16)
          : defaultBanner.end_date,
      }
    : defaultBanner;

  const [banner, setBanner] = useState<PromoBanner>(normalizedBanner);
  const [plans, setPlans] = useState(initialPlans);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const planUpdates = plans.map((p) => ({
        id: p.id,
        is_promo_active: p.is_promo_active,
        promo_discount_percent: p.promo_discount_percent,
      }));

      // Ambil secret dari URL path: /admin/[secret]/promo
      const secret = window.location.pathname.split('/')[2];

      // Pastikan end_date dalam format ISO yang valid
      const endDateISO = banner.end_date
        ? new Date(banner.end_date).toISOString()
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const res = await fetch('/api/promo/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({
          banner: { ...banner, end_date: endDateISO },
          planUpdates,
        }),
      });

      if (res.ok) {
        toast.success("Promo berhasil disimpan!");
      } else {
        const errData = await res.json();
        console.error('Save error:', errData);
        toast.error(`Gagal menyimpan: ${errData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Save exception:', error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Config */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Banner Configuration</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <label className="font-semibold text-gray-900">Status Promo</label>
              <p className="text-sm text-gray-500">Aktifkan atau nonaktifkan banner promo</p>
            </div>
            <Switch
              checked={banner.is_active}
              onCheckedChange={(checked) => setBanner({ ...banner, is_active: checked })}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-900">Tanggal Berakhir</label>
            <Input
              type="datetime-local"
              value={banner.end_date?.slice(0, 16)}
              onChange={(e) => setBanner({ ...banner, end_date: e.target.value })}
              className="bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Banner akan otomatis hilang setelah tanggal ini</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-900">Badge Text</label>
            <Input
              maxLength={50}
              value={banner.badge_text}
              onChange={(e) => setBanner({ ...banner, badge_text: e.target.value })}
              placeholder="🎯 Early Bird"
              className="bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 50 karakter</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-900">Headline</label>
            <Input
              maxLength={100}
              value={banner.headline}
              onChange={(e) => setBanner({ ...banner, headline: e.target.value })}
              placeholder="Promo untuk 5 orang tercepat!"
              className="bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 100 karakter</p>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-900">Slot Count (Display Only)</label>
            <Input
              type="number"
              value={banner.slot_count}
              onChange={(e) => setBanner({ ...banner, slot_count: parseInt(e.target.value) || 0 })}
              className="bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Jumlah slot yang ditampilkan di banner (tidak mempengaruhi logika)</p>
          </div>
        </div>
      </Card>

      {/* Pricing Plans Promo */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Pricing Plans Promo</h2>
        <p className="text-sm text-gray-600 mb-4">
          Aktifkan promo untuk paket tertentu dan set persentase diskon. Harga promo akan otomatis dihitung.
        </p>
        
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <div 
              key={plan.id} 
              className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border transition-colors ${
                plan.is_promo_active ? 'bg-lime/5 border-lime/30' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Switch
                checked={plan.is_promo_active}
                onCheckedChange={(checked) => {
                  const updated = [...plans];
                  updated[index].is_promo_active = checked;
                  setPlans(updated);
                }}
              />
              
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{plan.name}</p>
                <p className="text-sm text-gray-500">{plan.price}</p>
              </div>

              {plan.is_promo_active && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Diskon:</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={plan.promo_discount_percent}
                    onChange={(e) => {
                      const updated = [...plans];
                      updated[index].promo_discount_percent = parseInt(e.target.value) || 0;
                      setPlans(updated);
                    }}
                    className="w-20 bg-white"
                  />
                  <span className="text-sm font-medium text-gray-700">%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Preview Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Preview</h3>
        <p className="text-sm text-blue-800">
          Setelah menyimpan, buka homepage untuk melihat banner promo. 
          Harga coret akan muncul otomatis di card pricing yang diaktifkan promonya.
        </p>
      </Card>

      {/* Actions */}
      <Button 
        onClick={handleSave} 
        disabled={isSaving} 
        className="w-full h-12 bg-navy! text-white! rounded-full! text-base font-semibold"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan & Publish Promo"
        )}
      </Button>
    </div>
  );
}
