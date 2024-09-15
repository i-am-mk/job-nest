import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        <div>
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-yellow-400">Nest</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Your No. 1 platform for finding your dream job. Unlock endless career opportunities with ease.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Press</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Support</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-400 mb-4">Get the latest job openings and career tips delivered to your inbox.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md bg-gray-800 border-none text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 outline-none"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-gray-900 font-semibold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><Facebook /></a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><Twitter /></a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><Linkedin /></a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><Instagram /></a>
      </div>

      <div className="text-center text-gray-500 mt-8">
        © {new Date().getFullYear()} JobNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
