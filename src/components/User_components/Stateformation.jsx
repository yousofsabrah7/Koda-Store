import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stateformation = ({ label, value, icon, color }) => {
  return (
    <div className="bg-[#0d1224] rounded-2xl p-5 flex justify-between items-center flex-1">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <FontAwesomeIcon icon={icon} className="text-white text-lg" />
      </div>
    </div>
  );
};

export default Stateformation;