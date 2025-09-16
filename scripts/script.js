//===================== nav and footer insert =============//
class IncludeHTML extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    if (!src) return;
    fetch(src, { cache: "no-cache" })
      .then((res) => res.text())
      .then((html) => {
        this.innerHTML = html;
      })
      .catch((err) => {
        this.innerHTML = `<!-- Download mistake: ${err.message} -->`;
      });
  }
}
customElements.define("include-html", IncludeHTML);
//================ event page =======================//

//================== massives ================================//
const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
    spots: 2,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

//=========================== functions  ====================//
function createEl(element, className, parent, text) {
  const el = document.createElement(element);
  if (className) el.className = className;
  if (text != null) el.textContent = String(text);
  if (parent) parent.append(el);
  return el;
}

function createSelect(options, className, onChange) {
  const select = createEl("select", className);
  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    select.append(option);
  });

  select.value = options[0]?.value ?? "";
  select.addEventListener("change", () => onChange(select.value));
  return select;
}

function createFilters() {
  const typeOptions = [
    { value: "", label: "Any type" },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];
  const typeSelect = createSelect(typeOptions, " filter", (val) => {
    state.type = val;
    render();
  });

  const distanceOptions = [
    { value: "", label: "Any distance" },
    { value: "5", label: "Within 5 km" },
    { value: "10", label: "Within 10 km" },
    { value: "25", label: "Within 25 km" },
    { value: "50", label: "Within 50 km" },
    { value: "100", label: "Within 100 km" },
  ];
  const distSelect = createSelect(distanceOptions, "filter", (val) => {
    state.distance = val;
    render();
  });

  const categoryOptions = [
    { value: "", label: "Any category" },
    { value: "Social Activities", label: "Social Activities" },
    { value: "Hobbies and Passions", label: "Hobbies and Passions" },
    { value: "Health and Wellbeing", label: "Health and Wellbeing" },
    { value: "Business", label: "Business" },
    { value: "Technology", label: "Technology" },
  ];
  const catSelect = createSelect(categoryOptions, "filter", (val) => {
    state.category = val;
    render();
  });

  const dateInput = createEl("input", "filter");
  dateInput.type = "date";
  dateInput.addEventListener("change", () => {
    state.date = dateInput.value;
    render();
  });

  document.querySelector(".eventType")?.appendChild(typeSelect);
  document.querySelector(".eventDistance")?.appendChild(distSelect);
  document.querySelector(".eventCategory")?.appendChild(catSelect);
  document.querySelector(".eventDate")?.appendChild(dateInput);
}

function applyFilters(list) {
  return list.filter((ev) => {
    if (state.type && ev.type !== state.type) return false;
    if (state.category && ev.category !== state.category) return false;
    if (
      state.distance &&
      ev.type === "offline" &&
      ev.distance > Number(state.distance)
    )
      return false;
    if (state.date) {
      const evDate = ev.date.toISOString().split("T")[0];
      if (evDate !== state.date) return false;
    }
    if (state.search) {
      const text = (ev.title + " " + ev.description).toLowerCase();
      if (!text.includes(state.search)) return false;
    }
    return true;
  });
}

function formatDateUTC(d) {
  const wd = d
    .toLocaleString("en-US", { weekday: "short", timeZone: "UTC" })
    .toUpperCase();
  const mo = d
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const day = String(d.getUTCDate()).padStart(2, "0");
  const time = d
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
    .toUpperCase();
  return `${wd}, ${mo} ${day} · ${time} UTC`;
}

function cameraSVG() {
  const span = document.createElement("span");
  span.className = "iconCam";
  span.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16">
      <path d="M15 8l5-3v14l-5-3v2H3V6h12v2z" fill="currentColor"/>
    </svg>`;
  return span;
}

function useSearchDelegated() {
  document.addEventListener("input", (e) => {
    if (e.target && e.target.matches(".search")) {
      state.search = e.target.value.trim().toLowerCase();
      render();
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target && e.target.matches(".navSearch")) {
      e.preventDefault();
    }
  });
}

function renderEvents(list) {
  const host = document.getElementById("eventsList");
  if (!host) return;
  host.innerHTML = "";

  if (!list.length) {
    host.textContent = "No events match your filters.";
    return;
  }

  list.forEach((ev) => {
    const card = createEl("div", "eventCard", host);

    const imgWrap = createEl("div", "eventImageWrap", card);
    const img = createEl("img", "eventImage", imgWrap);
    img.src = ev.image;
    img.alt = ev.title;

    const textWrap = createEl("div", "eventText", card);

    const dateStr = ev.date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
    createEl("p", "eventDateTime", textWrap, dateStr + " UTC");

    createEl("h3", "eventTitle", textWrap, ev.title);

    const catLine = createEl("p", "eventCategoryType", textWrap, ev.category);
    if (ev.type === "offline" && typeof ev.distance === "number") {
      catLine.append(` (${ev.distance} km)`);
    }

    if (ev.type === "online") {
      const typeLine = createEl("p", "eventTypeLine", textWrap);

      const camIcon = cameraSVG();
      typeLine.appendChild(camIcon);

      const txt = document.createElement("span");
      txt.textContent = "Online Event";
      typeLine.appendChild(txt);
    }

    if (typeof ev.attendees === "number") {
      const lineP = createEl("p", "eventAttendees", textWrap);

      const attSpan = createEl(
        "span",
        "attendeesCount",
        lineP,
        `${ev.attendees} attendees`
      );

      if (typeof ev.spots === "number") {
        const spotsSpan = createEl(
          "span",
          "spotsLeft",
          lineP,
          ` ${ev.spots} spots left`
        );
      }
    }
  });
}

function render() {
  const filtered = applyFilters(eventsStore);
  renderEvents(filtered);
}

function init() {
  const isEventsPage = !!document.getElementById("eventsList");

  useSearchDelegated();

  if (isEventsPage) {
    createFilters();
    renderEvents(eventsStore);
    render();
  }
}

document.addEventListener("DOMContentLoaded", init);

// ==================== state ============//
const state = {
  type: "",
  distance: "",
  category: "",
  date: "",
  search: "",
};

//================ map ====================//

document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("mapNY");
  if (!el || !window.L) return;

  const mql = matchMedia("(min-width: 1024px)");
  if (!mql.matches) return;

  const nyc = [40.7128, -74.006];
  const map = L.map("mapNY").setView(nyc, 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);
  L.marker(nyc).addTo(map).bindPopup("New York, NY");
});
