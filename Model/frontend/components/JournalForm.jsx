import { useState } from "react";
import axios from "axios";

export default function JournalForm({ setReport }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/report";
    const response = await axios.post(backendUrl, { text });
    setReport(response.data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your journal..."
        rows={6}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Generate Report
      </button>
    </form>
  );
}
