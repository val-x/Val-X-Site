import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/learning/BackgroundEffects";

const mockProjects = [
  {
    id: 1,
    name: "AI Integration Platform",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-03-15",
    team: ["John D.", "Sarah M.", "Mike R."],
    priority: "High",
    description: "Enterprise AI integration platform for business automation",
  },
  {
    id: 2,
    name: "ML Training Portal",
    status: "Planning",
    progress: 25,
    dueDate: "2024-04-01",
    team: ["Alex K.", "Emma S."],
    priority: "Medium",
    description: "Machine learning training portal for data scientists",
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    status: "Review",
    progress: 90,
    dueDate: "2024-02-28",
    team: ["Chris L.", "Lisa P.", "Tom H."],
    priority: "High",
    description: "Real-time analytics dashboard for business metrics",
  },
];

const mockTeamMetrics = {
  performance: 92,
  satisfaction: 88,
  productivity: 85,
  collaboration: 90,
  members: [
    { name: "John Doe", role: "Lead Developer", tasks: 12, completed: 10 },
    { name: "Sarah Miller", role: "UI/UX Designer", tasks: 8, completed: 7 },
    { name: "Mike Ross", role: "Backend Developer", tasks: 15, completed: 13 },
    { name: "Emma Smith", role: "Data Scientist", tasks: 10, completed: 8 },
  ],
};

