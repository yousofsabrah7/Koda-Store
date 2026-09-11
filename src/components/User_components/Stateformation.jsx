import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stateformation = ({ label, value, icon, color }) => {
  return (
 <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 flex justify-between items-center flex-1">
  <div>
    <p className="text-text-muted text-sm">{label}</p>
    <p className="text-text-primary text-3xl font-bold mt-1">{value}</p>
  </div>
  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
    <FontAwesomeIcon icon={icon} className="text-white text-lg" />
  </div>
</div>
  );
};

export default Stateformation;