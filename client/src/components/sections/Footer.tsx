import logoImg from '@assets/Screenshot_2025-10-04_122812-removebg-preview_1759562746476.png';
import { Heart, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-purple to-purple-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="Claryntia" className="w-14 h-14" />
              <span className="font-serif text-2xl font-bold">Claryntia</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Aligning Ambition with Inner Clarity. Empowering minds, healing hearts, and redefining possibilities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all" data-testid="link-footer-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all" data-testid="link-footer-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all" data-testid="link-footer-facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#services" className="hover:text-white hover:translate-x-1 inline-block transition-all" data-testid="link-footer-services">Services</a></li>
              <li><a href="#packages" className="hover:text-white hover:translate-x-1 inline-block transition-all" data-testid="link-footer-packages">Packages</a></li>
              <li><a href="#methodology" className="hover:text-white hover:translate-x-1 inline-block transition-all" data-testid="link-footer-methodology">Methodology</a></li>
              <li><a href="#blog" className="hover:text-white hover:translate-x-1 inline-block transition-all" data-testid="link-footer-blog">Blog</a></li>
              <li><a href="#contact" className="hover:text-white hover:translate-x-1 inline-block transition-all" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="hover:text-white transition-colors">Career Clarity & Guidance</li>
              <li className="hover:text-white transition-colors">Relationship Healing</li>
              <li className="hover:text-white transition-colors">Energy Reading</li>
              <li className="hover:text-white transition-colors">Workshops & Seminars</li>
              <li className="hover:text-white transition-colors">Mentoria Packages</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>contact@claryntia.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Kolkata, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2025 Claryntia. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>by Mentoria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
