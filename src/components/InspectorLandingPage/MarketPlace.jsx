import React, { useState } from "react";
import { MapPin, Star, Award } from "lucide-react";
import { Button } from "./UI/Button";

const inspectors = [
  {
    name: "Sarah Chen",
    location: "Shenzhen, China",
    specialty: "Electronics & Manufacturing",
    rating: 4.9,
    inspections: 1243,
    image:
      "https://images.unsplash.com/photo-1599583863916-e06c29087f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Michael Rodriguez",
    location: "Hamburg, Germany",
    specialty: "Automotive & Industrial",
    rating: 4.8,
    inspections: 987,
    image:
      "https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    specialty: "Textiles & Garments",
    rating: 5.0,
    inspections: 1567,
    image:
      "https://images.unsplash.com/photo-1762340274849-87b569b2f0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

function ImageWithFallback({ src, alt, className }) {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <div
      className={`${className} bg-gray-700 flex items-center justify-center text-gray-300`}
    >
      Image unavailable
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
    />
  );
}

export function MarketPlace() {
  return (
    <section className="py-18 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="mb-4 font-medium text-4xl">
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Global Inspector Network
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Connect with expert inspectors around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {inspectors.map((inspector, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={inspector.image}
                  alt={inspector.specialty}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{inspector.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white mb-1 font-semibold">
                      {inspector.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{inspector.location}</span>
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-purple-400" />
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  {inspector.specialty}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {inspector.inspections} inspections
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            Explore All Inspectors
          </Button>
        </div>
      </div>
    </section>
  );
}