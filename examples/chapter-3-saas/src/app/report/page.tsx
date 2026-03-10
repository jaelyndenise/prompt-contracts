"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ReportPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 space-y-4">
          <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-600">Please sign in to view your reports.</p>
      </div>
    );
  }

  return (
    <ReportList
      userName={user.firstName ?? user.emailAddresses[0]?.emailAddress ?? "there"}
    />
  );
}

function ReportList({ userName }: { userName: string }) {
  const reports = useQuery(api.reports.listByUser);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Your Reports, {userName}
      </h1>

      {reports === undefined ? (
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
        </div>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">
          No reports yet. Generate your first Dream 100 list.
        </p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {report.targetMarket}
                  </p>
                  <p className="text-sm text-gray-500">
                    {report.contactCount ?? 0} contacts
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    report.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : report.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : report.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
