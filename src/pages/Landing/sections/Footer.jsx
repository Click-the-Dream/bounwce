import { FaXTwitter, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F5EFE5] dark:bg-neutral-950 border-t border-[#E8E0D5] dark:border-neutral-800 py-10 lg:py-12 transition-colors duration-300">
      
      <div className="max-w-[90rem] mx-auto px-5 lg:px-10 flex flex-col items-center justify-center gap-6">
        
        <div className="text-[#8C857B] dark:text-gray-400 text-[13px] md:text-sm font-medium text-center transition-colors duration-300">
          <p>
            © {new Date().getFullYear()} Bouwnce. Access is no longer a privilege.
          </p>
        </div>

        {/* Social Media links */}
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
    </footer>
  );
};

export default Footer;