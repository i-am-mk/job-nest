const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto flex flex-col items-center px-6">
        {/* Brand Section */}
        <h2 className="text-3xl font-extrabold text-white">
          Job<span className="text-yellow-500">Nest</span>
        </h2>
        <p className="mt-2 text-center text-gray-300">
          Your gateway to exciting job opportunities. Start your journey today!
        </p>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} JobNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
