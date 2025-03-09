const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-900 py-6 shadow-2xl drop-shadow-lg dark:border-gray-700">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-100 dark:text-gray-200">
            Game Portal
          </span>
        </div>

        <p className="text-xs text-gray-300 dark:text-gray-400 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Game Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
