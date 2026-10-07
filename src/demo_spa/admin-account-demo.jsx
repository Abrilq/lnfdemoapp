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

const DEMO_CLAIMED_ITEMS = [
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
  {
    id: 102,
    item: "White Headphones",
    found_location: "Locker Room",
    returned_by: "David Lee",
    role: "staff",
    status: "claimed",
    owner_name: "Thomas Weber",
    owner_role: "faculty",
    owner_id_type: "Faculty Card",
    owner_id_number: "FAC-3021",
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
  status: "lost",
  owner_name: "",
  owner_role: "student",
  owner_id_type: "",
  owner_id_number: "",
});

function AdminAccountDemo({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [lostItems, setLostItems] = useState([...DEMO_LOST_ITEMS]);
  const [claimedItems, setClaimedItems] = useState([...DEMO_CLAIMED_ITEMS]);
  const [archivedItems, setArchivedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("lost");
  const [displayMode, setDisplayMode] = useState("lost");
  const [draft, setDraft] = useState(emptyDraft());
  const [editingId, setEditingId] = useState(null);
  const [editingList, setEditingList] = useState("lost");

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
    const baseItems = displayMode === "claimed" ? claimedItems : lostItems;
    if (!searchTerm) return baseItems;
    return baseItems.filter((item) =>
      ["item", "found_location", "returned_by", "role", "id_type", "id_number", "status", "owner_name", "owner_role"]
        .some((field) => item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [claimedItems, displayMode, lostItems, searchTerm]);

  const demoInventory = useMemo(() => {
    return [...lostItems, ...claimedItems].sort((a, b) => a.id - b.id);
  }, [claimedItems, lostItems]);

  function refreshDemo() {
    setLostItems([...DEMO_LOST_ITEMS]);
    setClaimedItems([...DEMO_CLAIMED_ITEMS]);
    setArchivedItems([]);
    setEditingId(null);
    setDraft(emptyDraft());
    setActiveView("lost");
    setDisplayMode("lost");
    setSearchTerm("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      id: editingId ?? Date.now(),
      item: draft.item,
      found_location: draft.found_location,
      returned_by: draft.returned_by,
      role: draft.role,
      id_type: draft.id_type,
      id_number: draft.id_number,
      status: draft.status,
      image: null,
      image_name: null,
    };

    if (editingId && editingList === "claimed") {
      setClaimedItems((current) => current.map((item) => (item.id === editingId ? { ...item, ...payload, status: "claimed" } : item)));
    } else if (editingId && editingList === "lost") {
      setLostItems((current) => current.map((item) => (item.id === editingId ? { ...item, ...payload, status: "lost" } : item)));
    } else if (draft.status === "claimed") {
      setClaimedItems((current) => [{ ...payload, owner_name: draft.owner_name, owner_role: draft.owner_role, owner_id_type: draft.owner_id_type, owner_id_number: draft.owner_id_number }, ...current]);
    } else {
      setLostItems((current) => [{ ...payload, status: "lost" }, ...current]);
    }

    setDraft(emptyDraft());
    setEditingId(null);
    setEditingList("lost");
    setActiveView(draft.status === "claimed" ? "claimed" : "lost");
    setDisplayMode(draft.status === "claimed" ? "claimed" : "lost");
  }

  function handleEdit(item, listType) {
    setEditingId(item.id);
    setEditingList(listType);
    setDraft({
      item: item.item,
      found_location: item.found_location,
      returned_by: item.returned_by ?? "",
      role: item.role ?? "faculty",
      id_type: item.id_type ?? "",
      id_number: item.id_number ?? "",
      status: item.status ?? "lost",
      owner_name: item.owner_name ?? "",
      owner_role: item.owner_role ?? "student",
      owner_id_type: item.owner_id_type ?? "",
      owner_id_number: item.owner_id_number ?? "",
    });
    setActiveView(listType === "claimed" ? "claimed" : "lost");
    setDisplayMode(listType === "claimed" ? "claimed" : "lost");
  }

  function handleArchive(item) {
    setArchivedItems((current) => [{ ...item, archivedAt: new Date().toLocaleString() }, ...current]);
    if (item.status === "claimed") {
      setClaimedItems((current) => current.filter((entry) => entry.id !== item.id));
    } else {
      setLostItems((current) => current.filter((entry) => entry.id !== item.id));
    }
  }

  if (isLoading) {
    return <DemoLoading message="Loading Admin Console..." isFading={fadeOut} />;
  }

  return (
    <div className={`min-h-screen bg-slate-950 px-4 py-8 text-slate-100 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-3 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Admin Demo</p>
            <h1 className="text-2xl font-semibold text-white">Administration Console</h1>
          </div>
          <button type="button" onClick={handleExit} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
            Choose Another Role
          </button>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Current Demo Inventory</h2>
            <p className="mt-1 text-sm text-slate-400">This table displays the seed items the admin can edit, archive, or reset during the demo session.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Found Location</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoInventory.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800 odd:bg-slate-900/70 even:bg-slate-950/60">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-white">{item.item}</td>
                    <td className="px-4 py-3">{item.found_location}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "claimed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
                        {item.status}
                      </span>
                    </td>
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
                { label: "Archive", value: "archive" },
              ].map((tab) => (
                <button key={tab.value} type="button" onClick={() => { setActiveView(tab.value); if (tab.value !== "archive") setDisplayMode(tab.value); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeView === tab.value ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-200 hover:bg-slate-700"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search items or owners" className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 sm:max-w-md" />
              <button type="button" onClick={refreshDemo} className="rounded-full bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
                Refresh
              </button>
            </div>

            {activeView === "archive" ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="min-w-full text-left text-sm text-slate-200">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Archived</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivedItems.length > 0 ? archivedItems.map((item) => (
                      <tr key={`${item.id}-archive`} className="border-t border-slate-800 odd:bg-slate-900/70 even:bg-slate-950/60">
                        <td className="px-4 py-3 font-semibold text-white">{item.item}</td>
                        <td className="px-4 py-3">{item.found_location}</td>
                        <td className="px-4 py-3 text-slate-400">{item.archivedAt}</td>
                      </tr>
                    )) : <tr><td colSpan="3" className="px-4 py-6 text-center text-slate-400">No archived items yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="min-w-full text-left text-sm text-slate-200">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.length > 0 ? visibleItems.map((item) => (
                      <tr key={item.id} className="border-t border-slate-800 odd:bg-slate-900/70 even:bg-slate-950/60">
                        <td className="px-4 py-3 font-semibold text-white">{item.item}</td>
                        <td className="px-4 py-3">{item.found_location}</td>
                        <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "claimed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>{item.status}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => handleEdit(item, activeView === "claimed" ? "claimed" : "lost")} className="rounded-full bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700">Edit</button>
                            <button type="button" onClick={() => handleArchive(item)} className="rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-300">Archive</button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-400">No items match the current view.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="text-lg font-semibold text-white">{editingId ? "Edit Item" : "Create Item"}</h2>
            <p className="mt-1 text-sm text-slate-400">Admins can change records during the current demo session and archive them without deleting them.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input required value={draft.item} onChange={(event) => setDraft((current) => ({ ...current, item: event.target.value }))} placeholder="Item" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <input required value={draft.found_location} onChange={(event) => setDraft((current) => ({ ...current, found_location: event.target.value }))} placeholder="Found Location" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <input required value={draft.returned_by} onChange={(event) => setDraft((current) => ({ ...current, returned_by: event.target.value }))} placeholder="Returned By" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input required value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))} placeholder="Role" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                <input required value={draft.id_type} onChange={(event) => setDraft((current) => ({ ...current, id_type: event.target.value }))} placeholder="ID Type" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              </div>
              <input required value={draft.id_number} onChange={(event) => setDraft((current) => ({ ...current, id_number: event.target.value }))} placeholder="ID Number" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
              <select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none">
                <option value="lost">Lost</option>
                <option value="claimed">Claimed</option>
              </select>
              {draft.status === "claimed" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={draft.owner_name} onChange={(event) => setDraft((current) => ({ ...current, owner_name: event.target.value }))} placeholder="Owner Name" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                  <input value={draft.owner_role} onChange={(event) => setDraft((current) => ({ ...current, owner_role: event.target.value }))} placeholder="Owner Role" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                  <input value={draft.owner_id_type} onChange={(event) => setDraft((current) => ({ ...current, owner_id_type: event.target.value }))} placeholder="Owner ID Type" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                  <input value={draft.owner_id_number} onChange={(event) => setDraft((current) => ({ ...current, owner_id_number: event.target.value }))} placeholder="Owner ID Number" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none" />
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">{editingId ? "Save Changes" : "Add Item"}</button>
                <button type="button" onClick={() => { setDraft(emptyDraft()); setEditingId(null); setEditingList("lost"); }} className="rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">Cancel</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminAccountDemo;
