


function StatCard({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="flex flex-col bg-surface-card rounded-3xl border border-border-subtle p-6 gap-4">
      <div
        className="flex items-center justify-center w-11 h-11 rounded-xl border border-border-subtle"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} strokeWidth={2} style={{ color: iconColor }} />
      </div>
      <div>
        <h4 className="text-3xl font-extrabold text-text-primary">{value}</h4>
        <p className="text-text-secondary text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;