import { METHOD_STYLES } from "../data/constants";

const MethodBadge = ({ method }) => (
    <span className={`${METHOD_STYLES[method] || METHOD_STYLES.GET} text-xs font-bold font-mono tracking-widest px-3 py-1 rounded-md min-w-[52px] text-center inline-block`}>
        {method}
    </span>
);

export default MethodBadge;