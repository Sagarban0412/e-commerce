import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2025 YourCompanyName. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </a>
            <a href="/contact-us" className="hover:text-white">
              Contact Us
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm">Follow us on:</p>
            <div className="flex justify-center space-x-3 mt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
