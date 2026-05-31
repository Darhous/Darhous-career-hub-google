import { FaInstagram, FaLinkedinIn, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { cn } from '../lib/utils';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 pt-6 pb-6 flex flex-col items-center gap-4 mt-auto shrink-0">
      <div className="flex items-center gap-4">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/darhous/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl",
            "border border-[#E1306C]/30 bg-[#E1306C]/10 text-[#E1306C]",
            "transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]"
          )}
        >
          <FaInstagram size={16} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/darhous/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl",
            "border border-[#0A66C2]/30 bg-[#0A66C2]/10 text-[#0A66C2]",
            "transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]"
          )}
        >
          <FaLinkedinIn size={16} />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/ahmed.darhous"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl",
            "border border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2]",
            "transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.4)]"
          )}
        >
          <FaFacebook size={16} />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/201030002331"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl",
            "border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]",
            "transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
          )}
        >
          <FaWhatsapp size={16} />
        </a>
      </div>

      <div className="text-xs font-mono text-on-surface-variant/50 flex items-center gap-1">
        <span>designed by</span>
        <a
          href="mailto:ahmeddarhous@gmail.com"
          className="text-primary/85 hover:text-primary hover:opacity-100 transition-opacity no-underline"
        >
          Ahmed Darhous
        </a>
        <span>©</span>
      </div>
    </footer>
  );
}
