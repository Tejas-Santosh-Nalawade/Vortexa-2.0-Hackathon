import { useState } from "react";
import JournalForm from "../components/JournalForm";
import ReportDisplay from "../components/ReportDisplay";

export default function Home() {
  const [report, setReport] = useState(null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mental Health Journal</h1>
      <JournalForm setReport={setReport} />
      <ReportDisplay report={report} />
    </div>
  );
}
