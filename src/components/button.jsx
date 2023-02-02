export default function Button({ label, onClick, cls }) {
  return (
    <button
      className={`rounded p-2 py-1 text-[13px] bg-theme-red text-[white] pointer-event-auto ${cls}`}
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {label}
    </button>
  );
}
