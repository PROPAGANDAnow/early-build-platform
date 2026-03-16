import Navbar from "@/components/Navbar";
import BountiesPage from "@/components/BountiesPage";
import DashedContainer from "@/components/DashedContainer";

const FEATURES = [
  {
    icon: "⌨️",
    title: "EARLY ACCESS",
    desc: "GET ACCESS TO TOOLS, APIS, AND PROTOCOLS BEFORE THEY TREND",
  },
  {
    icon: "▲",
    title: "REAL BUILDS",
    desc: "DEMOS, REPOS, SHIPPED LINKS YOU CAN POINT TO. NOT ANOTHER COURSE.",
  },
  {
    icon: "💬",
    title: "DIRECT FOUNDER ACCESS",
    desc: "BUILD WITH THE TEAM, NOT THROUGH A FORM. GET ON CALLS, ASK HARD QUESTIONS.",
  },
  {
    icon: "$",
    title: "PAID OPPORTUNITIES",
    desc: 'FOR REAL OUTPUT NOT "EXPOSURE"... IF YOU SHIP SOMETHING USEFUL, THERE\'S MONEY ON THE TABLE.',
  },
  {
    icon: "⚡",
    title: "A BUILDER CREW",
    desc: "BUILD ALONGSIDE SERIOUS BUILDERS. EVERYONE HERE HAS A TRACK RECORD OF ACTUALLY FINISHING THINGS.",
  },
];

const STEPS = [
  { num: "1", text: "APPLY (TAKES 2 MINS)", link: true },
  { num: "2", text: "WE RESPOND WITHIN 12 HOURS", link: false },
  { num: "3", text: "JOIN THE SLACK AND START BUILDING", link: false },
];

const LOGOS = ["KRAKEN", "BASE", "DYNAMIC", "ECO", "DOODLE"];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          FIRST TO KNOW
          <br />
          FIRST TO BUILD
        </h1>
        <p className="mx-auto mt-6 max-w-lg font-[family-name:var(--font-mono)] text-[11px] uppercase leading-relaxed tracking-wide text-gray-500">
          GET EARLY ACCESS TO NEW TOOLS, SHIP REAL LAUNCHES,
          <br />
          AND BUILD WITH A SMALL CREW THAT ACTUALLY DELIVERS
        </p>
        <button className="mt-8 border-2 border-black bg-white px-8 py-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider transition hover:bg-black hover:text-white">
          {">"} APPLY
        </button>

        {/* Logo Bar */}
        <div className="mt-16">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-gray-400">
            TEAMS WE WORK WITH
          </p>
          <div className="flex items-center justify-center gap-8">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-gray-300"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-10 text-center font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          WHAT YOU GET
        </h2>
        <DashedContainer>
          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURES.slice(0, 3).map((f) => (
              <div key={f.title} className="border border-gray-200 bg-white p-5">
                <div className="mb-3 text-xl">{f.icon}</div>
                <h3 className="mb-2 font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                  {f.title}
                </h3>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:mx-auto sm:max-w-2xl">
            {FEATURES.slice(3).map((f) => (
              <div key={f.title} className="border border-gray-200 bg-white p-5">
                <div className="mb-3 text-xl">{f.icon}</div>
                <h3 className="mb-2 font-[family-name:var(--font-mono)] text-xs font-bold uppercase">
                  {f.title}
                </h3>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </DashedContainer>
      </section>

      {/* Bounties Directory */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-10 text-center font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          OPEN BOUNTIES
        </h2>
        <DashedContainer>
          <BountiesPage />
        </DashedContainer>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Yellow Box */}
          <div className="flex items-center justify-center bg-[#ffe600] p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              HOW
              <br />
              IT
              <br />
              WORKS
            </h2>
          </div>

          {/* Steps */}
          <div className="flex flex-col justify-center gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex items-center gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-black text-white font-[family-name:var(--font-mono)] text-sm font-bold">
                  {step.num}
                </div>
                <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase">
                  {step.text}
                  {step.link && (
                    <span className="ml-1 text-gray-400">↗</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          EARLY IS AN INVITE-ONLY NETWORK OF
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["BUILDERS", "DEVELOPERS", "EVANGELISTS", "EARLY ADOPTERS"].map(
            (word) => (
              <span
                key={word}
                className="bg-[#ffe600] px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-bold uppercase"
              >
                {word}
              </span>
            )
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          APPLY TO JOIN EARLY.BUILD
        </h2>
        <p className="mb-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-gray-500">
          IF YOU BUILD, YOU WILL FIT IN
        </p>
        <button className="border-2 border-black bg-white px-8 py-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider transition hover:bg-black hover:text-white">
          {">"} APPLY NOW
        </button>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center">
        <div className="font-[family-name:var(--font-mono)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {"<"}ear/y.bui/d{">"}
        </div>
      </footer>
    </div>
  );
}
