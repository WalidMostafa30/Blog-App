import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import HeaderRight from "./HeaderRight";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const [activeNav, setActiveNav] = useState(false);

  return (
    <header className="fixed z-50 top-0 left-0 w-full bg-bg-clr shadow-md shadow-main-clr/50">
      <div className="container content-center h-[var(--header-height)] flex items-center justify-between">
        <NavBar activeNav={activeNav} setActiveNav={setActiveNav} user={user} />

        <div className="flex items-center gap-2">
          <span
            className="text-3xl cursor-pointer xl:hidden"
            onClick={() => setActiveNav((prev) => !prev)}
          >
            {activeNav ? <VscChromeClose /> : <HiMenuAlt2 />}
          </span>

          <h1 className="text-3xl xl:text-5xl font-bold">Blogify</h1>
        </div>

        <HeaderRight user={user} />
      </div>
    </header>
  );
};

export default Header;
