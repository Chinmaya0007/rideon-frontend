import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngExpression, LatLngBoundsExpression } from "leaflet";

interface MapViewProps {
  position: LatLngExpression;
  zoom: number;
  pickup?: LatLngExpression | null;
  drop?: LatLngExpression | null;
  routeCoords?: LatLngExpression[];
}

const FitBounds: React.FC<{
  pickup?: LatLngExpression | null;
  drop?: LatLngExpression | null;
  fallback: LatLngExpression;
  zoom: number;
}> = ({ pickup, drop, fallback, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (pickup && drop) {
      const bounds: [number, number][] = [
        pickup as [number, number],
        drop as [number, number],
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.setView(pickup as [number, number], 14);
    } else if (drop) {
      map.setView(drop as [number, number], 14);
    } else {
      map.setView(fallback as [number, number], zoom);
    }
  }, [pickup, drop, fallback, zoom, map]);

  return null;
};


const MapView: React.FC<MapViewProps> = ({
  position,
  zoom,
  pickup,
  drop,
  routeCoords = [],
}) => {
  return (
    <div className="w-full flex justify-center pt-20">
      <div className="w-full max-w-4xl h-[250px] sm:h-[300px] md:h-[400px] rounded-lg md:rounded-xl overflow-hidden shadow-md">
        <MapContainer center={position} zoom={zoom} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <FitBounds pickup={pickup} drop={drop} fallback={position} zoom={zoom} />

          {pickup && (
            <Marker position={pickup}>
              <Popup>📍 Pickup</Popup>
            </Marker>
          )}

          {drop && (
            <Marker position={drop}>
              <Popup>📍 Drop</Popup>
            </Marker>
          )}

          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: "blue", weight: 4 }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
