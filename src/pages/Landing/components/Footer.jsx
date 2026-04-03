import { navLinks, socialLinks } from "../../../utils/fields";
import { Link } from "react-router-dom";
import footerLogo from "../../../assets/footer-logo.png";
const Footer = () => {

  return (
    <footer className="w-full py-10 lg:py-12 bg-white dark:bg-gray-900">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-6">

        {/* Logo + Navigation */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between md:items-center gap-4 w-full">
          <div className="mx-auto md:mx-0"><img src={footerLogo} alt="bouwnce" className="h-[32px] md:h-[36px]" /></div>

          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-3 text-black dark:text-white font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-brand-orange transition-colors duration-300 text-xs"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-5">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link?.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
                aria-label={link.name}
              >
                <Icon size={19} />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
};

export default Footer;