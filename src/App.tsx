import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './lib/AuthContext';

// Public layout (Navbar + Footer + ChatBot)
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ChatBot from './components/ui/ChatBot';

// Auth guard
import ProtectedRoute from './lib/ProtectedRoute';

// Dashboard layout
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';

// ─── Public Pages ───
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

// Auth pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Public feature modules
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

// ─── Admin Dashboard Pages ───
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import AdminUsers from './pages/admin/users/Users';
import AdminPayments from './pages/admin/payments/payments';

// ─── User Dashboard Pages ───
import UserDashboard from './pages/user/dashboard/Dashboard';
import UserProfile from './pages/user/profile/profile';
import UserPayments from './pages/user/payments/payments';
import UserConsultations from './pages/user/consultations/MyConsultations';

// ============================================================
// React Query client (must be created outside App())
// ============================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// ============================================================
// Public layout — Navbar + Footer + ChatBot
// ============================================================
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

// ============================================================
// Root App
// ============================================================
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
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

            {/* ================= ADMIN DASHBOARD ================= */}
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
            </Route>

            {/* ================= USER DASHBOARD ================= */}
            <Route
              path="/user"
              element={
                <ProtectedRoute roles={['USER']}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="consultations" element={<UserConsultations />} />
              <Route path="payments" element={<UserPayments />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* ================= 404 FALLBACK ================= */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;