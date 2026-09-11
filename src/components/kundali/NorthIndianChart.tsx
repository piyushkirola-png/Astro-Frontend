interface Props {
  /** 12 entries, index 0 = house 1, index 11 = house 12.
   *  Each entry is a comma-separated list of planet abbreviations like "Su,Mo" or "" for empty. */
  houses: string[];
  title?: string;
}

// North Indian chart layout — house positions
// The chart is a square with two diagonals and a central diamond.
// House positions (approximate label center in a 300x300 viewBox):
const HOUSE_CENTERS: { x: number; y: number }[] = [
  { x: 150, y: 45 },   // 1  (top center)
  { x: 60, y: 45 },    // 2  (top left)
  { x: 45, y: 90 },    // 3  (left upper)
  { x: 90, y: 150 },   // 4  (left middle)
  { x: 45, y: 220 },   // 5  (left lower)
  { x: 60, y: 260 },   // 6  (bottom left)
  { x: 150, y: 260 },  // 7  (bottom center)
  { x: 240, y: 260 },  // 8  (bottom right)
  { x: 255, y: 220 },  // 9  (right lower)
  { x: 210, y: 150 },  // 10 (right middle)
  { x: 255, y: 90 },   // 11 (right upper)
  { x: 240, y: 45 },   // 12 (top right)
];

export default function NorthIndianChart({ houses, title }: Props) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-bold text-ink-900 text-center mb-3">
          {title}
        </h3>
      )}
      <div className="bg-white rounded-xl border border-ink-200 p-3">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-auto"
          style={{ maxWidth: 380, margin: '0 auto', display: 'block' }}
        >
          {/* Outer square */}
          <rect
            x="5"
            y="5"
            width="290"
            height="290"
            fill="none"
            stroke="#b8862a"
            strokeWidth="1.5"
          />

          {/* Diagonals (X) */}
          <line x1="5" y1="5" x2="295" y2="295" stroke="#b8862a" strokeWidth="1" />
          <line x1="295" y1="5" x2="5" y2="295" stroke="#b8862a" strokeWidth="1" />

          {/* Inner diamond (connects midpoints of sides) */}
          <polygon
            points="150,5 295,150 150,295 5,150"
            fill="none"
            stroke="#b8862a"
            strokeWidth="1"
          />

          {/* House number labels (small, at corners of each house) */}
          {HOUSE_CENTERS.map((c, i) => {
            const planets = parseHouses(houses[i]);
            return (
              <g key={i}>
                {/* House number */}
                <text
                  x={c.x}
                  y={c.y - 14}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#a29a86"
                  fontWeight="500"
                >
                  {i + 1}
                </text>

                {/* Planets stacked */}
                {planets.map((p, idx) => (
                  <text
                    key={idx}
                    x={c.x}
                    y={c.y + idx * 13}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#17120c"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                  >
                    {p}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Helpers
function parseHouses(h: string | undefined): string[] {
  if (!h) return [];
  return h
    .split(/[,|]/)          // supports both "Su,Mo" and "Su|Mo"
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}