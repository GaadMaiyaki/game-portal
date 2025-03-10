import { BrandConfigProps } from '@/lib/configs/brand';

type FooterProps = {
  brandConfigData: BrandConfigProps;
};

const Footer = ({ brandConfigData }: FooterProps) => {
  return (
    <footer className="w-full bg-gameportal-footer-bg py-6 shadow-2xl drop-shadow-lg dark:border-gray-700">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gameportal-footer-text dark:text-gray-200">
            {brandConfigData.brandName}
          </span>
        </div>

        <p className="text-xs text-gameportal-footer-text mt-4 md:mt-0">
          {brandConfigData.footer.text}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
