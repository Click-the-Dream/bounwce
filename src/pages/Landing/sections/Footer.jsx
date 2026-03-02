import { FaXTwitter, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa6";
import { useModal } from "../context/ModalContext";

const Footer = () => {
  const { openModal } = useModal();
  return (
    <footer className="w-full bg-[#F5EFE5] dark:bg-neutral-950 border-t border-[#E8E0D5] dark:border-neutral-800 py-10 lg:py-12 transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left Column: Logo */}
        <div className="flex justify-center md:justify-start">
          <a href="/" className="text-2xl md:text-[1.75rem] font-black tracking-[0.15em] text-[#1A1A1A] dark:text-white transition-colors duration-300">
            BOU<span className="text-brand-orange">W</span>NCE
          </a>
        </div>

        {/* Center Column: Copyright */}
        <div className="flex justify-center text-[#8C857B] dark:text-gray-400 text-[13px] md:text-sm font-medium text-center transition-colors duration-300">
          <p>
            © {new Date().getFullYear()} Bouwnce. Access is no longer a privilege.
          </p>
        </div>

        {/* Right Column: Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-5">
          
          {/* Page Links */}
          <div className="flex items-center gap-6 md:gap-8 text-[#8C857B] dark:text-gray-400 text-[13px] md:text-sm font-medium transition-colors duration-300">
            <a 
              href="#waitlist" 
              className="hover:text-brand-orange dark:hover:text-brand-orange transition-colors duration-300"
              onClick={openModal}
            >Waitlist</a>
            <a href="#contact" className="hover:text-brand-orange dark:hover:text-brand-orange transition-colors duration-300">Contact</a>
            <a href="#privacy" className="hover:text-brand-orange dark:hover:text-brand-orange transition-colors duration-300">Privacy</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-5">
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={19} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={19} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={18} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;