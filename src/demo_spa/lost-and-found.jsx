import { useEffect, useState } from "react";
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
  {
    id: 4,
    item: "Brown Leather Wallet",
    found_location: "Parking Lot A",
    returned_by: "Sarah Chen",
    role: "guard",
    id_type: "Security Pass",
    id_number: "SEC-7745",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 5,
    item: "Red USB Drive",
    found_location: "Computer Lab",
    returned_by: "Michael Johnson",
    role: "faculty",
    id_type: "Faculty Card",
    id_number: "FAC-2034",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 6,
    item: "AirPods Pro",
    found_location: "Student Lounge",
    returned_by: "Emma Davis",
    role: "staff",
    id_type: "Staff Badge",
    id_number: "STAFF-1123",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 7,
    item: "Black Umbrella",
    found_location: "Main Entrance",
    returned_by: "Robert Martinez",
    role: "guard",
    id_type: "Security Pass",
    id_number: "SEC-4421",
    status: "lost",
    image: null,
    image_name: null,
  },
  {
    id: 8,
    item: "College Textbook Set",
    found_location: "Building B Conference Room",
    returned_by: "Linda Anderson",
    role: "faculty",
    id_type: "Faculty Card",
    id_number: "FAC-5678",
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
  {
    id: 103,
    item: "Green Water Bottle",
    found_location: "Sports Court",
    returned_by: "Patricia King",
    role: "faculty",
    status: "claimed",
    owner_name: "Rebecca Hayes",
    owner_role: "student",
    owner_id_type: "Student ID",
    owner_id_number: "STU-2024-789",
    image: null,
    image_name: null,
  },
  {
    id: 104,
    item: "Gold Watch",
    found_location: "Office Building 3",
    returned_by: "Christopher Moore",
    role: "guard",
    status: "claimed",
    owner_name: "Angela White",
    owner_role: "faculty",
    owner_id_type: "Faculty Card",
    owner_id_number: "FAC-4156",
    image: null,
    image_name: null,
  },
];

const userDialogues = [
  "- Where Keys Vanish and Return… Eventually -",
  "- A Realm of Lost Treasures and Mildly Confused Socks -",
  "- Built on Forgotten Things and Questionable Magic -",
  "- Where the Misplaced Become Legendary -",
  "- Governed by Overlords, Powered by Sticky Notes -",
  "- A Land of Scrolls, Spells, and Sunglasses from 2008 -",
  "- United Under the Banner of 'Wait, Where'd It Go?' -",
  "- Realm of the Found, the Forgotten, and the 'Oh That's Mine!' -",
  "- The Magical Bureaucracy of Misplaced Marvels -",
  "- Where Legends Are Made of Lost ID Cards -",
];

