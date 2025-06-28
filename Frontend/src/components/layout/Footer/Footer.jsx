import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { RiFileUserLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bg-clr py-8 shadow-[0_-1px_10px_var(--main-clr)]">
      <div className="myContainer flex flex-col items-center justify-center gap-5">
        <h2 className="text-5xl font-bold">Blogify</h2>

        <nav className="flex items-center justify-center gap-4">
          <Link
            to={"/"}
            className="text-2xl hover:text-main-clr hover:scale-110 duration-200"
          >
            Home
          </Link>
          <Link
            to={"/posts"}
            className="text-2xl hover:text-main-clr hover:scale-110 duration-200"
          >
            Posts
          </Link>
          <Link
            to={"/about"}
            className="text-2xl hover:text-main-clr hover:scale-110 duration-200"
          >
            About
          </Link>
        </nav>

        <ul className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/share/1ASJWPGPiP/?mibextid=qi2Omg"
            target="_blank"
            className="text-3xl hover:text-main-clr hover:scale-110 duration-200"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/walid_mostafa30?igsh=MWNnNmZucDE4bjc1MA=="
            target="_blank"
            className="text-3xl hover:text-main-clr hover:scale-110 duration-200"
          >
            <AiFillInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/walid-m0stafa-"
            target="_blank"
            className="text-3xl hover:text-main-clr hover:scale-110 duration-200"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/WalidMostafa30"
            target="_blank"
            className="text-3xl hover:text-main-clr hover:scale-110 duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://walid-portfolio-2001.netlify.app/"
            target="_blank"
            className="text-3xl hover:text-main-clr hover:scale-110 duration-200"
          >
            <RiFileUserLine />
          </a>
        </ul>

        <p>
          Made by -{""}
          <span className="text-xl text-main-clr font-semibold">
            Walid Mostafa
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
