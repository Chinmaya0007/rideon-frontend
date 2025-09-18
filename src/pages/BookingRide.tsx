import React, { useState, useEffect } from "react";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { useAuth } from "../context/AuthContext";
import { useRide } from "../context/RideContext";
import MapView from "../components/booking/MapView";
import SearchBar from "../components/booking/SearchBar";
import SearchSuggestions from "../components/booking/SearchSuggestions";
import ActiveRideCard from "../components/booking/ActiveRideCard";
import RideInputs from "../components/booking/RideInputs";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type NominatimResult = { lat: string; lon: string; display_name: string };

const BookingRide: React.FC = () => {
  const { createRide, rides, fetchUserRides, updateRideStatus, loading } = useRide();
  const { user } = useAuth();

  // 🔹 State
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [position, setPosition] = useState<LatLngExpression>([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);

  const [pickup, setPickup] = useState<{ coords: LatLngExpression; name: string } | null>(null);
  const [drop, setDrop] = useState<{ coords: LatLngExpression; name: string } | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [activeLocation, setActiveLocation] = useState<"pickup" | "drop" | null>(null);

  const [rideStatus, setRideStatus] = useState<"idle" | "searching" | "created">("idle");
  const [activeRide, setActiveRide] = useState<any>(null);

  // ⏳ Effects: location, rides, search, routes, fare
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        setPickup({ coords, name: "Current Location" });
        setZoom(14);
      });
    }
  }, []);

  useEffect(() => {
    const fetchActiveRide = async () => {
      if (!user?._id) return;
      await fetchUserRides(user._id);
      const found = rides.find((r) => ["pending", "accepted", "ongoing"].includes(r.status));
      if (found) {
        setActiveRide(found);
        setRideStatus("created");
        setPickup({ coords: [found.pickupLocation.lat, found.pickupLocation.lng], name: found.pickupLocation.address });
        setDrop({ coords: [found.dropLocation.lat, found.dropLocation.lng], name: found.dropLocation.address });
      }
    };
    fetchActiveRide();
  }, [user?._id]);

  useEffect(() => {
    const controller = new AbortController();
    if (!search.trim()) return setSuggestions([]);
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&limit=5`,
          { signal: controller.signal }
        );
        setSuggestions(await res.json());
      } catch { }
    };
    const timeout = setTimeout(fetchResults, 400);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!pickup || !drop) return;
      const [plat, plng] = pickup.coords as [number, number];
      const [dlat, dlng] = drop.coords as [number, number];
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${plng},${plat};${dlng},${dlat}?overview=full&geometries=geojson`
      );
      if (!res.ok) return;
      const data = await res.json();
      const coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
      setRouteCoords(coords);
      setDistance(data.routes[0].distance / 1000);
      setDuration(data.routes[0].duration / 60);
    };
    fetchRoute();
  }, [pickup, drop]);

  useEffect(() => {
    if (activeRide && distance && !activeRide.fare) {
      const fare = Math.round(distance * 8);
      setActiveRide((prev: any) => ({ ...prev, fare }));
    }
  }, [distance, activeRide]);

  // 🎯 Handlers
  const handleSelect = (item: NominatimResult) => {
    const coords: LatLngExpression = [parseFloat(item.lat), parseFloat(item.lon)];
    activeLocation === "pickup"
      ? setPickup({ coords, name: item.display_name })
      : setDrop({ coords, name: item.display_name });
    setPosition(coords);
    setZoom(14);
    setSearch(item.display_name);
    setSuggestions([]);
    setActiveLocation(null);
  };

  const handleSearchRides = async () => {
    if (!pickup || !drop) return;
    setRideStatus("searching");
    const newRide = await createRide({
      userId: user._id,
      pickupLocation: { lat: (pickup.coords as [number, number])[0], lng: (pickup.coords as [number, number])[1], address: pickup.name },
      dropLocation: { lat: (drop.coords as [number, number])[0], lng: (drop.coords as [number, number])[1], address: drop.name },
      status: "pending",
      requestedAt: new Date().toISOString(),
      fare: 0,
      paymentStatus: "pending",
      vehicleType: "any",
    });
    setActiveRide(newRide);
    setRideStatus("created");
  };

  const handleCancelRide = async () => {
    if (!activeRide) return;
    const updated = await updateRideStatus(activeRide._id, "canceled");
    setActiveRide(updated);
    setRideStatus("idle");
  };

  const handlePayNow = async () => {
    if (!activeRide) return;
    const updated = await updateRideStatus(activeRide._id, "completed");
    setActiveRide({ ...updated, paymentStatus: "paid" });
    setRideStatus("idle");
  };

  return (
    <div className="h-screen w-full bg-[#101923] text-white flex flex-col overflow-hidden">
      {/* 🔹 Search Bar */}
      <div className="z-50 w-full flex justify-center px-3 md:px-6 mt-4">
        <div className="w-full max-w-3xl relative">
          <SearchBar search={search} setSearch={setSearch} />
          {!activeRide && (
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>

      {/* 🔹 Map fills the space */}
      <div className="flex-1 relative z-0">
        <MapView
          position={position}
          zoom={zoom}
          pickup={pickup?.coords}
          drop={drop?.coords}
          routeCoords={routeCoords}
        />
      </div>

      {/* 🔹 Bottom Panel fixed at bottom */}
      <div className="sticky bottom-0 w-full px-4 pb-2 bg-[#101923]">
        <div className="max-w-3xl mx-auto flex flex-col gap-2 bg-[#1f2d3d]/95 p-4 rounded-t-xl md:rounded-xl shadow-lg">
          {activeRide ? (
            <ActiveRideCard
              ride={activeRide}
              onCancel={handleCancelRide}
              onPayNow={handlePayNow}
            />
          ) : (
            <RideInputs
              pickup={pickup}
              drop={drop}
              distance={distance}
              duration={duration}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
              onSearchRides={handleSearchRides}
              rideStatus={rideStatus}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>

  );
};

export default BookingRide;
