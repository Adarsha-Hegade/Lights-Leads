const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 backdrop-blur-md bg-white/80 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://magnific.in/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="https://magnific.in/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://magnific.in/blog" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                 Blogs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://magnific.in/about-us/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://magnific.in/contact-us/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919513866001" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  +91 95138 66001
                </a>
              </li>
              <li>
                <a href="mailto:info@magnific.in" className="text-gray-600 hover:text-[#1a5f7a] transition-colors">
                  info@magnific.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Magnific. All rights reserved.
          </p> <p className="text-center text-gray-500 text-sm mt-2">
            Developed with ❤️ by <a href="https://inktypedesign.studio/" className="hover:text-[#1a5f7a] transition-colors">Inktype Design Studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;