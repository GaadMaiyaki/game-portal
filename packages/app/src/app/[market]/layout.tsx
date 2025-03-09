import { SESSION_KEYS } from '@game-portal/constants/dist';
import { UserDataWithoutPassword } from '@game-portal/types';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import AuthProvider from '@/lib/auth/auth-provider';
import { getSession } from '@/lib/helpers/session';
import BrandConfigProvider from '@/lib/brand/brand-provider';
import { getBrandConfigFromEnv } from '@/lib/helpers/getBrandConfigFromEnv';

const MarketLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData = await getSession<UserDataWithoutPassword>(
    SESSION_KEYS.USER_SESSION
  );

  const brandConfigData = getBrandConfigFromEnv();

  return (
    <AuthProvider userData={userData}>
      <BrandConfigProvider brandConfigData={brandConfigData}>
        <section className="w-full h-full p-0 m-0">
          <Navbar brandConfigData={brandConfigData} />
          {children}
          <Footer brandConfigData={brandConfigData} />
        </section>
      </BrandConfigProvider>
    </AuthProvider>
  );
};

export default MarketLayout;
