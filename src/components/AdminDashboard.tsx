import { useState } from 'react';
import { User, Plus, ListTodo, Settings, LogOut, Calendar, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  userRole: 'core-member' | 'head-of-dept';
}

type AdminSection = 'create-task' | 'manage-tasks' | 'profile' | 'settings';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  status: 'available' | 'ongoing' | 'completed' | 'rejected';
}

export default function AdminDashboard({ onLogout, userRole }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('create-task');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Update the ACM BVCOE website with new design',
      assignedTo: 'John Doe',
      deadline: '2025-03-20',
      status: 'ongoing',
    },
    {
      id: '2',
      title: 'Event Planning',
      description: 'Organize the upcoming hackathon event',
      assignedTo: 'Jane Smith',
      deadline: '2025-03-25',
      status: 'completed',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      status: 'available',
    };
    setTasks([...tasks, newTask]);
    setFormData({ title: '', description: '', assignedTo: '', deadline: '' });
    setShowCreateModal(false);
  };

  const sidebarItems = [
    { id: 'create-task' as AdminSection, label: 'Create Task', icon: Plus },
    { id: 'manage-tasks' as AdminSection, label: 'Manage Tasks', icon: ListTodo },
    { id: 'profile' as AdminSection, label: 'My Profile', icon: User },
    { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'create-task':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                  placeholder="Enter task description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assigned To (Full Name)
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter member's full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
              >
                Create Task
              </button>
            </form>
          </div>
        );

      case 'manage-tasks':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Manage Tasks</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                <Plus size={20} className="mr-2" />
                Create Task
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-blue-900/20 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : task.status === 'ongoing'
                          ? 'bg-blue-500/20 text-blue-400'
                          : task.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-100 text-gray-300'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>Assigned to: {task.assignedTo}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showCreateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Create New Task</h3>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateTask} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter task title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                        placeholder="Enter task description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Assigned To (Full Name)
                      </label>
                      <input
                        type="text"
                        value={formData.assignedTo}
                        onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter member's full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
                      >
                        Create Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="bg-[#0f1941] border border-blue-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">My Profile</h2>
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
                AD
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Admin User</h3>
                <p className="text-gray-400">admin@bvcoe.edu</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {userRole === 'head-of-dept' ? 'Head of Department' : 'Core Member'}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value="Admin User"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value="admin@bvcoe.edu"
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/30 rounded-lg text-white"
                  readOnly
                />
              </div>
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
                      <span className="text-gray-300">Receive email notifications for task updates</span>
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
          <p className="text-sm text-gray-400">
            {userRole === 'head-of-dept' ? 'Head Dashboard' : 'Core Member Dashboard'}
          </p>
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
                    : 'text-gray-300 hover:bg-gray-100'
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
