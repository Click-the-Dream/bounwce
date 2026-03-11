import { FaXTwitter, FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube, FaSnapchat } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { name: "TikTok", url: "https://www.tiktok.com/@bouwnceofficial?_r=1&_t=ZS-94bAoiIcJv7", icon: <FaTiktok size={18} /> },
    { name: "Instagram", url: "https://www.instagram.com/bouwnceofficial?igsh=MXQzdmN6cTNvcThvaQ==", icon: <FaInstagram size={19} /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/bouwnce-official/", icon: <FaLinkedinIn size={19} /> },
    { name: "X (Twitter)", url: "https://x.com/bouwnceofficial?s=21", icon: <FaXTwitter size={18} /> },
    { name: "YouTube", url: "https://youtube.com/@bouwnceofficial?", icon: <FaYoutube size={19} /> },
    { name: "Snapchat", url: "https://snapchat.com/t/2VBmnP9k", icon: <FaSnapchat size={19} /> },
  ];

  return (
    <footer className="w-full bg-[#F5EFE5] dark:bg-neutral-950 border-t border-[#E8E0D5] dark:border-neutral-800 py-10 lg:py-12 transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-5 lg:px-10 flex flex-col items-center justify-center gap-6">
        
        <div className="text-[#8C857B] dark:text-gray-400 text-[13px] md:text-sm font-medium text-center transition-colors duration-300">
          <p>
            © {new Date().getFullYear()} Bouwnce. Access is no longer a privilege.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-[#8C857B] dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange hover:-translate-y-1 transition-all duration-300"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;