// An editor-window visual for the "What I do" section: the kind of
// security-by-default controller code the projects are built with.

type Token = [kind: "" | "kw" | "fn" | "str" | "dec" | "ty" | "cm" | "num", text: string];

const lines: Token[][] = [
  [["dec", "@Controller"], ["", "("], ["str", "'listings'"], ["", ")"]],
  [["dec", "@UseGuards"], ["", "("], ["ty", "JwtAuthGuard"], ["", ", "], ["ty", "RolesGuard"], ["", ")"]],
  [["kw", "export class "], ["ty", "ListingController"], ["", " {"]],
  [["", "  "], ["dec", "@Post"], ["", "()"]],
  [["", "  "], ["dec", "@Roles"], ["", "("], ["str", "'host'"], ["", ")"]],
  [["", "  "], ["dec", "@Throttle"], ["", "({ limit: "], ["num", "5"], ["", ", ttl: "], ["num", "60_000"], ["", " })"]],
  [["", "  "], ["fn", "create"], ["", "("], ["dec", "@Body"], ["", "() dto: "], ["ty", "CreateListingDto"], ["", ") {"]],
  [["cm", "    // validated + sanitised before it"]],
  [["cm", "    // ever reaches the database"]],
  [["kw", "    return "], ["", "this.listings."], ["fn", "create"], ["", "(dto);"]],
  [["", "  }"]],
  [["", "}"]],
];

const checks = ["authn", "rbac", "rate-limit", "validation"];

export function CodeCard() {
  return (
    <figure className="code-card" aria-label="Example: a NestJS controller with authentication, role checks and rate limiting">
      <figcaption className="code-head">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-file">listing.controller.ts</span>
      </figcaption>
      <pre className="code-body">
        <code>
          {lines.map((line, i) => (
            <span className="code-line" key={i}>
              <span className="code-ln" aria-hidden="true">
                {i + 1}
              </span>
              {line.map(([kind, text], j) => (
                <span key={j} className={kind ? `t-${kind}` : undefined}>
                  {text}
                </span>
              ))}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <ul className="code-checks" aria-label="Security checks">
        {checks.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </figure>
  );
}
