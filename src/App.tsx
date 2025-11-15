import { useState } from 'react';
import { FaUsers, FaCheckSquare, FaChartBar, FaCode, FaLightbulb, FaTrophy, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import Dashboard from './components/Dashboard';
import WelcomeAnimation from './components/WelcomeAnimation';
import AdminDashboard from './components/AdminDashboard';

const acmLogo = "https://bvcoe.acm.org/static/media/ACM-BVP-logo.6425d80f.png";

// Enhanced Navy Blue Color Scheme
const COLORS = {
  navy: {
    darkest: 'hsl(220, 45%, 8%)',
    darker: 'hsl(220, 40%, 12%)',
    dark: 'hsl(220, 35%, 16%)',
    medium: 'hsl(220, 30%, 20%)',
    light: 'hsl(220, 25%, 25%)',
  },
  primary: 'hsl(210, 80%, 55%)', // Blue accent
  accent: 'hsl(260, 70%, 60%)', // Purple for highlights
  border: 'hsl(220, 25%, 30%)',
  muted: 'hsl(220, 20%, 70%)',
  white: 'hsl(0, 0%, 100%)',
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'dashboard' | 'welcome'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'member' | 'core-member' | 'head-of-dept'>('member');
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
    setUserRole('member');
    setUserEmail('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLSelectElement).value as 'member' | 'core-member' | 'head-of-dept';

    if (!emailInput || !passwordInput) {
      alert('Please enter your email address and password');
      return;
    }

    setUserEmail(emailInput);
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentView('welcome');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (document.getElementById('signup-email') as HTMLInputElement).value;
    const firstName = (document.getElementById('first-name') as HTMLInputElement).value;
    const lastName = (document.getElementById('last-name') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLSelectElement).value as 'member' | 'core-member' | 'head-of-dept';
    const phoneNumber = (document.getElementById('phone-number') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('signup-password') as HTMLInputElement).value;

    if (!emailInput || !firstName || !lastName || !phoneNumber || !passwordInput) {
      alert('Please fill in all required fields');
      return;
    }

    setUserEmail(emailInput);
    setUserRole(position);
    setIsAuthenticated(true);
    setCurrentView('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentView('dashboard');
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'welcome') {
    return <WelcomeAnimation onComplete={handleWelcomeComplete} />;
  }

  // Fixed: Conditionally render AdminDashboard for core members and heads of department
  if (isAuthenticated && currentView === 'dashboard') {
    const isAdminUser = userRole === 'core-member' || userRole === 'head-of-dept';
    
    return isAdminUser ? (
      <AdminDashboard onLogout={handleLogout} userRole={userRole} userEmail={userEmail} />
    ) : (
      <Dashboard onLogout={handleLogout} userRole={userRole} userEmail={userEmail} />
    );
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.navy.darkest }}>
        <nav className="backdrop-blur-md border-b sticky top-0 z-50 shadow-lg" style={{ backgroundColor: `${COLORS.navy.darker}e6`, borderColor: COLORS.border }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img src={acmLogo} alt="ACM BVCOE Logo" className="h-10 w-auto -mr-1" />
                <span className="text-3xl font-bold" style={{ color: COLORS.white }}>ACM</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center px-4 py-16 animate-fade-in">
          <div className="border rounded-2xl p-9 w-full max-w-xl shadow-2xl hover:shadow-xl transition-all duration-300" style={{ backgroundColor: COLORS.navy.darker, borderColor: COLORS.border }}>
            <h2 className="text-4xl font-bold mb-2" style={{ color: COLORS.white }}>Welcome Back</h2>
            <p className="mb-8 text-base" style={{ color: COLORS.muted }}>Sign in to your ACM BVCOE account</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: COLORS.navy.darkest, 
                    borderColor: COLORS.border,
                    color: COLORS.white
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: COLORS.navy.darkest, 
                      borderColor: COLORS.border,
                      color: COLORS.white
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                    style={{ color: COLORS.muted }}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: COLORS.navy.darkest, 
                    borderColor: COLORS.border,
                    color: COLORS.white
                  }}
                >
                  <option value="member">Member</option>
                  <option value="core-member">Core Member</option>
                  <option value="head-of-dept">Head of Department</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg text-xl"
                style={{ 
                  backgroundColor: COLORS.primary,
                  color: COLORS.white
                }}
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-lg" style={{ color: COLORS.muted }}>
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentView('signup')}
                  className="font-medium transition-colors hover:text-white"
                  style={{ color: COLORS.primary }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.navy.darkest }}>
        <nav className="backdrop-blur-md border-b sticky top-0 z-50 shadow-lg" style={{ backgroundColor: `${COLORS.navy.darker}e6`, borderColor: COLORS.border }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img src={acmLogo} alt="ACM BVCOE Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold" style={{ color: COLORS.white }}>ACM</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center px-4 py-16 animate-fade-in">
          <div className="border rounded-2xl p-9 w-full max-w-xl shadow-2xl hover:shadow-xl transition-all duration-300" style={{ backgroundColor: COLORS.navy.darker, borderColor: COLORS.border }}>
            <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.white }}>Join ACM BVCOE</h2>
            <p className="mb-8" style={{ color: COLORS.muted }}>Create your account to get started</p>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: COLORS.navy.darkest, 
                      borderColor: COLORS.border,
                      color: COLORS.white
                    }}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: COLORS.navy.darkest, 
                      borderColor: COLORS.border,
                      color: COLORS.white
                    }}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Position
                </label>
                <select
                  id="position"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: COLORS.navy.darkest, 
                    borderColor: COLORS.border,
                    color: COLORS.white
                  }}
                >
                  <option value="member">Member</option>
                  <option value="core-member">Core Member</option>
                  <option value="head-of-dept">Head of Department</option>
                </select>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Email ID
                </label>
                <input
                  type="email"
                  id="signup-email"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: COLORS.navy.darkest, 
                    borderColor: COLORS.border,
                    color: COLORS.white
                    }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone-number" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: COLORS.navy.darkest, 
                    borderColor: COLORS.border,
                    color: COLORS.white
                  }}
                  placeholder="+91 98765 43210"
                  pattern="[+]?[0-9\s\-\(\)]{10,}"
                  title="Please enter a valid phone number"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-lg font-medium mb-2" style={{ color: COLORS.white }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    id="signup-password"
                    required
                    className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      backgroundColor: COLORS.navy.darkest, 
                      borderColor: COLORS.border,
                      color: COLORS.white
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                    style={{ color: COLORS.muted }}
                  >
                    {showSignupPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg text-xl"
                style={{ 
                  backgroundColor: COLORS.primary,
                  color: COLORS.white
                }}
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-lg" style={{ color: COLORS.muted }}>
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentView('login')}
                  className="font-medium transition-colors hover:text-white"
                  style={{ color: COLORS.primary }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.navy.darkest }}>
      {/* Navigation */}
      <nav className="backdrop-blur-md border-b sticky top-0 z-50 shadow-lg animate-fade-in" style={{ backgroundColor: `${COLORS.navy.darker}e6`, borderColor: COLORS.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={acmLogo} alt="ACM BVCOE Logo" className="h-10 w-auto" />
              <div className="text-2xl font-bold" style={{ color: COLORS.white }}>ACM</div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="font-medium transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>About</a>
              <a href="#features" className="font-medium transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>Features</a>
              <a href="#team" className="font-medium transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>Team</a>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('login')}
                  className="font-medium transition-colors hover:text-blue-300"
                  style={{ color: COLORS.white }}
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('signup')}
                  className="px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: COLORS.white
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-blue-900/20"
              style={{ color: COLORS.white }}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t animate-fade-in" style={{ borderColor: COLORS.border }}>
              <a href="#about" className="block transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>About</a>
              <a href="#features" className="block transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>Features</a>
              <a href="#team" className="block transition-colors hover:text-blue-300" style={{ color: COLORS.white }}>Team</a>
              <div className="pt-4 space-y-3 border-t" style={{ borderColor: COLORS.border }}>
                <button
                  onClick={() => setCurrentView('login')}
                  className="block w-full text-left font-medium transition-colors hover:text-blue-300"
                  style={{ color: COLORS.white }}
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('signup')}
                  className="block w-full px-6 py-2 rounded-lg font-medium transition-colors text-center hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: COLORS.white
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32" style={{ background: `linear-gradient(135deg, ${COLORS.navy.darker}, ${COLORS.navy.dark})` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-glow-pulse" style={{ backgroundColor: `${COLORS.primary}15` }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-glow-pulse" style={{ backgroundColor: `${COLORS.accent}15`, animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ color: COLORS.white }}>
            Association for Computing
            <span className="block mt-2" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              and Machinery
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', color: COLORS.muted }}>
            Empowering the next generation of tech innovators at BVCOE through collaboration, innovation, and technical excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => setCurrentView('login')}
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg flex items-center justify-center transform hover:scale-105 hover:shadow-xl"
              style={{ 
                backgroundColor: COLORS.primary,
                color: COLORS.white
              }}
            >
              Access Dashboard
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg transform hover:scale-105 hover:shadow-xl border"
              style={{ 
                backgroundColor: 'transparent',
                color: COLORS.white,
                borderColor: COLORS.primary
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20" style={{ backgroundColor: COLORS.navy.darker }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up" style={{ color: COLORS.white }}>About ACM BVCOE</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in mb-12" style={{ animationDelay: '0.2s', color: COLORS.muted }}>
              We are a vibrant community of computing enthusiasts at Bharati Vidyapeeth's College of Engineering,
              dedicated to advancing knowledge in computing, fostering innovation, and building technical excellence
              through collaborative learning and hands-on projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCode className="text-white" size={28} />,
                title: "Technical Workshops",
                description: "Regular hands-on workshops covering cutting-edge technologies, programming languages, and industry best practices to enhance your technical skills."
              },
              {
                icon: <FaLightbulb className="text-white" size={28} />,
                title: "Innovation Projects",
                description: "Collaborate on real-world projects, hackathons, and competitions that challenge your creativity and problem-solving abilities."
              },
              {
                icon: <FaTrophy className="text-white" size={28} />,
                title: "Competitive Programming",
                description: "Join our competitive programming sessions, participate in coding contests, and sharpen your algorithmic thinking with fellow enthusiasts."
              }
            ].map((feature, idx) => (
              <div key={idx} className="border rounded-xl p-8 hover:border-blue-400/50 transition-all transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: COLORS.navy.darkest, borderColor: COLORS.border }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: COLORS.primary }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.white }}>{feature.title}</h3>
                <p className="leading-relaxed" style={{ color: COLORS.muted }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20" style={{ backgroundColor: COLORS.navy.darkest }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up" style={{ color: COLORS.white }}>Platform Features</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', color: COLORS.muted }}>
              Our task management system streamlines collaboration and ensures efficient workflow across all ACM BVCOE initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUsers className="text-white" size={28} />,
                title: "Hierarchical Management",
                description: "Core members assign to department heads, with built-in oversight and workflow control."
              },
              {
                icon: <FaCheckSquare className="text-white" size={28} />,
                title: "Smart Task Tracking",
                description: "Accept, reject, or complete tasks with built-in deadline monitoring and status updates."
              },
              {
                icon: <FaChartBar className="text-white" size={28} />,
                title: "Performance Insights",
                description: "Real-time analytics and progress tracking for better team performance."
              }
            ].map((feature, idx) => (
              <div key={idx} className="border rounded-xl p-8 hover:border-blue-400/50 transition-all transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: COLORS.navy.darker, borderColor: COLORS.border }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: COLORS.primary }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.white }}>{feature.title}</h3>
                <p className="leading-relaxed" style={{ color: COLORS.muted }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-4 py-20" style={{ backgroundColor: COLORS.navy.darker }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up" style={{ color: COLORS.white }}>Our Core Team</h2>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', color: COLORS.muted }}>
              Meet the dedicated leaders driving our community forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Satvik Phour",
                role: "Chairperson ACM",
                img: "https://bvcoe.acm.org/static/media/Satvik.e30a3550.jpg",
                description: "Steering ACM BVCOE's strategic vision and fostering a culture of technical excellence and innovation"
              },
              {
                name: "Harsh Raj",
                role: "Vice Chairperson ACM",
                img: "https://bvcoe.acm.org/static/media/HarshRaj.f239c0ac.JPG",
                description: "Supporting leadership initiatives and coordinating cross-functional teams to drive organizational success"
              },
              {
                name: "Sanskar Kannaujia",
                role: "General Secretary",
                img: "https://bvcoe.acm.org/static/media/Sanskar.eeeeb9bf.webp",
                description: "Managing day-to-day operations and ensuring seamless communication across all ACM chapters and events"
              },
              {
                name: "Harshit Bareja",
                role: "Vice Chair ACM-W",
                img: "https://bvcoe.acm.org/static/media/Harshit.8e48aef6.JPG",
                description: "Championing diversity in computing and leading initiatives to empower women in technology"
              },
              {
                name: "Teena Kaintura",
                role: "WebMaster ACM",
                img: "https://bvcoe.acm.org/static/media/Teena.a1f2bb7a.jpg",
                description: "Maintaining digital infrastructure and creating innovative web solutions for the ACM community"
              },
              {
                name: "Manya Sharma",
                role: "General Secretary ACM",
                img: "https://bvcoe.acm.org/static/media/Manya.afac2d5c.png",
                description: "Coordinating member activities and organizing technical workshops to enhance skill development"
              },
              {
                name: "Hitesh",
                role: "Treasurer ACM",
                img: "https://bvcoe.acm.org/static/media/hitesh.6a82ccbf.jpg",
                description: "Managing financial resources and ensuring transparent budget allocation for all ACM initiatives"
              },
              {
                name: "Riya Raj",
                role: "Membership Chair ACM",
                img: "https://bvcoe.acm.org/static/media/Riya.2f2238f9.jpg",
                description: "Building community engagement and onboarding new members into the ACM BVCOE family"
              },
            ].map((member, idx) => (
              <div key={idx} className="border rounded-xl p-8 text-center hover:border-blue-400/50 transition-all transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: COLORS.navy.darkest, borderColor: COLORS.border }}>
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden ring-4 shadow-lg" style={{ ringColor: `${COLORS.primary}33` }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.white }}>{member.name}</h3>
                <p className="font-semibold mb-4" style={{ color: COLORS.primary }}>{member.role}</p>
                <p className="leading-relaxed" style={{ color: COLORS.muted }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary}e6, ${COLORS.accent}e6)` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${COLORS.primary}40` }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${COLORS.accent}40` }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up" style={{ color: COLORS.white }}>Ready to Begin?</h2>
          <p className="text-xl mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', color: COLORS.white }}>
            Join ACM BVCOE today and become part of our vibrant community advancing computing education and innovation
          </p>
          <button
            onClick={() => setCurrentView('signup')}
            className="px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl animate-scale-in-up" style={{ animationDelay: '0.4s', backgroundColor: COLORS.white, color: COLORS.primary }}
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-12" style={{ backgroundColor: COLORS.navy.darkest, borderColor: COLORS.border }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={acmLogo} alt="ACM BVCOE Logo" className="h-8 w-auto" />
            <div className="text-2xl font-bold" style={{ color: COLORS.white }}>ACM BVCOE</div>
          </div>
          <p style={{ color: COLORS.muted }}>© 2025 ACM Society of BVCOE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;