const mockAnalytics = {
  weeklyProgress: [65, 70, 68, 74, 78, 82, 80],
  taskCompletion: {
    completed: 45,
    inProgress: 15,
    pending: 8,
  },
  timeSpent: {
    development: 120,
    planning: 45,
    review: 25,
    meetings: 30,
  },
};

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-white font-medium">{project.name}</h3>
        <p className="text-sm text-gray-400">{project.description}</p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.priority === "High"
            ? "bg-red-500/20 text-red-300"
            : "bg-yellow-500/20 text-yellow-300"
        }`}
      >
        {project.priority}
      </span>
    </div>

    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {project.team.map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                to-fuchsia-500 flex items-center justify-center text-white text-xs font-medium 
                ring-2 ring-black"
            >
              {member.split(" ")[0][0]}
              {member.split(" ")[1][0]}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-400">Due: {project.dueDate}</span>
      </div>
    </div>
  </motion.div>
);

const TeamMetricsCard = ({ metrics }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(metrics)
        .filter(([key]) => typeof metrics[key] === "number")
        .map(([key, value]) => (
          <div
            key={key}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h4 className="text-gray-400 text-sm capitalize">{key}</h4>
            <p className="text-2xl font-bold text-white mt-1">{value}%</p>
          </div>
        ))}
    </div>

    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
      <div className="space-y-4">
        {metrics.members.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{member.name}</p>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
            <div className="text-right">
              <p className="text-white">
                {member.completed}/{member.tasks} tasks
              </p>
              <div className="h-1.5 w-24 bg-white/5 rounded-full mt-1">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full"
                  style={{
                    width: `${(member.completed / member.tasks) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AnalyticsCard = ({ data }) => (
  <div className="space-y-6">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Weekly Progress</h3>
      <div className="h-48">{/* Add chart component here */}</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Task Status</h3>
        <div className="space-y-4">
          {Object.entries(data.taskCompletion).map(([status, count]) => (
            <div key={status} className="flex justify-between items-center">
              <span className="text-gray-400 capitalize">{status}</span>
              <span className="text-white font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">
          Time Distribution
        </h3>
        <div className="space-y-4">
          {Object.entries(data.timeSpent).map(([activity, hours]) => (
            <div key={activity} className="flex justify-between items-center">
              <span className="text-gray-400 capitalize">{activity}</span>
              <span className="text-white font-medium">{hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProfileMenu = ({ userProfile, navigate, onRoleSwitch }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-black/90 backdrop-blur-xl 
      border border-white/10 shadow-xl overflow-hidden z-50"
  >
    <div className="p-4 border-b border-white/10">
      <p className="text-white font-medium">{userProfile.name}</p>
      <p className="text-sm text-gray-400">{userProfile.email}</p>
    </div>

    <div className="p-4 border-b border-white/10">
      <p className="text-sm text-gray-400 mb-2">Switch Role</p>
      <div className="grid grid-cols-3 gap-2">
        {["student", "mentor", "client"].map((role) => (
          <button
            key={role}
            onClick={() => onRoleSwitch(role)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${
                userProfile.role === role
                  ? "bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>

    <div className="p-2">
      <button
        onClick={() => navigate("/profile")}
        className="w-full p-2 text-left text-gray-300 hover:text-white hover:bg-white/5 
          rounded-lg transition-colors"
      >
        View Profile
      </button>
      <button
        onClick={() => navigate("/settings")}
        className="w-full p-2 text-left text-gray-300 hover:text-white hover:bg-white/5 
          rounded-lg transition-colors"
      >
        Settings
      </button>
      <button
        onClick={() => navigate("/learn-with-us")}
        className="w-full p-2 text-left text-gray-300 hover:text-white hover:bg-white/5 
          rounded-lg transition-colors"
      >
        Browse Programs
      </button>
      <button
        onClick={async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // Clear local storage
            localStorage.removeItem("user");
            localStorage.removeItem("userRole");

            toast.success("Logged out successfully");
            navigate("/login");
          } catch (error) {
            toast.error("Error logging out: " + error.message);
          }
        }}
        className="w-full p-2 text-left text-red-400 hover:text-red-300 hover:bg-white/5 
          rounded-lg transition-colors"
      >
        Log Out
      </button>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userRole, setUserRole] = useState("student");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    avatar: null,
    role: "student",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (!session) {
          navigate("/login");
          return;
        }

        // Get user metadata
        const { user } = session;
        const role = localStorage.getItem("userRole") || "student";

        setUserProfile({
          name:
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "User",
          email: user.email,
          avatar: user.user_metadata?.avatar_url,
          role: role,
        });
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error loading user data");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Role-specific dashboard tabs
  const getDashboardTabs = () => {
    const commonTabs = [
      { id: "overview", label: "Overview" },
      { id: "resources", label: "Resources" },
    ];

    switch (userRole) {
      case "student":
        return [
          ...commonTabs,
          { id: "courses", label: "My Courses" },
          { id: "achievements", label: "Achievements" },
          { id: "mentors", label: "My Mentors" },
        ];
      case "mentor":
        return [
          ...commonTabs,
          { id: "students", label: "My Students" },
          { id: "sessions", label: "Sessions" },
          { id: "feedback", label: "Feedback" },
        ];
      case "client":
        return [
          ...commonTabs,
          { id: "projects", label: "Projects" },
          { id: "teams", label: "Teams" },
          { id: "analytics", label: "Analytics" },
        ];
      default:
        return commonTabs;
    }
  };

  // Role-specific stats
  const getRoleStats = () => {
    switch (userRole) {
      case "student":
        return {
          coursesCompleted: 12,
          hoursLearned: 156,
          streak: 7,
          points: 2450,
        };
      case "mentor":
        return {
          activeStudents: 15,
          sessionsDone: 45,
          rating: 4.8,
          hoursGuided: 120,
        };
      case "client":
        return {
          activeProjects: 3,
          teamMembers: 12,
          completedMilestones: 8,
          projectHours: 350,
        };
      default:
        return {};
    }
  };

  // Role-specific content renderer
  const renderRoleContent = () => {
    switch (userRole) {
      case "student":
        return (
          <div className="space-y-6">
            {/* Student Learning Path */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Learning Path
              </h2>
              {/* ... existing learning path content ... */}
            </div>

            {/* Current Courses */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Current Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ... existing courses mapping ... */}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upcoming Sessions
              </h2>
              {/* Add upcoming mentoring sessions */}
            </div>
          </div>
        );

      case "mentor":
        return (
          <div className="space-y-6">
            {/* Student Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Student Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add student cards with progress */}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Today's Sessions
              </h2>
              {/* Add session schedule */}
            </div>

            {/* Feedback & Reviews */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Feedback
              </h2>
              {/* Add feedback list */}
            </div>
          </div>
        );

      case "client":
        return (
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Project Overview
                </h2>
                <button
                  onClick={() => navigate("/new-project")}
                  className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 
                    transition-colors flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>New Project</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">
                Team Performance
              </h2>
              <TeamMetricsCard metrics={mockTeamMetrics} />
            </div>

            {/* Project Analytics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">
                Analytics
              </h2>
              <AnalyticsCard data={mockAnalytics} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get role-specific welcome message
  const getWelcomeMessage = () => {
    switch (userRole) {
      case "student":
        return "Here's what's happening with your learning journey";
      case "mentor":
        return "Here's an overview of your students and sessions";
      case "client":
        return "Here's the latest on your projects and teams";
      default:
        return "Welcome back";
    }
  };

  // Get role-specific action button
  const ActionButton = () => {
    switch (userRole) {
      case "student":
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/learn-with-us")}
            className="px-4 py-2 rounded-lg relative group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
              to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            />
            <span className="relative z-10 font-medium text-white">
              Start New Course
            </span>
          </motion.button>
        );
      case "mentor":
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/schedule-session")}
            className="px-4 py-2 rounded-lg relative group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
              to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            />
            <span className="relative z-10 font-medium text-white">
              Schedule Session
            </span>
          </motion.button>
        );
      case "client":
        return (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/new-project")}
            className="px-4 py-2 rounded-lg relative group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 
              to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-400 
              to-fuchsia-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            />
            <span className="relative z-10 font-medium text-white">
              Create Project
            </span>
          </motion.button>
        );
      default:
        return null;
    }
  };

  // Add role switching handler
  const handleRoleSwitch = (newRole) => {
    setUserProfile((prev) => ({ ...prev, role: newRole }));
    setUserRole(newRole);
    localStorage.setItem("userRole", newRole);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userProfile, role: newRole })
    );
    toast.success(`Switched to ${newRole} role`);
    setShowProfileMenu(false); // Close menu after switching
  };

  return (
    <div className="min-h-screen bg-black">
      <BackgroundEffects variant="learning" />
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                  Welcome back, {userProfile.name}
                </span>
              </h1>
              <p className="text-gray-400 mt-1">{getWelcomeMessage()}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 
                    to-fuchsia-500 flex items-center justify-center text-white font-medium"
                  >
                    {userProfile.name.charAt(0)}
                  </div>
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <ProfileMenu
                      userProfile={userProfile}
                      navigate={navigate}
                      onRoleSwitch={handleRoleSwitch}
                    />
                  )}
                </AnimatePresence>
              </div>
              <ActionButton />
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="flex space-x-1 mb-6 border-b border-white/10">
            {getDashboardTabs().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Role-specific Content */}
          {renderRoleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
