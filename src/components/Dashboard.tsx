import { useState } from 'react';
import { User, CheckSquare, ListTodo, Clock, Settings, LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  userRole: 'member' | 'core-member' | 'head-of-dept';
}

type DashboardSection = 'profile' | 'total-tasks' | 'available-tasks' | 'current-tasks' | 'settings';

export default function Dashboard({ onLogout, userRole }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('profile');

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

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">My Profile</h2>
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
                JD
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">John Doe</h3>
                <p className="text-gray-400">john.doe@bvcoe.edu</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  Member
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value="John Doe"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value="john.doe@bvcoe.edu"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white"
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 'total-tasks':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Total Tasks</h2>
            <div className="flex gap-4 mb-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                All
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-300 rounded-lg font-medium hover:bg-gray-200 transition">
                Completed
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-300 rounded-lg font-medium hover:bg-gray-200 transition">
                Ongoing
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-300 rounded-lg font-medium hover:bg-gray-200 transition">
                Rejected
              </button>
            </div>
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div key={task.id} className="border border-blue-900/20 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{task.title}</h3>
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
                  <p className="text-gray-400 mb-3">{task.description}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  {task.status === 'rejected' && task.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">
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
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Available Tasks</h2>
            <div className="space-y-4">
              {mockAvailableTasks.map((task) => (
                <div key={task.id} className="border border-blue-900/20 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="text-xl font-semibold text-white mb-3">{task.title}</h3>
                  <p className="text-gray-400 mb-3">{task.description}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Clock size={16} className="mr-2" />
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                      Accept Task
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Please provide a reason for rejection:');
                        if (reason) {
                          alert(`Task rejected with reason: ${reason}`);
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
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
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Current Tasks</h2>
            <div className="space-y-4">
              {mockTasks
                .filter((task) => task.status === 'ongoing')
                .map((task) => (
                  <div key={task.id} className="border border-blue-900/20 rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-white mb-3">{task.title}</h3>
                    <p className="text-gray-400 mb-3">{task.description}</p>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Clock size={16} className="mr-2" />
                      <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                      Mark as Complete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Notifications</label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-gray-300">Receive email notifications for new tasks</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Task Reminders</label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-gray-300">Receive reminders before task deadlines</span>
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
                      className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
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
    <div className="min-h-screen bg-[#0a1128] flex">
      <aside className="w-64 bg-[#0f1941] border-r border-blue-900/20 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">ACM BVCOE</h1>
          <p className="text-sm text-gray-400">Member Dashboard</p>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0a1128]'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 mt-8 text-red-400 hover:bg-red-900/20 rounded-lg transition"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
