import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetSignedInUserQuery } from "../redux/features/auth/authApi";
import { getBaseURL } from "../utils/baseURL";

const Dashboard = () => {
  const { data: user, isLoading, isError } = useGetSignedInUserQuery();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${getBaseURL()}/api/auth/stats`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          console.error("Failed to fetch stats:", data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (user?.role === "admin") {
      fetchStats();
    }
  }, [user]);

  if (isLoading) return <p className="p-10">Loading your dashboard...</p>;
  if (isError || !user)
    return <p className="p-10 text-red-500">Error loading user data.</p>;

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Message */}
        <h1 className="text-4xl font-extrabold text-blue-800 text-center">
          👋 Welcome, {isAdmin ? "Admin" : user.fullName}
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Here’s your quick dashboard overview
        </p>

        {/* Admin Stats Section */}
        {isAdmin && stats && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <StatCard label="Total Users" value={stats.totalUsers} />
              <StatCard label="Products Listed" value={stats.totalProducts} />
              <StatCard label="Active Bids" value={stats.totalBids} />
              <StatCard label="Lost/Found Posts" value={stats.lostFoundPosts} />
            </div>

            {/* Admin Actions as Cards */}
            <h2 className="text-center text-lg font-semibold mt-12 text-gray-800">
              Admin Tools
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-4">
              <Link to="/admin/users">
                <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold mb-2">
                    👥 Manage All Users
                  </h2>
                  <p className="text-gray-600">
                    View all users, promote roles, deactivate accounts, or reset
                    passwords.
                  </p>
                </div>
              </Link>

              <Link to="/admin/products">
                <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold mb-2">
                    📦 Manage All Products
                  </h2>
                  <p className="text-gray-600">
                    Approve or remove listed products, flag inappropriate
                    content.
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}

        {/* Universal User Actions */}
        <h2 className="text-center text-lg font-semibold mt-12 text-gray-800">
          My Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <Link to="/dashboard/listings">
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">
                🧾 Manage Uploaded Products
              </h2>
              <p className="text-gray-600">
                View, edit, or delete your products. For pre-owned items, choose
                a bid winner.
              </p>
            </div>
          </Link>

          <Link to="/dashboard/bids">
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">📈 My Bids</h2>
              <p className="text-gray-600">
                Track your bids, see if you've won, and proceed to purchase if
                applicable.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white text-center rounded-lg shadow-md p-6">
    <p className="text-gray-500 text-sm mb-2">{label}</p>
    <h3 className="text-3xl font-extrabold text-blue-700">
      {value.toLocaleString()}
    </h3>
  </div>
);

export default Dashboard;
