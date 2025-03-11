import { useLocation } from "wouter";

const SimpleNavbar = () => {
  const [location] = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopSmart
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  location === "/" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Home
              </a>
              <a 
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  location === "/about" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                About
              </a>
              <a 
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  location === "/contact" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Contact
              </a>
              <a 
                href="/faq"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  location === "/faq" 
                    ? "border-blue-500 text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                FAQ
              </a>
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <button 
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) menu.classList.toggle('hidden');
              }}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="sm:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <a 
            href="/"
            className={`block px-3 py-2 text-base font-medium ${
              location === "/" 
                ? "text-blue-700 border-l-4 border-blue-500 bg-blue-50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Home
          </a>
          <a 
            href="/about"
            className={`block px-3 py-2 text-base font-medium ${
              location === "/about" 
                ? "text-blue-700 border-l-4 border-blue-500 bg-blue-50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            About
          </a>
          <a 
            href="/contact"
            className={`block px-3 py-2 text-base font-medium ${
              location === "/contact" 
                ? "text-blue-700 border-l-4 border-blue-500 bg-blue-50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Contact
          </a>
          <a 
            href="/faq"
            className={`block px-3 py-2 text-base font-medium ${
              location === "/faq" 
                ? "text-blue-700 border-l-4 border-blue-500 bg-blue-50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;