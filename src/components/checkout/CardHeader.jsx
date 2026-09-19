function CardHeader({ icon: Icon, title }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <Icon className="h-[17px] w-[17px] text-indigo-600" strokeWidth={2} />
      <h2 className="text-[15px] font-semibold text-slate-800">{title}</h2>
    </div>
  );
}

export default CardHeader;