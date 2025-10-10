import { useState } from 'react';
import { Menu, X, Users, CheckSquare, BarChart3, Star } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'dashboard'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'member' | 'core-member' | 'head-of-dept'>('member');

  if (currentView === 'dashboard') {
    if (userRole === 'core-member' || userRole === 'head-of-dept') {
      return <AdminDashboard userRole={userRole} onLogout={() => { setCurrentView('home'); setIsAuthenticated(false); }} />;
    }
    return <Dashboard userRole={userRole} onLogout={() => { setCurrentView('home'); setIsAuthenticated(false); }} />;
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-[#0a1128]">
        <nav className="bg-[#0a1128]/95 backdrop-blur-sm border-b border-blue-900/20 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                ACM
              </button>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center px-4 py-16">
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 mb-8">Sign in to your ACM BVCOE account</p>

            <form onSubmit={(e) => { e.preventDefault(); const role = (document.getElementById('role') as HTMLSelectElement).value as 'member' | 'core-member' | 'head-of-dept'; setUserRole(role); setIsAuthenticated(true); setCurrentView('dashboard'); }} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                >
                  <option value="member">Member</option>
                  <option value="core-member">Core Member</option>
                  <option value="head-of-dept">Head of Department</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentView('signup')}
                  className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
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
      <div className="min-h-screen bg-[#0a1128]">
        <nav className="bg-[#0a1128]/95 backdrop-blur-sm border-b border-blue-900/20 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                ACM
              </button>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join ACM BVCOE</h2>
            <p className="text-gray-600 mb-8">Create your account to get started</p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <select
                  id="position"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                >
                  <option value="member">Member</option>
                  <option value="core-member">Core Member</option>
                  <option value="head-of-dept">Head of Department</option>
                </select>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentView('login')}
                  className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
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
    <div className="min-h-screen bg-[#0a1128]">
      {/* Navigation */}
      <nav className="bg-[#0a1128]/95 backdrop-blur-sm border-b border-blue-900/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-white">ACM</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a>
              <a href="#team" className="text-gray-300 hover:text-blue-400 transition-colors">Team</a>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('login')}
                  className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('signup')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-blue-900/20">
              <a href="#about" className="block text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <a href="#features" className="block text-gray-300 hover:text-blue-400 transition-colors">Features</a>
              <a href="#team" className="block text-gray-300 hover:text-blue-400 transition-colors">Team</a>
              <div className="pt-4 space-y-3 border-t border-blue-900/20">
                <button
                  onClick={() => setCurrentView('login')}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('signup')}
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 bg-[#0a1128]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 font-medium flex items-center">
              <Star className="mr-2" size={20} />
              Modern Task Management
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Streamline Your ACM
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Team Collaboration
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Manage tasks efficiently across your organization hierarchy. From core members to department executives, keep everyone aligned and productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Access Dashboard
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="bg-transparent hover:bg-blue-900/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-blue-900/30">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20 bg-[#0f1941]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About ACM BVCOE</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are a vibrant community of computing enthusiasts at Bharati Vidyapeeth's College of Engineering,
            dedicated to advancing knowledge in computing, fostering innovation, and building technical excellence
            through collaborative learning and hands-on projects.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 bg-[#0a1128]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8 hover:border-blue-500/30 transition-all">
              <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Hierarchical Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Core members assign to department heads, with built-in oversight and workflow control.
              </p>
            </div>

            <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8 hover:border-blue-500/30 transition-all">
              <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <CheckSquare className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Task Tracking</h3>
              <p className="text-gray-400 leading-relaxed">
                Accept, reject, or complete tasks with built-in deadline monitoring and status updates.
              </p>
            </div>

            <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8 hover:border-blue-500/30 transition-all">
              <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Performance Insights</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time analytics and progress tracking for better team performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-4 py-20 bg-[#0f1941]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Core Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the dedicated leaders driving our community forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#0a1128] border border-blue-900/20 rounded-xl p-8 text-center hover:border-blue-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="President"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Satvik Phour</h3>
              <p className="text-blue-400 font-semibold mb-4">President</p>
              <p className="text-gray-400 leading-relaxed">
                Leading ACM BVCOE with vision and passion for innovation in computing education
              </p>
            </div>

            <div className="bg-[#0a1128] border border-blue-900/20 rounded-xl p-8 text-center hover:border-blue-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Vice President"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sanskar Kannaujia</h3>
              <p className="text-blue-400 font-semibold mb-4">Vice President</p>
              <p className="text-gray-400 leading-relaxed">
                Coordinating events and fostering collaboration across our community
              </p>
            </div>

            <div className="bg-[#0a1128] border border-blue-900/20 rounded-xl p-8 text-center hover:border-blue-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Technical Lead"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Aisha Patel</h3>
              <p className="text-blue-400 font-semibold mb-4">Technical Lead</p>
              <p className="text-gray-400 leading-relaxed">
                Driving technical excellence and mentoring aspiring developers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Begin?</h2>
          <p className="text-xl text-blue-50 mb-8 leading-relaxed">
            Join ACM BVCOE today and become part of our vibrant community advancing computing education and innovation
          </p>
          <button
            onClick={() => setCurrentView('signup')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1128] border-t border-blue-900/20 px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">ACM BVCOE</div>
          <p className="text-gray-400">© 2025 ACM Society of BVCOE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
