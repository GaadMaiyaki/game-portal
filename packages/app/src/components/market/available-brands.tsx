import { MarketConfigProps } from '@game-portal/types/dist';

type AvailableBrandsProps = {
  brands: MarketConfigProps['availableBrands'];
};

const AvailableBrands = ({ brands }: AvailableBrandsProps) => {
  if (brands.length <= 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Available Brands</h2>
      <ul className="mt-2 space-y-1">
        {brands.map((brand) => (
          <li key={brand} className="p-2 bg-gray-800 rounded-md text-gray-200">
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBrands;
