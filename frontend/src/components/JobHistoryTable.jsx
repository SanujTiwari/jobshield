function JobHistoryTable({ jobs }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">
        Recent Analyses
      </h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg">
              {job.title || "Untitled Job"}
            </h3>

            <p className="text-gray-600">
              {job.company_name ||
                "Unknown Company"}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                job.risk_level === "High Risk"
                  ? "bg-red-100 text-red-700"
                  : job.risk_level ===
                    "Medium Risk"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {job.risk_level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobHistoryTable;