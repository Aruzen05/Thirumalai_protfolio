// Schematic illustrations, one per project. Each draws the actual mechanism of
// the project (marketplace hub, Vastu grid audit, trust-score timeline …)
// rather than decoration. Shapes marked `dr` draw themselves in as the card
// scrolls into view (see .art in globals.css); everything is visible by default.

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function Hub() {
  const nodes = [
    { x: 40, y: 40, label: "guest", to: "M136 74 L160 105" },
    { x: 344, y: 40, label: "host", to: "M344 74 L320 105" },
    { x: 40, y: 196, label: "admin", to: "M136 196 L160 165" },
    { x: 344, y: 196, label: "partners", to: "M344 196 L320 165" },
  ];
  return (
    <>
      {nodes.map((n) => (
        <path key={n.label} className="ln dr" pathLength={1} d={n.to} />
      ))}
      <path className="ln dash" d="M240 66 V105" />
      <path className="ln dash" d="M240 165 V206" />
      <rect className="hl dr fill-acc" pathLength={1} x="160" y="105" width="160" height="60" />
      <text className="tx-hi" x="240" y="131" textAnchor="middle">
        booking api
      </text>
      <text x="240" y="150" textAnchor="middle">
        auth · rbac · payouts
      </text>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect className="st dr" pathLength={1} x={n.x} y={n.y} width="96" height="34" />
          <text x={n.x + 48} y={n.y + 21} textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
      <path className="okc dr" pathLength={1} d="M240 64 C229 52 226 46 226 40 a14 14 0 0 1 28 0 c0 6 -3 12 -14 24z" />
      <circle className="okc" cx="240" cy="40" r="4" />
      <rect className="hl dr" pathLength={1} x="212" y="206" width="56" height="26" />
      <text className="tx-acc" x="240" y="223" textAnchor="middle">
        sos
      </text>
    </>
  );
}

function VastuGrid() {
  const x0 = 40;
  const y0 = 27;
  const c = 24;
  const audit: [string, string, string][] = [
    ["NE", "pooja", "ok"],
    ["SE", "kitchen", "ok"],
    ["SW", "master bed", "ok"],
    ["NW", "guest room", "ok"],
    ["C", "brahmasthan", "open"],
  ];
  return (
    <>
      {range(8).map((i) => (
        <g key={i}>
          <path className="ln" d={`M${x0 + c * (i + 1)} ${y0} V${y0 + c * 9}`} />
          <path className="ln" d={`M${x0} ${y0 + c * (i + 1)} H${x0 + c * 9}`} />
        </g>
      ))}
      <rect className="hl fill-acc" x={x0 + c * 3} y={y0 + c * 3} width={c * 3} height={c * 3} />
      <rect className="st dr" pathLength={1} x={x0} y={y0} width={c * 9} height={c * 9} />
      <path className="hl dr" pathLength={1} d="M64 51 H232 V219 H64 Z M64 120 H150 M150 51 V219 M150 160 H232" />
      <text className="tx-hi" x="300" y="44">
        vastu audit
      </text>
      {audit.map(([dir, room, status], i) => (
        <text key={dir} x="300" y={76 + i * 26}>
          <tspan className="tx-acc">{dir}</tspan>
          <tspan x="332">{room}</tspan>
          <tspan className="tx-ok" x="446" textAnchor="end">
            {status}
          </tspan>
        </text>
      ))}
      <path className="st" d="M420 236 V206 M413 214 L420 204 L427 214" />
      <text x="432" y="240">
        N
      </text>
    </>
  );
}

function Boq() {
  const top = 70;
  const left = 40;
  const right = 250;
  const rows = 6;
  const h = 25;
  const joints: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let x = left + (r % 2 ? 25 : 50); x < right; x += 50) {
      joints.push(`M${x} ${top + r * h} V${top + (r + 1) * h}`);
    }
  }
  const lines: [string, string][] = [
    ["bricks", "2,520 nos"],
    ["cement", "18 bags"],
    ["sand", "1.4 m³"],
    ["labour", "6 days"],
    ["wastage", "+5%"],
  ];
  return (
    <>
      {range(rows - 1).map((r) => (
        <path key={r} className="ln" d={`M${left} ${top + (r + 1) * h} H${right}`} />
      ))}
      <path className="ln" d={joints.join(" ")} />
      <rect className="st dr" pathLength={1} x={left} y={top} width={right - left} height={rows * h} />
      <path className="hl dr" pathLength={1} d={`M${left} 50 H${right} M${left} 44 V56 M${right} 44 V56`} />
      <text className="tx-acc" x={(left + right) / 2} y="42" textAnchor="middle">
        4.20 m
      </text>
      <path className="hl dr" pathLength={1} d={`M24 ${top} V${top + rows * h} M18 ${top} H30 M18 ${top + rows * h} H30`} />
      <text className="tx-acc" x="14" y={top + (rows * h) / 2} textAnchor="middle" transform={`rotate(-90 14 ${top + (rows * h) / 2})`}>
        3.00 m
      </text>
      <text className="tx-hi" x="284" y="62">
        bill of quantities
      </text>
      {lines.map(([k, v], i) => (
        <g key={k}>
          <path className="ln" d={`M284 ${76 + i * 30} H448`} />
          <text x="284" y={96 + i * 30}>
            {k}
          </text>
          <text className={i === lines.length - 1 ? "tx-acc" : "tx-hi"} x="448" y={96 + i * 30} textAnchor="end">
            {v}
          </text>
        </g>
      ))}
    </>
  );
}

