import Snabbdom from "snabbdom-pragma";

export const Input = ({ value, ...props }: any) => (
  <input
    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    value={value}
    {...props}
  />
);

export const Header1 = ({ title }: { title: string }) => (
  <h1 className="text-center font-sans m-2 text-grey-darker">{title}</h1>
);

export const Header4 = ({ title }: { title: string }) => (
  <h4 className="text-center font-mono m-1 text-red-darker">{title}</h4>
);
