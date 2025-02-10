import { GrPowerReset } from "react-icons/gr";

const NavBar = () => {
  return (
    <div className="w-full h-fit flex items-center justify-between p-4">
      <span className="text-3xl font-syncopate font-semibold">Resume AI</span>
      <button className="hover:cursor-pointer text-2xl">
        <GrPowerReset />
      </button>
    </div>
  );
};

export default NavBar;
