function Card({ children, className = "" }) {
  return (
    <section
      className={`
        rounded-xl
        border border-border-subtle
        bg-surface-card
        shadow-sm
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default Card;
