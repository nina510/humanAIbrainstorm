import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f6f9ff_0%,_#edf4ff_100%)] px-6 py-10 text-ink">
      <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold">Survey Links</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use one of these fixed links for questionnaire distribution.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link className="text-accentDeep underline" href="/survey/human-a">
              /survey/human-a
            </Link>
          </li>
          <li>
            <Link className="text-accentDeep underline" href="/survey/human-b">
              /survey/human-b
            </Link>
          </li>
          <li>
            <Link className="text-accentDeep underline" href="/survey/ai-a">
              /survey/ai-a
            </Link>
          </li>
          <li>
            <Link className="text-accentDeep underline" href="/survey/ai-b">
              /survey/ai-b
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
