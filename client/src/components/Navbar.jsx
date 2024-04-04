import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div>
      <nav>
        <p
          style={{
            fontFamily: "BradleyDJRVariableWeb",
            fontSize: "60pt",
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
            fontSize: "24pt",
            fontVariationSettings: "'opsz' 24",
            lineHeight: "1.2em",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          "Strong opinions, weakly held." <strike>-Steve Jobs</strike> MDF
        </p>
        <div
          style={{ fontVariant: "small-caps", letterSpacing: ".05em" }}
          className="flex justify-center mt-5 mb-5 "
        >
          {location.pathname == "/" ? (
            <NavLink
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to="/create"
            >
              New Opinion
            </NavLink>
          ) : (
            <NavLink
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to="/"
            >
              Back
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
