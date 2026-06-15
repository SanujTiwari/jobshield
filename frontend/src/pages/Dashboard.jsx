import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import JobHistoryTable from "../components/JobHistoryTable";

import {
  getStats,
  getHistory,
  analyzeJob,
} from "../services/jobService";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");

  const [companyName, setCompanyName] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsResponse =
        await getStats();

      const historyResponse =
        await getHistory();

      setStats(statsResponse.stats);

      setJobs(historyResponse.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    try {
      await analyzeJob({
        title,
        companyName,
        description,
      });

      setTitle("");
      setCompanyName("");
      setDescription("");

      await loadDashboard();

      alert("Analysis Completed");
    } catch (error) {
      console.log(error);

      alert("Analysis Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Jobs"
              value={stats.totalJobs}
            />

            <StatsCard
              title="High Risk"
              value={stats.highRisk}
            />

            <StatsCard
              title="Medium Risk"
              value={stats.mediumRisk}
            />

            <StatsCard
              title="Low Risk"
              value={stats.lowRisk}
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Analyze New Job
          </h2>

          <form
            onSubmit={handleAnalyze}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) =>
                setCompanyName(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="6"
              placeholder="Job Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Analyze Job
            </button>
          </form>
        </div>

        <JobHistoryTable jobs={jobs} />
      </div>
    </div>
  );
}

export default Dashboard;