function TrustTimeline() {
  const lanes = ["face", "keys", "mouse"];
  return (
    <>
      <path className="ln" d="M50 30 V170 H440" />
      <text x="50" y="22">
        trust score
      </text>
      <path className="hl dash" d="M50 110 H440" />
      <text className="tx-acc" x="440" y="104" textAnchor="end">
        threshold
      </text>
      <polyline
        className="okc dr"
        pathLength={1}
        points="50,60 90,58 130,64 170,56 210,62 240,70 260,100 275,128 290,134 305,96 320,62 360,58 400,60 440,56"
      />
      <circle className="hl fill-acc" cx="290" cy="134" r="6" />
      <text className="tx-hi" x="300" y="158">
        step-up · webauthn
      </text>
      {lanes.map((lane, l) => (
        <g key={lane}>
          <text x="50" y={200 + l * 22}>
            {lane}
          </text>
          {range(28).map((k) => {
            const x = 110 + k * 12;
            const t = 3 + ((k * 7 + l * 5) % 6);
            const y = 196 + l * 22;
            const anomaly = x >= 254 && x <= 296;
            return <path key={k} className={anomaly ? "hl" : "ln"} d={`M${x} ${y - t} V${y + t}`} />;
          })}
        </g>
      ))}
    </>
  );
}

function Avatar() {
  const bars = range(23).map((k) => {
    const h = 6 + 36 * Math.abs(Math.sin(k * 0.7)) * (0.55 + 0.45 * Math.cos(k * 0.23));
    return { x: 268 + k * 8, h: Math.round(h) };
  });
  return (
    <>
      <circle className="st dr" pathLength={1} cx="130" cy="104" r="58" />
      <path className="st dr" pathLength={1} d="M46 262 C56 196 98 176 130 176 C162 176 204 196 214 262" />
      <path className="ln" d="M110 96 L130 116 L150 96 M130 116 L114 138 M130 116 L146 138 M110 96 L114 138 M150 96 L146 138" />
      {[
        [110, 96],
        [150, 96],
        [130, 116],
        [114, 138],
        [146, 138],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} className="okc fill-ok" cx={x} cy={y} r="2.5" />
      ))}
      <path className="hl dr" pathLength={1} d="M114 138 Q130 150 146 138" />
      <path className="hl dash" d="M150 140 C200 150 220 110 262 110" />
      <text className="tx-hi" x="268" y="52">
        voice · lip-sync
      </text>
      {bars.map((b) => (
        <path key={b.x} className="okc" d={`M${b.x} ${110 - b.h / 2} V${110 + b.h / 2}`} />
      ))}
      <rect className="st dr" pathLength={1} x="268" y="188" width="176" height="34" />
      <path className="hl" d="M282 199 h12 v12 h-12 z M285 199 v-4 a3 3 0 0 1 6 0 v4" />
      <text x="304" y="209">
        self-hosted models
      </text>
    </>
  );
}

function TwoToThree() {
  return (
    <>
      <text className="tx-hi" x="60" y="56">
        2d
      </text>
      <rect className="st dr" pathLength={1} x="60" y="70" width="110" height="110" />
      <path className="ln" d="M60 180 L92 104 M170 70 L140 148" />
      <path className="hl dr" pathLength={1} d="M60 180 C92 104 140 148 170 70" />
      {[
        [60, 70],
        [170, 70],
        [60, 180],
        [170, 180],
        [92, 104],
        [140, 148],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} className="hl fill-bg" x={x - 3.5} y={y - 3.5} width="7" height="7" />
      ))}
      <path className="hl dr" pathLength={1} d="M204 125 H268 M258 117 L268 125 L258 133" />
      <text x="236" y="112" textAnchor="middle">
        extrude
      </text>
      <path className="ln dash" d="M318 170 L370 140 L422 170 M370 70 V140" />
      <path
        className="st dr"
        pathLength={1}
        d="M370 70 L422 100 L370 130 L318 100 Z M318 100 V170 L370 200 L422 170 V100 M370 130 V200"
      />
      <path className="fill-acc" d="M370 70 L422 100 L370 130 L318 100 Z" />
      <text className="tx-hi" x="410" y="56">
        3d
      </text>
    </>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  "dhyana-stays": Hub,
  "ai-vastu": VastuGrid,
  "construction-boq": Boq,
  "continuous-verification": TrustTimeline,
  "ai-avatar-studio": Avatar,
  "design-platform": TwoToThree,
};

export function ProjectArt({ slug }: { slug: string }) {
  const Art = ART[slug];
  if (!Art) return null;
  return (
    <svg className="art" viewBox="0 0 480 270" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
