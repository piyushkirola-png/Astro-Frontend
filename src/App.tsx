import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { AuthProvider, useAuth } from './lib/AuthContext';

import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ChatBot from './components/ui/ChatBot';

import ProtectedRoute from './lib/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import CaseStudies from './pages/CaseStudies';
import WhyAstrotalk from './pages/WhyAstrotalk';
import FAQ from './pages/FAQ';
import About from './pages/legal/About';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import Consultations from './pages/consultations/Consultations';
import ChatWithAstrologer from './pages/consultations/ChatWithAstrologer';
import Horoscope from './pages/horoscope/Horoscope';
import FreeServices from './pages/free-services/FreeServices';
import FreeKundali from './pages/free-services/FreeKundali';
import KundaliMatching from './pages/free-services/KundaliMatching';
import Compatibility from './pages/free-services/Compatibility';
import Calculators from './pages/calculators/Calculators';
import LoveCalculator from './pages/calculators/LoveCalculator';
import NumerologyCalculator from './pages/calculators/NumerologyCalculator';
import FriendshipCalculator from './pages/calculators/FriendshipCalculator';
import MulankCalculator from './pages/calculators/MulankCalculator';
import DestinyNumber from './pages/calculators/DestinyNumber';
import AgeCalculator from './pages/calculators/AgeCalculator';
import SadeSati from './pages/calculators/SadeSati';
import KaalSarpDosh from './pages/calculators/KaalSarpDosh';
import Panchang from './pages/panchang/Panchang';
import TodayPanchang from './pages/panchang/TodayPanchang';
import TomorrowPanchang from './pages/panchang/TomorrowPanchang';
import RahuKaal from './pages/panchang/RahuKaal';
import SubhMuhurat from './pages/panchang/SubhMuhurat';

// Admin
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import AdminUsers from './pages/admin/users/Users';
import AdminPayments from './pages/admin/payments/payments';
import AdminProfile from './pages/admin/profile/Profile';

// User
import UserDashboard from './pages/user/dashboard/Dashboard';
import UserChat from './pages/user/chat/Chat';
import UserPayments from './pages/user/payments/payments';
import UserProfile from './pages/user/profile/profile';
import UserKundali from './pages/user/kundali/Kundali';
import UserHoroscope from './pages/user/horoscope/Horoscope';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 },
  },
});

function GlobalToast() {
  const { toast } = useAuth();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed top-6 right-6 z-[9999] flex items-center gap-3 bg-white border border-success-200 shadow-xl rounded-lg px-3.5 py-2.5 max-w-xs"
        >
          <div className="p-1 rounded bg-success-100">
            <CheckCircle className="h-3.5 w-3.5 text-success-600" />
          </div>
          <span className="text-xs font-medium text-ink-900">{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <GlobalToast />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/why-astrotalk" element={<WhyAstrotalk />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/consultations" element={<Consultations />} />
              <Route path="/chat-with-astrologer" element={<ChatWithAstrologer />} />
              <Route path="/horoscope" element={<Horoscope />} />
              <Route path="/free-services" element={<FreeServices />} />
              <Route path="/free-kundali" element={<FreeKundali />} />
              <Route path="/kundali-matching" element={<KundaliMatching />} />
              <Route path="/compatibility" element={<Compatibility />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/love-calculator" element={<LoveCalculator />} />
              <Route path="/numerology-calculator" element={<NumerologyCalculator />} />
              <Route path="/friendship-calculator" element={<FriendshipCalculator />} />
              <Route path="/mulank-calculator" element={<MulankCalculator />} />
              <Route path="/destiny-number" element={<DestinyNumber />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/sade-sati" element={<SadeSati />} />
              <Route path="/kaal-sarp-dosh" element={<KaalSarpDosh />} />
              <Route path="/panchang" element={<Panchang />} />
              <Route path="/today-panchang" element={<TodayPanchang />} />
              <Route path="/tomorrow-panchang" element={<TomorrowPanchang />} />
              <Route path="/rahu-kaal" element={<RahuKaal />} />
              <Route path="/subh-muhurat" element={<SubhMuhurat />} />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* User */}
            <Route
              path="/user"
              element={
                <ProtectedRoute roles={['USER']}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="chat" element={<UserChat />} />
              <Route path="payments" element={<UserPayments />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="kundali" element={<UserKundali />} />
              <Route path="horoscope" element={<UserHoroscope />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;