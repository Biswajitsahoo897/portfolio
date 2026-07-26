const nodes = [
  { id: "client", x: 40, y: 40, label: "client" },
  { id: "api", x: 260, y: 150, label: "api" },
  { id: "cache", x: 500, y: 60, label: "cache" },
  { id: "db", x: 480, y: 250, label: "db.primary" },
  { id: "replica", x: 480, y: 350, label: "db.replica" },
];

const edges: [string, string][] = [
  ["client", "api"],
  ["api", "cache"],
  ["api", "db"],
  ["db", "replica"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export default function SchemaGraphic() {
  return (
    <svg
      viewBox="0 0 620 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {edges.map(([from, to], i) => {
        const a = getNode(from);
        const b = getNode(to);
        return (
          <line
            key={i}
            x1={a.x + 46}
            y1={a.y + 14}
            x2={b.x}
            y2={b.y + 14}
            stroke="#232A38"
            strokeWidth={1.5}
          />
        );
      })}
      {edges.map(([from, to], i) => {
        const a = getNode(from);
        const b = getNode(to);
        return (
          <line
            key={`pulse-${i}`}
            x1={a.x + 46}
            y1={a.y + 14}
            x2={b.x}
            y2={b.y + 14}
            stroke="#5FE1C9"
            strokeWidth={1.5}
            strokeDasharray="4 10"
            strokeOpacity={0.6}
            className="animate-pulseLine"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g
          key={n.id}
          className="animate-floatSlow"
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={n.id === "db" || n.id === "replica" ? 96 : 92}
            height={28}
            rx={5}
            fill="#10141D"
            stroke={n.id === "api" ? "#5FE1C9" : "#232A38"}
            strokeWidth={1.2}
          />
          <text
            x={n.x + 12}
            y={n.y + 18}
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill={n.id === "api" ? "#5FE1C9" : "#8A93A6"}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
