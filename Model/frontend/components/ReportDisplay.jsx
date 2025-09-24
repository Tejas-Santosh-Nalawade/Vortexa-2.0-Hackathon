export default function ReportDisplay({ report }) {
  if (!report) return null;
  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="font-bold mb-2">Emotion Analysis:</h2>
      <ul>
        {report.emotions.map((e) => (
          <li key={e.label}>{e.label}: {e.score.toFixed(2)}</li>
        ))}
      </ul>
      <h2 className="font-bold mt-4">Summary:</h2>
      <p>{report.summary}</p>
      <h2 className="font-bold mt-4">Insights:</h2>
      <ul>
        {report.insights.map((i, idx) => <li key={idx}>• {i}</li>)}
      </ul>
    </div>
  );
}
