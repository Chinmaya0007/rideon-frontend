import React from "react";

const RideStatusBadge: React.FC<{ status: string; requestedAt: string }> = ({
  status,
  requestedAt,
}) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    accepted: "bg-green-500/20 text-green-400",
    ongoing: "bg-blue-500/20 text-blue-400",
    completed: "bg-purple-500/20 text-purple-400",
    canceled: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="flex items-center justify-between">
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[status] || ""}`}>
        {status.toUpperCase()}
      </span>
      <span className="text-sm text-gray-400">
        {new Date(requestedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
};

export default RideStatusBadge;