function DemoApp({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [lostItems, setLostItems] = useState(DEMO_LOST_ITEMS);
  const [claimedItems, setClaimedItems] = useState(DEMO_CLAIMED_ITEMS);
  const [showClaimedItems, setShowClaimedItems] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isViewOwnerModalOpen, setIsViewOwnerModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isFullDetailsModalOpen, setIsFullDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageItem, setSelectedImageItem] = useState(null);

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

  useEffect(() => {
    let fadeTimer;
    const interval = setInterval(() => {
      setFade(false);
      fadeTimer = setTimeout(() => {
        setDialogueIndex((current) => (current + 1) % userDialogues.length);
        setFade(true);
      }, 260);
    }, 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, []);

  function sortData(items, key, direction) {
    return [...items].sort((a, b) => {
      const first = a[key] ?? "";
      const second = b[key] ?? "";
      const aVal = typeof first === "string" ? first.toLowerCase() : first;
      const bVal = typeof second === "string" ? second.toLowerCase() : second;

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  function handleSort(key) {
    setSortConfig((prevConfig) => {
      const direction = prevConfig.key === key && prevConfig.direction === "desc" ? "asc" : "desc";
      if (showClaimedItems) {
        setClaimedItems((current) => sortData(current, key, direction));
      } else {
        setLostItems((current) => sortData(current, key, direction));
      }
      return { key, direction };
    });
  }

  function filterData(items) {
    if (!searchTerm) return items;

    const searchableFields = showClaimedItems
      ? ["id", "item", "found_location", "returned_by", "owner_name", "owner_role", "status"]
      : ["id", "item", "found_location", "returned_by", "role", "id_type", "id_number", "status"];

    return items.filter((item) =>
      searchableFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }

  const displayedItems = filterData(showClaimedItems ? claimedItems : lostItems).filter(
    (item) => item.status === (showClaimedItems ? "claimed" : "lost"),
  );

  function refreshTable() {
    if (showClaimedItems) {
      setClaimedItems([...DEMO_CLAIMED_ITEMS]);
    } else {
      setLostItems([...DEMO_LOST_ITEMS]);
    }
  }

  function handleViewOwner(item) {
    setSelectedOwner({
      name: item.owner_name,
      role: item.owner_role,
      idType: item.owner_id_type,
      idNumber: item.owner_id_number,
    });
    setIsViewOwnerModalOpen(true);
  }

  function handleFullDetails(item) {
    setSelectedItem(item);
    setIsFullDetailsModalOpen(true);
  }

  function handleViewImage(item) {
    setSelectedImageItem(item);
    setIsImageModalOpen(true);
  }

  if (isLoading) {
    return <DemoLoading message="Loading Kingdom of Losttopia..." isFading={fadeOut} />;
  }

  return (
    <div className={`student-page min-h-screen bg-slate-950 text-slate-100 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <div className="student-layout mx-auto flex max-w-6xl flex-col rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/20">
        <header className="student-header flex-col">
          <div className="student-topbar flex flex-col gap-3 rounded-3xl border border-amber-400/20 bg-amber-400/10 sm:flex-row sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Student Demo</p>
              <h1 className="text-2xl font-semibold text-white">Student Dashboard</h1>
            </div>
            <button type="button" onClick={handleExit} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
              Choose Another Role
            </button>
          </div>
          <div className="student-intro flex flex-wrap items-center justify-center gap-3">
            <h1 className="student-title text-3xl font-semibold text-white sm:text-4xl">Kingdom of Losttopia</h1>
          </div>
          <p className={`student-subtitle mx-auto max-w-3xl text-sm text-slate-400 transition-opacity duration-500 text-center ${fade ? "opacity-100" : "opacity-0"}`}>
            {userDialogues[dialogueIndex]}
          </p>
        </header>

        <div className="student-toolbar">
          <div className="student-toolbar-row">
            <div className="brutal-tabs" role="tablist" aria-label="Inventory view">
              {[
                { label: "Lost Items", claimed: false },
                { label: "Claimed Items", claimed: true },
              ].map(({ label, claimed }) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={showClaimedItems === claimed}
                  className={`brutal-tab ${showClaimedItems === claimed ? "brutal-tab-active" : ""}`}
                  onClick={() => {
                    setShowClaimedItems(claimed);
                    setSearchTerm("");
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="student-search-controls">
              <div className="student-search flex w-full max-w-md items-center overflow-hidden rounded-full border border-slate-700 bg-slate-950 shadow-inner shadow-black/10 sm:w-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search items, locations, owners..."
                  className="student-search-input w-full bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="student-clear-button rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>
              <button
                type="button"
                onClick={refreshTable}
                className="student-refresh-button inline-flex items-center justify-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-slate-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        <section className="student-table overflow-x-auto rounded-1xl border border-slate-800 bg-slate-950/80 p-1 shadow-inner shadow-black/10">
          <table className="student-items-table min-w-full border-collapse text-left text-sm text-slate-200 md:text-base">
            <thead>
              <tr className="bg-slate-900 text-slate-300">
                {[
                  { label: "ID", key: "id" },
                  { label: "Item", key: "item" },
                  { label: "Image", key: null },
                  { label: "Found Location", key: "found_location" },
                  { label: "Status", key: "status" },
                  { label: "Actions", key: null },
                ].map(({ label, key }) => (
                  <th
                    key={label}
                    scope="col"
                    className="whitespace-nowrap px-4 py-4 text-left uppercase tracking-[0.2em]"
                    onClick={key ? () => handleSort(key) : undefined}
                  >
                    <div className={key ? "inline-flex cursor-pointer items-center gap-2" : "inline-flex items-center gap-2"}>
                      {label}
                      {sortConfig.key === key ? (sortConfig.direction === "asc" ? "▲" : "▼") : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800 even:bg-slate-950/60 odd:bg-slate-900/70">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-100">{item.item}</td>
                    <td className="px-4 py-3">
                      {item.image ? (
                        <button
                          type="button"
                          onClick={() => handleViewImage(item)}
                          className="rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-300"
                        >
                          View Image
                        </button>
                      ) : (
                        <span className="text-slate-500">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{item.found_location}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "claimed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleFullDetails(item)}
                        className="rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700 sm:text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-10 text-center text-slate-400">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {isViewOwnerModalOpen && selectedOwner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-black/40">
              <h2 className="mb-4 text-2xl font-semibold text-white">Owner Details</h2>
              <div className="space-y-3 text-slate-200">
                <p>
                  <span className="font-semibold text-slate-100">Name:</span> {selectedOwner.name}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">Role:</span> {selectedOwner.role}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">ID Type:</span> {selectedOwner.idType}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">ID Number:</span> {selectedOwner.idNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsViewOwnerModalOpen(false)}
                className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isFullDetailsModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-black/40">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-2xl font-semibold text-white">Item Full Details</h2>
                <button
                  type="button"
                  onClick={() => setIsFullDetailsModalOpen(false)}
                  className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Close
                </button>
              </div>

              {selectedItem.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={`data:image/jpeg;base64,${selectedItem.image}`}
                    alt={selectedItem.item}
                    className="max-h-72 rounded-3xl object-contain shadow-xl shadow-black/30"
                  />
                </div>
              )}

              <div className="grid gap-3 text-slate-200 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400">ID</p>
                  <p className="font-semibold text-white">{selectedItem.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Item</p>
                  <p className="font-semibold text-white">{selectedItem.item}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Found Location</p>
                  <p className="font-semibold text-white">{selectedItem.found_location}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="font-semibold text-white">{selectedItem.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Returned By</p>
                  <p className="font-semibold text-white">{selectedItem.returned_by || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Role</p>
                  <p className="font-semibold text-white">{selectedItem.role || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">ID Type</p>
                  <p className="font-semibold text-white">{selectedItem.id_type || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">ID Number</p>
                  <p className="font-semibold text-white">{selectedItem.id_number || "-"}</p>
                </div>
              </div>

              {selectedItem.owner_name && (
                <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Owner Information</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-400">Owner Name</p>
                      <p className="font-semibold text-white">{selectedItem.owner_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Owner Role</p>
                      <p className="font-semibold text-white">{selectedItem.owner_role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Owner ID Type</p>
                      <p className="font-semibold text-white">{selectedItem.owner_id_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Owner ID Number</p>
                      <p className="font-semibold text-white">{selectedItem.owner_id_number}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleViewOwner(selectedItem);
                      setIsFullDetailsModalOpen(false);
                    }}
                    className="mt-5 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    View Owner Details
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isImageModalOpen && selectedImageItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-black/40">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Item Image</h3>
                  <p className="text-slate-400">{selectedImageItem.item}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
              <div className="flex min-h-[220px] items-center justify-center rounded-3xl bg-slate-950/70 p-4">
                {selectedImageItem.image ? (
                  <img
                    src={`data:image/jpeg;base64,${selectedImageItem.image}`}
                    alt={selectedImageItem.item}
                    className="max-h-[60vh] w-full max-w-full rounded-3xl object-contain"
                  />
                ) : (
                  <p className="text-slate-400">No image available for this item</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoApp;
