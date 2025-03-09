import { SESSION_KEYS } from '@game-portal/constants/dist';
import { UserDataWithoutPassword } from '@game-portal/types';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import AuthProvider from '@/lib/auth/auth-provider';
import { getSession } from '@/lib/helpers/session';

const MarketLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData = await getSession<UserDataWithoutPassword>(
    SESSION_KEYS.USER_SESSION
  );

  return (
    <AuthProvider userData={userData}>
      <section className="w-full h-full p-0 m-0">
        <Navbar />
        {children}
        <Footer />
      </section>
    </AuthProvider>
  );
};

export default MarketLayout;
