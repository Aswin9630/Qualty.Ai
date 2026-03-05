import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function CompanyDetailDrawer({ company, service, open, onClose, onRequestInspection }) {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const pricing = useMemo(() => {
    if (!company) return [];
    const prices = [];

    (company.indiaRegions || []).forEach(region => {
      (region.locations || []).forEach(loc => {
        const svc = loc.services?.[service];
        if (svc?.confirmed) {
          prices.push({
            id: `${region.name}-${loc.city}`,
            region: region.name,
            city: loc.city,
            price: svc.confirmed,
            currency: "₹"
          });
        }
      });
    });

    (company.intlRegions || []).forEach(region => {
      (region.locations || []).forEach(loc => {
        const svc = loc.services?.[service];
        if (svc?.confirmed) {
          prices.push({
            id: `${region.name}-${loc.city}`,
            region: region.name,
            city: loc.city,
            price: svc.confirmed,
            currency: "$"
          });
        }
      });
    });

    return prices;
  }, [company, service]);

  if (!company) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto bg-white border-l border-gray-200">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {company.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Company overview & pricing
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {company.description}
          </p>

          <h3 className="font-semibold text-gray-900 mb-4">
            Select Location & Pricing
          </h3>

          <div className="space-y-3">
            {pricing.map(p => (
              <label
                key={p.id}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
                  ${selectedPrice?.id === p.id
                    ? "border-black bg-gray-100"
                    : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedPrice?.id === p.id}
                    onChange={() => setSelectedPrice(p)}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="font-medium text-gray-900">
                    {p.region} – {p.city}
                  </span>
                </div>

                <span className="font-semibold text-gray-900">
                  {p.currency}{p.price}
                </span>
              </label>
            ))}

            {!pricing.length && (
              <div className="text-sm text-gray-400 text-center py-6">
                No pricing available
              </div>
            )}
          </div>

          <Button
            disabled={!selectedPrice}
            onClick={() => {
              onRequestInspection({ company, pricing: selectedPrice });
              onClose();
            }}
            className="w-full mt-10 py-6 bg-black text-white hover:bg-gray-900 disabled:bg-gray-300"
          >
            Request Inspection
          </Button>

        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
