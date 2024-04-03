import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav>
        <p
          style={{
            fontFamily: "Bahnschrift Condendsed",
            fontSize: "45pt",
            fontVariationSettings: "'opsz' 60",
            lineHeight: "1em",
            textAlign: "center",
          }}
        >
          Very Strong Opinions
        </p>

        <p
          style={{
            fontFamily: "BradleyDJRVariableWeb",
            fontSize: "14pt",
            fontVariationSettings: "'opsz' 24",
            lineHeight: "1.2em",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          "Strong opinions, weakly held." <strike>-Steve Jobs</strike> MDF
        </p>
        <div className="flex justify-center mt-5 mb-5 ">
          <NavLink
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/create"
          >
            New Opinion
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
