import { useEffect, useMemo, useState } from "react";
import DemoLoading from "./demo-loading.jsx";

const DEMO_LOST_ITEMS = [
  {
    id: 1,
    item: "Blue Backpack",
    found_location: "Library 2nd Floor",
    returned_by: "John Smith",
    role: "faculty",
    id_type: "Employee ID",
    id_number: "EMP-2024-001",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 2,
    item: "Silver Laptop",
    found_location: "Cafeteria",
    returned_by: "Maria Garcia",
    role: "staff",
    id_type: "Staff Badge",
    id_number: "STAFF-5432",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 3,
    item: "Reading Glasses",
    found_location: "Auditorium Seat 42",
    returned_by: "James Wilson",
    role: "faculty",
    id_type: "Faculty Card",
    id_number: "FAC-1089",
    status: "lost",
    image: null,
    image_name: null,
  },
];

const emptyDraft = () => ({
  item: "",
  found_location: "",
  returned_by: "",
  role: "faculty",
  id_type: "",
  id_number: "",
});

function StaffAccountDemo({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [lostItems, setLostItems] = useState([...DEMO_LOST_ITEMS]);
  const [claimedItems, setClaimedItems] = useState([
    {
      id: 101,
      item: "iPhone 14",
      found_location: "Gym Storage",
      returned_by: "Alex Thompson",
      role: "guard",
      status: "claimed",
      owner_name: "Jessica Brown",
      owner_role: "student",
      owner_id_type: "Student ID",
      owner_id_number: "STU-2024-456",
      image: null,
      image_name: null,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayMode, setDisplayMode] = useState("lost");
  const [draft, setDraft] = useState(emptyDraft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 600);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    window.setTimeout(onBack, 250);
  };

  const visibleItems = useMemo(() => {
    const sourceItems = displayMode === "claimed" ? claimedItems : lostItems;
    if (!searchTerm) return sourceItems;
    return sourceItems.filter((item) =>
      ["item", "found_location", "returned_by", "role", "id_type", "id_number", "status"].some((field) => item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [claimedItems, displayMode, lostItems, searchTerm]);

  function refreshDemo() {
    setLostItems([...DEMO_LOST_ITEMS]);
    setClaimedItems([
      {
        id: 101,
        item: "iPhone 14",
        found_location: "Gym Storage",
        returned_by: "Alex Thompson",
        role: "guard",
        status: "claimed",
        owner_name: "Jessica Brown",
        owner_role: "student",
        owner_id_type: "Student ID",
        owner_id_number: "STU-2024-456",
        image: null,
        image_name: null,
      },
    ]);
    setDisplayMode("lost");
    setSearchTerm("");
    setDraft(emptyDraft());
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLostItems((current) => [{ id: Date.now(), ...draft, status: "lost", image: null, image_name: null }, ...current]);
    setDraft(emptyDraft());
  }

  function markFound(itemId) {
    setLostItems((current) => current.filter((item) => item.id !== itemId));
  }

  if (isLoading) {
    return <DemoLoading message="Loading Staff Operations Desk..." isFading={fadeOut} />;
  }

  return (
    <div className={`min-h-screen bg-slate-950 px-4 py-8 text-slate-100 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-3 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Staff Demo</p>
            <h1 className="text-2xl font-semibold text-white">Staff Operations Desk</h1>
          </div>
          <button type="button" onClick={handleExit} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
            Choose Another Role
          </button>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Current Demo Lost Items</h2>
            <p className="mt-1 text-sm text-slate-400">This table shows the seeded items staff can review, report, or mark as found.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Found Location</th>
                  <th className="px-4 py-3">Reported By</th>
                </tr>
              </thead>
              <tbody>
                {lostItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800 odd:bg-slate-900/70 even:bg-slate-950/60">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-white">{item.item}</td>
                    <td className="px-4 py-3">{item.found_location}</td>
                    <td className="px-4 py-3">{item.returned_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { label: "Lost Items", value: "lost" },
                { label: "Claimed Items", value: "claimed" },
              ].map((tab) => (
                <button key={tab.value} type="button" onClick={() => setDisplayMode(tab.value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${displayMode === tab.value ? "bg-emerald-400 text-slate-950" : "bg-slate-800 text-slate-200 hover:bg-slate-700"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search reported items" className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 sm:max-w-md" />
              <button type="button" onClick={refreshDemo} className="rounded-full bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
                Refresh
              </button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.length > 0 ? visibleItems.map((item) => (
                    <tr key={item.id} className="border-t border-slate-800 odd:bg-slate-900/70 even:bg-slate-950/60">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3 font-semibold text-white">{item.item}</td>
                      <td className="px-4 py-3">{item.found_location}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "claimed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>{item.status}</span></td>
                      <td className="px-4 py-3">
                        {displayMode === "lost" ? (
                          <button type="button" onClick={() => markFound(item.id)} className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400">Mark Found</button>
                        ) : (
                          <span className="text-slate-500">Read-only</span>
                        )}
                      </td>
                    </tr>
                  )) : <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-400">No items match the current view.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="text-lg font-semibold text-white">Report a Lost Item</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input required value={draft.item} onChange={(event) => setDraft((current) => ({ ...current, item: event.target.value }))} placeholder="Item" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <input required value={draft.found_location} onChange={(event) => setDraft((current) => ({ ...current, found_location: event.target.value }))} placeholder="Found Location" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <input required value={draft.returned_by} onChange={(event) => setDraft((current) => ({ ...current, returned_by: event.target.value }))} placeholder="Returned By" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input required value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))} placeholder="Role" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                <input required value={draft.id_type} onChange={(event) => setDraft((current) => ({ ...current, id_type: event.target.value }))} placeholder="ID Type" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              </div>
              <input required value={draft.id_number} onChange={(event) => setDraft((current) => ({ ...current, id_number: event.target.value }))} placeholder="ID Number" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <button type="submit" className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">Submit Lost Item</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StaffAccountDemo;
