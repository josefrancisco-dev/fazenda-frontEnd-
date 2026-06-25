type StatusBadgeProps = {
  isActive: boolean;
};

export function StatusBadge({ isActive }: StatusBadgeProps) {
  
  const label = isActive ? "singular" : "corporativo";

  const statusColors = {
     corporativo:"bg-red-100 text-red-800",
     singular: "bg-green-100 text-green-800",
  };

  const dotColors = {
    corporativo: "bg-red-600",
    singular: "bg-green-600",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${statusColors[label]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${dotColors[label]}`} />
      {label}
    </span>
  );
}

