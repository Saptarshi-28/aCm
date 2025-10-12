import { useState } from 'react';
import { User, Plus, ListTodo, Settings, LogOut, Calendar, X, RefreshCw, Camera, Users, Check, X as XIcon, Phone } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  userRole: 'core-member' | 'head-of-dept';
}

type AdminSection = 'create-task' | 'manage-tasks' | 'profile' | 'settings' | 'member-requests';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  status: 'available' | 'ongoing' | 'completed' | 'rejected';
  rejectionReason?: string;
}

interface MemberRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: 'member' | 'core-member' | 'head-of-dept';
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
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
    {
      id: '3',
      title: 'Social Media Campaign',
      description: 'Create and manage social media posts for the upcoming workshop',
      assignedTo: 'Mike Johnson',
      deadline: '2025-03-18',
      status: 'rejected',
      rejectionReason: 'Currently overloaded with academic assignments and cannot take on additional tasks this week.'
    },
  ]);

  const [memberRequests, setMemberRequests] = useState<MemberRequest[]>([
    {
      id: '1',
      fullName: 'Alice Johnson',
      phoneNumber: '+91 98765 43210',
      email: 'alice.johnson@bvcoe.edu',
      role: 'member',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      fullName: 'Bob Smith',
      phoneNumber: '+91 87654 32109',
      email: 'bob.smith@bvcoe.edu',
      role: 'member',
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'pending'
    },
    {
      id: '3',
      fullName: 'Carol Davis',
      phoneNumber: '+91 76543 21098',
      email: 'carol.davis@bvcoe.edu',
      role: 'member',
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'pending'
    },
    {
      id: '4',
      fullName: 'David Wilson',
      phoneNumber: '+91 65432 10987',
      email: 'david.wilson@bvcoe.edu',
      role: 'member',
      submittedAt: '2024-01-12T16:45:00Z',
      status: 'pending'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
  });

  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@bvcoe.edu',
    branch: 'CSE',
    year: '2',
    section: 'CSE2',
    department: 'Technical',
    profilePicture: '',
  });

  const [reassignTaskId, setReassignTaskId] = useState<string | null>(null);
  const [newAssignee, setNewAssignee] = useState('');

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

  const handleReassign = (taskId: string) => {
    if (!newAssignee.trim()) return;
    
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            assignedTo: newAssignee, 
            status: 'ongoing',
            rejectionReason: undefined
          }
        : task
    ));
    setReassignTaskId(null);
    setNewAssignee('');
  };

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
    // Handle profile update logic here
    console.log('Profile updated:', profileData);
  };

  const handleMemberRequest = (requestId: string, action: 'approve' | 'reject') => {
    setMemberRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
          : request
      )
    );
  };

  const branches = ['CSE', 'IT', 'ECE','EEE', 'MECH', 'CIVIL'];
  const years = ['1', '2', '3', '4'];
  const sections = ['CSE1', 'CSE2', 'CSE3', 'IT1', 'IT2', 'ECE1', 'ECE2'];
  const departments = [
    'Technical',
    'Social Media',
    'Content & Documentation',
    'Design',
    'Marketing',
    'Event Management'
  ];

  const sidebarItems = [
    { id: 'create-task' as AdminSection, label: 'Create Task', icon: Plus },
    { id: 'manage-tasks' as AdminSection, label: 'Manage Tasks', icon: ListTodo },
    { id: 'member-requests' as AdminSection, label: 'Member Requests', icon: Users },
    { id: 'profile' as AdminSection, label: 'My Profile', icon: User },
    { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'head-of-dept':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30';
      case 'core-member':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30';
      case 'member':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'head-of-dept':
        return 'Head of Department';
      case 'core-member':
        return 'Core Member';
      case 'member':
        return 'Member';
      default:
        return role;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'create-task':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Create New Task
            </h2>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
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
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50 h-32 resize-none"
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
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
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
                  className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Create Task
              </button>
            </form>
          </div>
        );

      case 'manage-tasks':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Manage Tasks
              </h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <Plus size={20} className="mr-2" />
                Create Task
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
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
                          : task.status === 'rejected'
                          ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border border-gray-500/30'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
                    {task.description}
                  </p>
                  
                  {/* Rejection Reason */}
                  {task.status === 'rejected' && task.rejectionReason && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 text-sm">!</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-white">Rejection Reason</h4>
                          <p className="text-sm text-white mt-1">{task.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center group-hover:text-cyan-300 transition-colors">
                      <User size={16} className="mr-2" />
                      <span>Assigned to: {task.assignedTo}</span>
                    </div>
                    <div className="flex items-center group-hover:text-cyan-300 transition-colors">
                      <Calendar size={16} className="mr-2" />
                      <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Reassign Button for Rejected Tasks */}
                  {task.status === 'rejected' && (
                    <div className="mt-4 pt-4 border-t border-red-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-300">This task needs reassignment</span>
                        {reassignTaskId === task.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={newAssignee}
                              onChange={(e) => setNewAssignee(e.target.value)}
                              placeholder="Enter new assignee"
                              className="px-3 py-1 bg-[#0a1128] border border-cyan-500/50 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                            <button
                              onClick={() => handleReassign(task.id)}
                              className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded text-sm font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setReassignTaskId(null)}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium hover:bg-gray-700 transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setReassignTaskId(task.id)}
                            className="flex items-center px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25"
                          >
                            <RefreshCw size={14} className="mr-1" />
                            Reassign Task
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showCreateModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-cyan-500/30 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Create New Task
                    </h3>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-cyan-300 hover:scale-110 transition-all duration-300"
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
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
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
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50 h-32 resize-none"
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
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
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
                        className="w-full px-4 py-3 bg-[#0a1128] border border-blue-900/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 hover:border-blue-400/50"
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                      >
                        Create Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-6 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
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

      case 'member-requests':
        return (
          <div className="bg-gradient-to-br from-[#0f1941] to-[#1a2b5f] border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Member Requests
              </h2>
              <div className="text-sm text-gray-400">
                {memberRequests.filter(r => r.status === 'pending').length} pending requests
              </div>
            </div>

            <div className="grid gap-6">
              {memberRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="border border-blue-900/30 rounded-xl p-6 bg-[#0a1128]/50 backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.01] group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                        {request.fullName}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {request.email}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          request.status === 'approved'
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30'
                            : request.status === 'rejected'
                            ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30'
                            : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(request.role)}`}>
                        {getRoleDisplayName(request.role)}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                        <Phone size={16} className="mr-3 text-cyan-400" />
                        <span>{request.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                        <User size={16} className="mr-3 text-blue-400" />
                        <span>Applied as: {getRoleDisplayName(request.role)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                        <Calendar size={16} className="mr-3 text-purple-400" />
                        <span>Applied: {new Date(request.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                        <span className="w-6 mr-3 text-center">⏰</span>
                        <span>{new Date(request.submittedAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-3 mt-6 pt-4 border-t border-amber-500/20">
                      <button
                        onClick={() => handleMemberRequest(request.id, 'approve')}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                      >
                        <Check size={16} className="mr-2" />
                        Approve Request
                      </button>
                      <button
                        onClick={() => handleMemberRequest(request.id, 'reject')}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
                      >
                        <XIcon size={16} className="mr-2" />
                        Reject Request
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {memberRequests.length === 0 && (
              <div className="text-center py-12">
                <Users size={64} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Member Requests</h3>
                <p className="text-gray-500">All member requests have been processed.</p>
              </div>
            )}
          </div>
        );

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
                    'AD'
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
                  {userRole === 'head-of-dept' ? 'Head of Department' : 'Core Member'} - {profileData.department}
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
                      <span className="ml-3 text-gray-300">Receive email notifications for task updates</span>
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#0f1941] to-[#1a2b5f] flex">
      <aside className="w-64 bg-[#0f1941]/80 backdrop-blur-sm border-r border-blue-900/30 p-6 shadow-2xl shadow-blue-500/10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            ACM BVCOE
          </h1>
          <p className="text-sm text-gray-400 mt-1">
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
  );
}