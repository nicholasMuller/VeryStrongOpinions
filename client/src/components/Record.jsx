import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    topic: "",
    opinion: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const opinionPost = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opinionPost),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opinionPost),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    } finally {
      setForm({ topic: "", opinion: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-slate-900/10 pb-12">
          <div className="flex justify-center">
            <h2 className="text-base font-semibold leading-7">
              Feeling Opinionated?
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-y-4">
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium leading-6"
              >
                Topic
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    name="topic"
                    id="topic"
                    className="block w-full border-0 bg-transparent py-1.5 px-3 placeholder: focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="On Sandwiches"
                    value={form.topic}
                    onChange={(e) => updateForm({ topic: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="Opinion"
                className="block text-sm font-medium leading-6"
              >
                Opinion
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <textarea
                    name="opinion"
                    id="opinion"
                    className="block w-full border-0 bg-transparent py-2 px-3 placeholder: focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Sandwiches are only as good as the bread they're on."
                    rows="4"
                    value={form.position}
                    onChange={(e) => updateForm({ opinion: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Post"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground hover:text-black h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </div>
      </form>
    </>
  );
}
