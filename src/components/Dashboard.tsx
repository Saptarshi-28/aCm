import { useState, useRef } from 'react';
import { User, CheckSquare, ListTodo, Clock, Settings, LogOut, XCircle, ArrowLeft, Moon, Sun, Camera } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
const acmLogo = "https://bvcoe.acm.org/static/media/ACM-BVP-logo.6425d80f.png";

interface DashboardProps {
  onLogout: () => void;
  userRole: 'member' | 'core-member' | 'head-of-dept';
  userEmail: string;
}

type DashboardSection = 'profile' | 'total-tasks' | 'available-tasks' | 'current-tasks' | 'settings';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'ongoing' | 'completed' | 'rejected' | 'available';
  rejectionReason?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  branch: string;
  section: string;
  department: string;
  profilePic: string | null;
}

export default function Dashboard({ onLogout, userRole, userEmail }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('profile');
  const [taskFilter, setTaskFilter] = useState<'all' | 'completed' | 'ongoing' | 'rejected'>('all');
  const [rejectionReason, setRejectionReason] = useState('');
  const [taskToReject, setTaskToReject] = useState<Task | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Meera',
    lastName: 'Nagpal',
    email: userEmail,
    branch: '',
    section: '',
    department: '',
    profilePic: null
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Update the ACM BVCOE website with new design',
      deadline: '2025-03-20',
      status: 'ongoing',
    },
    {
      id: '2',
      title: 'Event Planning',
      description: 'Organize the upcoming hackathon event',
      deadline: '2025-03-25',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Social Media Campaign',
      description: 'Create content for social media platforms',
      deadline: '2025-03-18',
      status: 'rejected',
      rejectionReason: 'Not enough time to complete',
    },
    {
      id: '4',
      title: 'Workshop Content Creation',
      description: 'Create presentation slides for React workshop',
      deadline: '2025-04-01',
      status: 'available',
    },
    {
      id: '5',
      title: 'Member Onboarding',
      description: 'Prepare onboarding materials for new members',
      deadline: '2025-04-05',
      status: 'available',
    },
  ]);

  const sidebarItems = [
    { id: 'profile' as DashboardSection, label: 'My Profile', icon: User },
    { id: 'total-tasks' as DashboardSection, label: 'Total Tasks', icon: CheckSquare },
    { id: 'available-tasks' as DashboardSection, label: 'Available Tasks', icon: ListTodo },
    { id: 'current-tasks' as DashboardSection, label: 'Current Tasks', icon: Clock },
    { id: 'settings' as DashboardSection, label: 'Settings', icon: Settings },
  ];

  const departments = [
    'Technical',
    'Design',
    'Content and Documentation',
    'Social Media',
    'Event and Management',
    'Outreach'
  ];

  const getInitials = () => {
    return `${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(0)}`;
  };

  const showConfirmationMessage = (message: string) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleAcceptTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'ongoing' as const } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    showConfirmationMessage(`Task "${task?.title}" has been accepted!`);
  };

  const handleRejectTask = (task: Task) => {
    setTaskToReject(task);
    setShowRejectModal(true);
    setRejectionReason('');
  };

  const confirmRejectTask = () => {
    if (rejectionReason.trim() && taskToReject) {
      setTasks(tasks.map(task =>
        task.id === taskToReject.id
          ? { ...task, status: 'rejected' as const, rejectionReason }
          : task
      ));
      showConfirmationMessage(`Task "${taskToReject.title}" has been rejected.`);
      setShowRejectModal(false);
      setTaskToReject(null);
      setRejectionReason('');
    }
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    showConfirmationMessage(`Task "${task?.title}" has been completed!`);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showConfirmationMessage('Profile updated successfully!');
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile({ ...userProfile, profilePic: reader.result as string });
        showConfirmationMessage('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    setActiveSection('profile');
  };

  const bgClass = isDarkMode ? 'bg-[#0a1128]' : 'bg-gray-50';
  const cardBgClass = isDarkMode ? 'bg-[#0f1941]' : 'bg-white';
  const borderClass = isDarkMode ? 'border-blue-900/20' : 'border-gray-200';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedTextClass = isDarkMode ? 'text-white' : 'text-gray-600';
  const inputBgClass = isDarkMode ? 'bg-[#0a1128]' : 'bg-gray-50';

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8 animate-fade-in`}>
            <h2 className={`text-3xl font-bold ${textClass} mb-6`}>My Profile</h2>
            <div className="flex items-center mb-8">
              <div className="relative">
                {userProfile.profilePic ? (
                  <img
                    src={userProfile.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                    {getInitials()}
                  </div>
                )}
                {isEditingProfile && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
              <div className="ml-6">
                <h3 className={`text-2xl font-semibold ${textClass}`}>
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p className={mutedTextClass}>{userProfile.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {userRole === 'member' ? 'Member' : userRole === 'core-member' ? 'Core Member' : 'Head of Department'}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>First Name</label>
                <input
                  type="text"
                  value={userProfile.firstName}
                  onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                  disabled={!isEditingProfile}
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 transition-colors duration-200 disabled:opacity-70`}
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>Last Name</label>
                <input
                  type="text"
                  value={userProfile.lastName}
                  onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                  disabled={!isEditingProfile}
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 transition-colors duration-200 disabled:opacity-70`}
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-200 md:col-span-2">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  disabled
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} opacity-70 cursor-not-allowed`}
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>Branch</label>
                <input
                  type="text"
                  value={userProfile.branch}
                  onChange={(e) => setUserProfile({...userProfile, branch: e.target.value})}
                  disabled={!isEditingProfile}
                  placeholder=""
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 transition-colors duration-200 disabled:opacity-70`}
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>Section</label>
                <input
                  type="text"
                  value={userProfile.section}
                  onChange={(e) => setUserProfile({...userProfile, section: e.target.value})}
                  disabled={!isEditingProfile}
                  placeholder=""
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 transition-colors duration-200 disabled:opacity-70`}
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-200 md:col-span-2">
                <label className={`block text-lg font-medium ${mutedTextClass} mb-2`}>Department / Chapter</label>
                <select
                  value={userProfile.department}
                  onChange={(e) => setUserProfile({...userProfile, department: e.target.value})}
                  disabled={!isEditingProfile}
                  className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 transition-colors duration-200 disabled:opacity-70`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className={`px-6 py-3 ${inputBgClass} ${textClass} rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 border ${borderClass}`}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        );

      case 'total-tasks':
        const filteredTasks = tasks.filter(task =>
          task.status !== 'available' && (taskFilter === 'all' || task.status === taskFilter)
        );
        return (
          <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8 animate-fade-in`}>
            <h2 className={`text-3xl font-bold ${textClass} mb-6`}>Total Tasks</h2>
            <div className="flex gap-4 mb-6 flex-wrap">
              {['all', 'completed', 'ongoing', 'rejected'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter as typeof taskFilter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    taskFilter === filter
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : `${inputBgClass} ${mutedTextClass} hover:${cardBgClass} border ${borderClass}`
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {filteredTasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`border ${borderClass} rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-semibold ${textClass}`}>{task.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : task.status === 'ongoing'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className={`${mutedTextClass} mb-3`}>{task.description}</p>
                  <div className={`flex items-center text-sm ${mutedTextClass}`}>
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  {task.status === 'rejected' && task.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
                      <p className="text-lg text-red-400">
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
        const availableTasks = tasks.filter(task => task.status === 'available');
        return (
          <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8 animate-fade-in`}>
            <h2 className={`text-3xl font-bold ${textClass} mb-6`}>Available Tasks</h2>
            <div className="space-y-4">
              {availableTasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`border border-blue-400 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className={`text-2xl font-semibold ${textClass} p-2 mb-3`}>{task.title}</h3>
                  <p className={`${mutedTextClass} text-lg p-2 mb-3`}>{task.description}</p>
                  <div className={`flex items-center text-sm ${mutedTextClass} mb-4`}>
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptTask(task.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                    >
                      Accept Task
                    </button>
                    <button
                      onClick={() => handleRejectTask(task)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
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
        const currentTasks = tasks.filter(task => task.status === 'ongoing');
        return (
          <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8 animate-fade-in`}>
            <h2 className={`text-3xl font-bold ${textClass} mb-6`}>Current Tasks</h2>
            <div className="space-y-4">
              {currentTasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`border ${borderClass} rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className={`text-xl font-semibold ${textClass} mb-3`}>{task.title}</h3>
                  <p className={`${mutedTextClass} mb-3`}>{task.description}</p>
                  <div className={`flex items-center text-sm ${mutedTextClass} mb-4`}>
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                  >
                    Mark as Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8 animate-fade-in`}>
            <h2 className={`text-3xl font-bold ${textClass} mb-6`}>Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold ${textClass} mb-3`}>Account Settings</h3>
                <div className="space-y-4">
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="mr-3 w-5 h-5 cursor-pointer accent-blue-500"
                        defaultChecked
                      />
                      <span className={`${mutedTextClass} group-hover:${textClass} transition-colors`}>
                        Receive email notifications for new tasks
                      </span>
                    </label>
                  </div>
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="mr-3 w-5 h-5 cursor-pointer accent-blue-500"
                        defaultChecked
                      />
                      <span className={`${mutedTextClass} group-hover:${textClass} transition-colors`}>
                        Receive reminders before task deadlines
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className={`pt-6 border-t ${borderClass}`}>
                <h3 className={`text-lg font-semibold ${textClass} mb-3`}>Change Password</h3>
                <div className="space-y-4">
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={`block text-sm font-medium ${mutedTextClass} mb-2`}>Current Password</label>
                    <input
                      type="password"
                      className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={`block text-sm font-medium ${mutedTextClass} mb-2`}>New Password</label>
                    <input
                      type="password"
                      className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
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
    <div className={`min-h-screen ${bgClass} flex`}>
      <aside className={`w-64 ${cardBgClass} border-r ${borderClass} p-6 animate-slide-in flex flex-col`}>
        <div className="mb-8">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 mb-2 hover:opacity-80 transition-opacity"
          >
            <img src={acmLogo} alt="ACM BVCOE Logo" className="h-10 w-auto -mr-1" />
            <span className={`text-3xl font-bold ${textClass}`}>ACM</span>
          </button>
          <p className={`pt-4 text-xl font-semibold ${mutedTextClass}`}>Member Dashboard</p>
        </div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : `${mutedTextClass} hover:${cardBgClass} hover:${textClass}`
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={`pt-6 border-t ${borderClass} space-y-3`}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center px-4 py-3 ${mutedTextClass} hover:${textClass} rounded-lg transition-all duration-300 transform hover:scale-105`}
          >
            {isDarkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
            <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {showRejectModal && taskToReject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className={`${cardBgClass} border ${borderClass} rounded-2xl p-8 w-full max-w-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-scale-in m-4`}>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className={`mr-4 p-2 hover:${inputBgClass} rounded-lg transition-all duration-200 group`}
              >
                <ArrowLeft size={24} className={mutedTextClass} />
              </button>
              <div className="flex items-center">
                <div className="bg-red-500/20 p-3 rounded-xl mr-4">
                  <XCircle size={32} className="text-red-400" />
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${textClass}`}>Reject Task</h2>
                  <p className={mutedTextClass}>Please provide a reason for rejection</p>
                </div>
              </div>
            </div>

            <div className={`mb-6 p-4 ${inputBgClass} border ${borderClass} rounded-lg animate-fade-in`}>
              <h3 className={`text-lg font-semibold ${textClass} mb-2`}>{taskToReject.title}</h3>
              <p className={`${mutedTextClass} text-sm`}>{taskToReject.description}</p>
            </div>

            <div className="mb-6">
              <label className={`block text-lg font-medium ${textClass} mb-3`}>
                Reason for Rejection <span className="text-red-400">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className={`w-full px-4 py-3 ${inputBgClass} border ${borderClass} rounded-lg ${textClass} resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-500/50`}
                rows={6}
                placeholder="Enter your reason for rejecting this task..."
                autoFocus
              />
              <p className={`mt-2 text-sm ${mutedTextClass}`}>
                {rejectionReason.length} / 500 characters
              </p>
            </div>

            <div className={`${inputBgClass} border ${borderClass} rounded-lg p-4 mb-6 animate-fade-in`}>
              <h4 className={`text-sm font-semibold ${textClass} mb-2`}>Common Rejection Reasons:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Insufficient time',
                  'Lack of resources',
                  'Outside expertise',
                  'Conflicting priorities',
                  'Unclear requirements',
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setRejectionReason(reason)}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm hover:bg-blue-500/20 transition-all duration-200 transform hover:scale-105 border border-blue-500/30"
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={confirmRejectTask}
                disabled={!rejectionReason.trim()}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-red-500/50"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className={`flex-1 px-6 py-3 ${inputBgClass} ${textClass} rounded-lg font-semibold hover:${cardBgClass} transition-all duration-300 transform hover:scale-105 border ${borderClass} hover:border-blue-500/50`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3">
            <CheckSquare size={24} />
            <span className="font-medium">{confirmationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
