import { ReactNode } from "react";
import NavBar from "./components/NavBar";

interface Props {
  child: ReactNode;
}

const Layout = ({ child }: Props) => {
  return (
    <div className="h-fit md:w-full xl:max-w-[1100px] xl:mx-auto">
      <NavBar />
      {child}
    </div>
  );
};

export default Layout;
