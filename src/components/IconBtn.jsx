const IconBtn = ({ onClick, title, hoverClass, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={`bg-transparent border border-[#2a3550] rounded-lg p-2 text-slate-500 cursor-pointer flex items-center justify-center transition-all duration-150 ${hoverClass}`}
  >
    {children}
  </button>
);

export default IconBtn;