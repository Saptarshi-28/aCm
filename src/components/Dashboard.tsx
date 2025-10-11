import { useState } from 'react';
import { User, CheckSquare, ListTodo, Clock, Settings, LogOut, Camera } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  userRole: 'member' | 'core-member' | 'head-of-dept';
}

type DashboardSection = 'profile' | 'total-tasks' | 'available-tasks' | 'current-tasks' | 'settings';

export default function Dashboard({ onLogout, userRole }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('profile');
  const [taskFilter, setTaskFilter] = useState<'all' | 'completed' | 'ongoing' | 'rejected'>('all');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@bvcoe.edu',
    branch: 'CSE',
    year: '2',
    section: 'CSE2',
    department: 'Technical',
    profilePicture: '',
  });

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          profilePicture: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  const branches = ['CSE', 'ECE', 'IT', 'EEE', 'MECH', 'CIVIL'];
  const years = ['1', '2', '3', '4'];
  const sections = ['CSE1', 'CSE2', 'CSE3', 'ECE1', 'ECE2', 'ECE3', 'IT1', 'IT2'];
  const departments = [
    'Technical',
    'Social Media',
    'Content & Documentation',
    'Design',
    'Marketing',
    'Events',
    'Operations'
  ];

  const sidebarItems = [
    { id: 'profile' as DashboardSection, label: 'My Profile', icon: User },
    { id: 'total-tasks' as DashboardSection, label: 'Total Tasks', icon: CheckSquare },
    { id: 'available-tasks' as DashboardSection, label: 'Available Tasks', icon: ListTodo },
    { id: 'current-tasks' as DashboardSection, label: 'Current Tasks', icon: Clock },
    { id: 'settings' as DashboardSection, label: 'Settings', icon: Settings },
  ];

  const mockTasks = [
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Update the ACM BVCOE website with new design',
      deadline: '2025-03-20',
      status: 'ongoing' as const,
    },
    {
      id: '2',
      title: 'Event Planning',
      description: 'Organize the upcoming hackathon event',
      deadline: '2025-03-25',
      status: 'completed' as const,
    },
    {
      id: '3',
      title: 'Social Media Campaign',
      description: 'Create content for social media platforms',
      deadline: '2025-03-18',
      status: 'rejected' as const,
      rejectionReason: 'Not enough time to complete',
    },
  ];

  const mockAvailableTasks = [
    {
      id: '4',
      title: 'Workshop Content Creation',
      description: 'Create presentation slides for React workshop',
      deadline: '2025-04-01',
    },
    {
      id: '5',
      title: 'Member Onboarding',
      description: 'Prepare onboarding materials for new members',
      deadline: '2025-04-05',
    },
  ];

  const handleRejectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowRejectModal(true);
  };

  const confirmRejectTask = () => {
    if (rejectionReason.trim()) {
      alert(`Task ${selectedTaskId} rejected with reason: ${rejectionReason}`);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedTaskId(null);
    }
  };

  const cancelRejectTask = () => {
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedTaskId(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              My Profile
            </h2>
            
            {/* Profile Picture Section */}
            <div className="flex items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg shadow-cyan-500/25 overflow-hidden">
                  {profileData.profilePicture ? (
                    <img 
                      src={profileData.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    'JD'
                  )}
                </div>
                <label className="absolute bottom-0 right-4 bg-cyan-500 hover:bg-cyan-600 text-white p-1 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{profileData.fullName}</h3>
                <p className="text-gray-400">{profileData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                  {userRole === 'head-of-dept' ? 'Head of Department' : userRole === 'core-member' ? 'Core Member' : 'Member'} - {profileData.department}
                </span>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Branch</label>
                  <select
                    value={profileData.branch}
                    onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch} className="bg-[#0a1128]">{branch}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <select
                    value={profileData.year}
                    onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  >
                    {years.map(year => (
                      <option key={year} value={year} className="bg-[#0a1128]">{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Section</label>
                  <select
                    value={profileData.section}
                    onChange={(e) => setProfileData({ ...profileData, section: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  >
                    {sections.map(section => (
                      <option key={section} value={section} className="bg-[#0a1128]">{section}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ACM Department</label>
                <select
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-[#0a1128]">{dept}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
              >
                Update Profile
              </button>
            </form>
          </div>
        );

      case 'total-tasks':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Total Tasks
            </h2>
            <div className="flex gap-4 mb-6">
              {['all', 'ongoing', 'completed', 'rejected'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    taskFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-[#0a1128] text-gray-300 border border-blue-900/50 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {mockTasks
                .filter((task) => taskFilter === 'all' || task.status === taskFilter)
                .map((task) => (
                <div 
                  key={task.id} 
                  className="border border-blue-900/30 rounded-xl p-6 bg-[#0a1128]/50 backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.01] group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {task.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        task.status === 'completed'
                          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30'
                          : task.status === 'ongoing'
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
                    {task.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  {task.status === 'rejected' && task.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-white">
                        <strong>Rejection Reason:</strong> {task.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'available-tasks':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Available Tasks
            </h2>
            <div className="space-y-4">
              {mockAvailableTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="border border-blue-900/30 rounded-xl p-6 bg-[#0a1128]/50 backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.01] group"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
                    {task.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-400 mb-4 group-hover:text-cyan-300 transition-colors">
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                      Accept Task
                    </button>
                    <button
                      onClick={() => handleRejectTask(task.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
                    >
                      Reject Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'current-tasks':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Current Tasks
            </h2>
            <div className="space-y-4">
              {mockTasks
                .filter((task) => task.status === 'ongoing')
                .map((task) => (
                  <div 
                    key={task.id} 
                    className="border border-blue-900/30 rounded-xl p-6 bg-[#0a1128]/50 backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.01] group"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
                      {task.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 mb-4 group-hover:text-cyan-300 transition-colors">
                      <Clock size={16} className="mr-2" />
                      <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25">
                      Mark as Complete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-[#0a1128]/50 rounded-lg border border-blue-900/30 hover:border-cyan-500/30 transition-colors duration-300">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4 bg-cyan-400"></div>
                      </div>
                      <span className="ml-3 text-gray-300">Receive email notifications for new tasks</span>
                    </label>
                  </div>
                  <div className="flex items-center p-4 bg-[#0a1128]/50 rounded-lg border border-blue-900/30 hover:border-cyan-500/30 transition-colors duration-300">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4 bg-cyan-400"></div>
                      </div>
                      <span className="ml-3 text-gray-300">Receive reminders before task deadlines</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-blue-900/20">
                <h3 className="text-lg font-semibold text-white mb-3">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Please provide a reason for rejection:</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
              rows={4}
              placeholder="Enter your reason here..."
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={confirmRejectTask}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                OK
              </button>
              <button
                onClick={cancelRejectTask}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#0f1941] to-[#1a2b5f] flex">
        <aside className="w-64 bg-[#0f1941]/80 backdrop-blur-sm border-r border-blue-900/30 p-6 shadow-2xl shadow-blue-500/10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ACM BVCOE
            </h1>
            <p className="text-sm text-gray-400 mt-1">Member Dashboard</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                      : 'text-gray-300 hover:bg-blue-500/20 hover:text-cyan-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 transition-all duration-300 ${
                      activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 mt-8 text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-300 rounded-xl transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <LogOut size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Logout</span>
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </>
  );
}