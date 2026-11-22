
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiHome,
  FiTool,
  FiSmartphone,
  FiCoffee,
  FiScissors,
  FiDroplet,
  FiSearch,
  FiFilter,
  FiClock,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiArrowRight,
  FiChevronDown,
  FiX,
  FiBookOpen,
  FiPlusCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiLayers,
} from "react-icons/fi";

const categories = [
  {
    id: "home",
    title: "Home Repairs & Maintenance",
    description: "Practical fixes and improvements around the home.",
    icon: FiHome,
    color: "amber",
    guides: [
      {
        id: "leaking-tap",
        title: "Fixing a Leaking Tap Ghana-Style",
        description: "Learn how to identify common tap leaks and understand the basic repairs and materials involved.",
        duration: "30 mins",
        difficulty: "Beginner",
        likes: 124,
        saved: 56,
        materials: ["Adjustable spanner", "Replacement washer or cartridge", "Cloth", "Suitable replacement fittings"],
        steps: [
          "Turn off the water supply before starting any repair.",
          "Identify where the water is leaking from.",
          "Check whether the washer, cartridge or connection needs attention.",
          "Replace damaged components with compatible parts.",
          "Restore the water supply slowly and check for leaks.",
        ],
        safety: "Always isolate the water supply before dismantling a tap. If the pipework is damaged or the repair is beyond your experience, contact a qualified plumber.",
      },
      {
        id: "window-screens",
        title: "Replacing Broken Window Screens",
        description: "Learn how to replace damaged mosquito screens and help keep insects outside your home.",
        duration: "45 mins",
        difficulty: "Intermediate",
        likes: 89,
        saved: 43,
        materials: ["Replacement mesh", "Measuring tape", "Scissors", "Screen spline", "Spline roller"],
        steps: [
          "Measure the window frame carefully.",
          "Remove the damaged mesh and old spline.",
          "Cut replacement mesh slightly larger than the frame.",
          "Fit the mesh evenly and secure it with the spline.",
          "Trim excess mesh and check that the screen fits properly.",
        ],
        safety: "Take care when using scissors or cutting tools. Use a stable work surface.",
      },
      {
        id: "led-lighting",
        title: "Installing Energy-Saving Lights",
        description: "Understand how LED lighting can reduce electricity consumption and improve home lighting.",
        duration: "1 hour",
        difficulty: "Beginner",
        likes: 203,
        saved: 98,
        materials: ["Compatible LED bulbs", "Suitable light fittings"],
        steps: [
          "Identify the type and rating of your existing light fitting.",
          "Choose an LED bulb with a compatible base and suitable brightness.",
          "Switch off the light and allow the old bulb to cool.",
          "Replace the bulb according to the manufacturer's instructions.",
          "Restore power and check that the light works correctly.",
        ],
        safety: "This guide covers bulb replacement only. Electrical wiring and fitting installation should be handled by a qualified electrician.",
      },
    ],
  },
  {
    id: "electronics",
    title: "Electronics & Gadgets",
    description: "Care, maintenance and practical technology tips.",
    icon: FiSmartphone,
    color: "blue",
    guides: [
      {
        id: "phone-battery",
        title: "Replacing Phone Battery Safely",
        description: "Understand battery care, warning signs and what to consider before replacing a phone battery.",
        duration: "45 mins",
        difficulty: "Intermediate",
        likes: 167,
        saved: 72,
        materials: ["Compatible replacement battery", "Manufacturer-approved tools", "Device repair guide"],
        steps: [
          "Identify your exact phone model and compatible battery.",
          "Back up important information before repair.",
          "Power off the phone completely.",
          "Follow the manufacturer's repair instructions or use a qualified technician.",
          "Check battery performance after replacement.",
        ],
        safety: "Lithium-ion batteries can catch fire if punctured, bent or mishandled. Do not attempt to remove a swollen or damaged battery yourself.",
      },
      {
        id: "laptop-fan",
        title: "Cleaning Laptop Fan for Better Performance",
        description: "Learn how dust affects laptop cooling and how to maintain your device responsibly.",
        duration: "30 mins",
        difficulty: "Beginner",
        likes: 95,
        saved: 38,
        materials: ["Soft brush", "Microfibre cloth", "Compressed air designed for electronics"],
        steps: [
          "Shut down the laptop and disconnect the charger.",
          "Allow the laptop to cool completely.",
          "Check the manufacturer's cleaning instructions.",
          "Clean accessible vents gently without forcing objects inside.",
          "Reconnect the laptop and check its temperature during normal use.",
        ],
        safety: "Do not open the laptop unless you know how to do so safely. Avoid liquids and excessive compressed air.",
      },
      {
        id: "solar-charger",
        title: "Setting Up a Solar Phone Charger",
        description: "Explore how a small solar charging kit can make use of Ghana's sunshine.",
        duration: "1 hour",
        difficulty: "Intermediate",
        likes: 145,
        saved: 67,
        materials: ["Compatible solar panel", "Charge controller or regulated USB output", "USB cable", "Manufacturer instructions"],
        steps: [
          "Choose a solar charger designed for your device.",
          "Read the panel's voltage and output specifications.",
          "Position the panel in a stable, well-lit location.",
          "Connect your device using the recommended cable and output.",
          "Monitor charging and disconnect when finished.",
        ],
        safety: "Use a properly regulated charging product. Do not connect an unregulated panel directly to your phone.",
      },
    ],
  },
  {
    id: "crafts",
    title: "Ghanaian Crafts & Creativity",
    description: "Celebrate local creativity, culture and handmade products.",
    icon: FiScissors,
    color: "purple",
    guides: [
      {
        id: "kente-wall-art",
        title: "Creating Kente-Inspired Wall Art",
        description: "Create colourful wall decorations inspired by traditional Ghanaian textile patterns.",
        duration: "2 hours",
        difficulty: "Intermediate",
        likes: 212,
        saved: 104,
        materials: ["Fabric or canvas", "Coloured materials", "Ruler", "Fabric glue or sewing supplies"],
        steps: [
          "Choose a pattern and colour combination.",
          "Measure and prepare your canvas or fabric.",
          "Arrange your colours and shapes before attaching them.",
          "Secure the materials carefully.",
          "Allow the finished piece to dry before displaying it.",
        ],
        safety: "Use adhesives in a ventilated space and follow the product instructions.",
      },
      {
        id: "shea-candles",
        title: "Making Shea Butter Candles",
        description: "Explore a creative candle-making project using suitable candle wax and locally inspired materials.",
        duration: "1.5 hours",
        difficulty: "Beginner",
        likes: 178,
        saved: 89,
        materials: ["Candle-making wax", "Suitable wick", "Heat-safe container", "Thermometer", "Fragrance suitable for candles"],
        steps: [
          "Prepare a clean, heat-safe container.",
          "Secure the wick in the centre of the container.",
          "Melt candle-making wax using an appropriate controlled heating method.",
          "Follow the wax manufacturer's recommended temperature and pouring instructions.",
          "Allow the candle to cool and set completely.",
        ],
        safety: "Hot wax can cause burns. Use proper candle-making wax and equipment. Do not assume ordinary shea butter is suitable as a candle fuel.",
      },
      {
        id: "adinkra-stamping",
        title: "Adinkra Symbol Stamping Techniques",
        description: "Explore traditional Adinkra-inspired designs for fabric, cards and creative projects.",
        duration: "1 hour",
        difficulty: "Beginner",
        likes: 156,
        saved: 76,
        materials: ["Fabric or paper", "Stamping tools", "Fabric or craft ink", "Practice material"],
        steps: [
          "Choose the symbols and meanings you want to represent.",
          "Prepare your fabric or paper on a flat surface.",
          "Test your stamp and ink on spare material.",
          "Apply even pressure when stamping.",
          "Allow the design to dry according to the ink instructions.",
        ],
        safety: "Use inks suitable for your chosen material and protect your work surface.",
      },
    ],
  },
  {
    id: "cooking",
    title: "Ghanaian Cooking & Kitchen Hacks",
    description: "Food preparation, kitchen skills and practical household tips.",
    icon: FiCoffee,
    color: "red",
    guides: [
      {
        id: "fruit-juice",
        title: "Making Natural Fruit Juices",
        description: "Prepare refreshing drinks from seasonal fruits using simple kitchen equipment.",
        duration: "45 mins",
        difficulty: "Beginner",
        likes: 245,
        saved: 123,
        materials: ["Fresh fruits", "Clean water", "Blender or juicer", "Clean storage container"],
        steps: [
          "Select fresh, ripe fruits.",
          "Wash the fruits thoroughly under clean running water.",
          "Remove any damaged portions and prepare the fruit.",
          "Blend or juice using clean equipment.",
          "Serve immediately or refrigerate promptly in a clean, covered container.",
        ],
        safety: "Keep hands, utensils and preparation surfaces clean. Refrigerate fresh juice promptly.",
      },
      {
        id: "ghanaian-bread",
        title: "Baking Perfect Ghanaian Bread",
        description: "Learn the basic preparation process for homemade bread.",
        duration: "2 hours",
        difficulty: "Intermediate",
        likes: 189,
        saved: 94,
        materials: ["Flour", "Yeast", "Water or milk", "Sugar", "Salt", "Suitable baking equipment"],
        steps: [
          "Measure ingredients according to a reliable recipe.",
          "Combine the ingredients and knead the dough.",
          "Allow the dough to rise in a suitable warm place.",
          "Shape the dough and allow it to rise again if required.",
          "Bake at the temperature and time specified in your recipe.",
        ],
        safety: "Use oven gloves when handling hot baking trays and follow your recipe's baking temperatures.",
      },
      {
        id: "vegetable-preservation",
        title: "Preserving Vegetables for Off-Season",
        description: "Explore safe ways to store vegetables and reduce household food waste.",
        duration: "1 hour",
        difficulty: "Beginner",
        likes: 134,
        saved: 67,
        materials: ["Fresh vegetables", "Clean storage containers", "Refrigerator or freezer"],
        steps: [
          "Select fresh vegetables and remove damaged portions.",
          "Wash and prepare them using clean utensils.",
          "Choose an appropriate method such as refrigeration or freezing.",
          "Package vegetables in clean, suitable containers.",
          "Label containers with the storage date and use them appropriately.",
        ],
        safety: "Use tested food-preservation instructions. Do not store vegetables in unsafe conditions or rely on appearance alone to judge food safety.",
      },
    ],
  },
  {
    id: "fashion",
    title: "Fashion & Textiles",
    description: "Clothing repairs, textile creativity and accessories.",
    icon: FiBookmark,
    color: "pink",
    guides: [
      {
        id: "sewing-fixes",
        title: "Simple Sewing Fixes for Traditional Wear",
        description: "Learn basic ways to repair loose seams, missing buttons and minor clothing damage.",
        duration: "30 mins",
        difficulty: "Beginner",
        likes: 112,
        saved: 54,
        materials: ["Needle", "Matching thread", "Scissors", "Replacement buttons"],
        steps: [
          "Identify the damaged area and choose a suitable repair.",
          "Select thread that matches the fabric.",
          "Secure loose seams with small, even stitches.",
          "Replace missing buttons using firm stitches.",
          "Check the repair before wearing the garment.",
        ],
        safety: "Store needles and scissors safely when not in use.",
      },
      {
        id: "bead-accessories",
        title: "Creating Modern Accessories with Local Beads",
        description: "Make simple accessories inspired by Ghanaian beadwork and contemporary styles.",
        duration: "1.5 hours",
        difficulty: "Intermediate",
        likes: 167,
        saved: 82,
        materials: ["Suitable beads", "Beading thread or wire", "Clasp", "Scissors", "Beading tools"],
        steps: [
          "Choose a design and select suitable beads.",
          "Arrange the beads in your preferred pattern.",
          "Measure the required length.",
          "Thread the beads and secure the ends with an appropriate clasp.",
          "Check that the finished accessory is secure and comfortable.",
        ],
        safety: "Keep small beads away from young children and use tools carefully.",
      },
    ],
  },
  {
    id: "garden",
    title: "Gardening & Urban Farming",
    description: "Grow food, reuse resources and make better use of small spaces.",
    icon: FiDroplet,
    color: "green",
    guides: [
      {
        id: "container-gardening",
        title: "Container Gardening in Small Spaces",
        description: "Grow herbs and vegetables in containers, balconies and small urban spaces.",
        duration: "1 hour",
        difficulty: "Beginner",
        likes: 198,
        saved: 102,
        materials: ["Containers with drainage holes", "Suitable soil or growing medium", "Seeds or seedlings", "Watering container"],
        steps: [
          "Choose a location with suitable sunlight.",
          "Select containers with adequate drainage.",
          "Fill them with a suitable growing medium.",
          "Plant seeds or seedlings according to their instructions.",
          "Water appropriately and monitor plant growth.",
        ],
        safety: "Make sure containers are stable and excess water can drain away.",
      },
      {
        id: "composting",
        title: "Composting Kitchen Waste",
        description: "Turn suitable kitchen scraps and garden waste into useful compost.",
        duration: "30 mins to several weeks",
        difficulty: "Beginner",
        likes: 176,
        saved: 88,
        materials: ["Suitable compost container", "Dry leaves or cardboard", "Fruit and vegetable scraps", "Garden waste"],
        steps: [
          "Choose a suitable, well-drained composting location.",
          "Collect suitable fruit and vegetable scraps.",
          "Mix green materials with dry materials such as leaves or cardboard.",
          "Keep the compost appropriately moist and aerated.",
          "Allow the material to break down before using mature compost.",
        ],
        safety: "Avoid adding meat, dairy or oily food scraps to a basic home compost system. Keep the area clean to discourage pests.",
      },
    ],
  },
];

const colorStyles = {
  amber: {
    icon: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    light: "bg-amber-50",
    accent: "text-amber-700",
    button: "bg-amber-600 hover:bg-amber-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    light: "bg-blue-50",
    accent: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  purple: {
    icon: "bg-purple-100 text-purple-700",
    border: "border-purple-200",
    light: "bg-purple-50",
    accent: "text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700",
  },
  red: {
    icon: "bg-red-100 text-red-700",
    border: "border-red-200",
    light: "bg-red-50",
    accent: "text-red-700",
    button: "bg-red-600 hover:bg-red-700",
  },
  pink: {
    icon: "bg-pink-100 text-pink-700",
    border: "border-pink-200",
    light: "bg-pink-50",
    accent: "text-pink-700",
    button: "bg-pink-600 hover:bg-pink-700",
  },
  green: {
    icon: "bg-green-100 text-green-700",
    border: "border-green-200",
    light: "bg-green-50",
    accent: "text-green-700",
    button: "bg-green-600 hover:bg-green-700",
  },
};

const difficultyStyles = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const DIY = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [openCategories, setOpenCategories] = useState(["home"]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showSubmitInfo, setShowSubmitInfo] = useState(false);
  const [likedGuides, setLikedGuides] = useState(() => readStorage("ghanaConsumerDIYLikes"));
  const [savedGuides, setSavedGuides] = useState(() => readStorage("ghanaConsumerDIYSaved"));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("ghanaConsumerDIYLikes", JSON.stringify(likedGuides));
  }, [likedGuides]);

  useEffect(() => {
    localStorage.setItem("ghanaConsumerDIYSaved", JSON.stringify(savedGuides));
  }, [savedGuides]);

  const allGuides = useMemo(
    () => categories.flatMap((category) =>
      category.guides.map((guide) => ({
        ...guide,
        categoryId: category.id,
        categoryTitle: category.title,
        categoryColor: category.color,
      }))
    ),
    []
  );

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .filter((category) => activeFilter === "all" || category.id === activeFilter)
      .map((category) => ({
        ...category,
        guides: category.guides.filter((guide) => {
          const matchesSearch =
            !query ||
            guide.title.toLowerCase().includes(query) ||
            guide.description.toLowerCase().includes(query) ||
            category.title.toLowerCase().includes(query) ||
            guide.materials.some((material) => material.toLowerCase().includes(query));

          const matchesDifficulty =
            difficultyFilter === "all" || guide.difficulty === difficultyFilter;

          return matchesSearch && matchesDifficulty;
        }),
      }))
      .filter((category) => category.guides.length > 0);
  }, [searchQuery, activeFilter, difficultyFilter]);

  const visibleGuideCount = filteredCategories.reduce(
    (total, category) => total + category.guides.length,
    0
  );

  const toggleCategory = (id) => {
    setOpenCategories((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleLike = (guideId) => {
    setLikedGuides((current) =>
      current.includes(guideId)
        ? current.filter((id) => id !== guideId)
        : [...current, guideId]
    );
  };

  const toggleSave = (guideId) => {
    const isSaved = savedGuides.includes(guideId);

    setSavedGuides((current) =>
      isSaved
        ? current.filter((id) => id !== guideId)
        : [...current, guideId]
    );

    setNotice(isSaved ? "Guide removed from your saved list." : "Guide saved to your browser.");
    setTimeout(() => setNotice(""), 2500);
  };

  const shareGuide = async (guide) => {
    const shareData = {
      title: guide.title,
      text: guide.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${guide.title}\n${guide.description}\n${window.location.href}`
        );
        setNotice("Guide link copied. You can now share it.");
        setTimeout(() => setNotice(""), 2500);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setNotice("Sharing is not available on this device.");
        setTimeout(() => setNotice(""), 2500);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
    setDifficultyFilter("all");
  };

  const selectedGuideCategory = selectedGuide
    ? categories.find((category) => category.id === selectedGuide.categoryId)
    : null;

  const selectedGuideColors = selectedGuideCategory
    ? colorStyles[selectedGuideCategory.color]
    : colorStyles.amber;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-green-50 px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/20">
            <FiTool className="text-3xl" />
          </div>

          <span className="mb-4 inline-flex items-center rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            Learn · Create · Repair · Save
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Ghana Consumer
            <span className="mt-2 block bg-gradient-to-r from-amber-600 via-green-700 to-red-600 bg-clip-text text-transparent">
              DIY Guides
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Practical ideas, useful skills and step-by-step guides to help you
            repair, create, grow and make smarter choices in everyday life.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#explore-guides"
              className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700"
            >
              Explore Guides <FiArrowRight />
            </a>
            <button
              onClick={() => setShowSubmitInfo(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
            >
              <FiPlusCircle /> Share an Idea
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick statistics */}
      <section className="relative z-10 mx-auto -mt-5 max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg sm:grid-cols-4">
          {[
            { label: "DIY Categories", value: categories.length, icon: FiLayers },
            { label: "Available Guides", value: allGuides.length, icon: FiBookOpen },
            { label: "Saved by You", value: savedGuides.length, icon: FiBookmark },
            { label: "Your Likes", value: likedGuides.length, icon: FiHeart },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Icon className="text-lg" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guide explorer */}
      <section id="explore-guides" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
            Explore and learn
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Find the right guide
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search by topic, material or skill level, then open a guide to see
            what you need and how to get started.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <label htmlFor="diy-search" className="mb-2 block text-sm font-semibold text-slate-700">
                Search guides
              </label>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="diy-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'tap', 'garden' or 'beads'..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="diy-category" className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>
              <div className="relative">
                <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="diy-category"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="diy-difficulty" className="mb-2 block text-sm font-semibold text-slate-700">
                Difficulty
              </label>
              <select
                id="diy-difficulty"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              >
                <option value="all">All skill levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500" aria-live="polite">
              Showing <strong className="text-slate-800">{visibleGuideCount}</strong>{" "}
              {visibleGuideCount === 1 ? "guide" : "guides"}
            </p>
            {(searchQuery || activeFilter !== "all" || difficultyFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-amber-700 hover:text-amber-800"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Categories and guide cards */}
        <div className="space-y-5">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            const styles = colorStyles[category.color];
            const isOpen =
              openCategories.includes(category.id) ||
              Boolean(searchQuery.trim()) ||
              activeFilter !== "all" ||
              difficultyFilter !== "all";

            return (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`overflow-hidden rounded-2xl border ${styles.border} bg-white shadow-sm`}
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}>
                      <Icon className="text-xl" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 sm:text-lg">
                        {category.title}
                      </h3>
                      <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                        {category.description}
                      </p>
                      <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {category.guides.length} {category.guides.length === 1 ? "guide" : "guides"}
                      </span>
                    </div>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="shrink-0 text-slate-500"
                  >
                    <FiChevronDown className="text-xl" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4 border-t border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
                        {category.guides.map((guide) => {
                          const isLiked = likedGuides.includes(guide.id);
                          const isSaved = savedGuides.includes(guide.id);

                          return (
                            <article
                              key={guide.id}
                              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                            >
                              <div className="mb-3 flex items-center justify-between gap-2">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyles[guide.difficulty]}`}>
                                  {guide.difficulty}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                  <FiClock /> {guide.duration}
                                </span>
                              </div>

                              <h4 className="text-base font-bold leading-snug text-slate-900">
                                {guide.title}
                              </h4>
                              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                                {guide.description}
                              </p>

                              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => toggleLike(guide.id)}
                                    aria-label={isLiked ? "Unlike guide" : "Like guide"}
                                    aria-pressed={isLiked}
                                    className={`inline-flex items-center gap-1 text-sm transition ${
                                      isLiked ? "font-semibold text-red-600" : "text-slate-500 hover:text-red-600"
                                    }`}
                                  >
                                    <FiHeart className={isLiked ? "fill-current" : ""} />
                                    {guide.likes + (isLiked ? 1 : 0)}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => toggleSave(guide.id)}
                                    aria-label={isSaved ? "Remove saved guide" : "Save guide"}
                                    aria-pressed={isSaved}
                                    className={`inline-flex items-center gap-1 text-sm transition ${
                                      isSaved ? "font-semibold text-amber-700" : "text-slate-500 hover:text-amber-700"
                                    }`}
                                  >
                                    <FiBookmark className={isSaved ? "fill-current" : ""} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => shareGuide(guide)}
                                    aria-label="Share guide"
                                    className="text-slate-500 transition hover:text-blue-600"
                                  >
                                    <FiShare2 />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedGuide({
                                      ...guide,
                                      categoryId: category.id,
                                    })
                                  }
                                  className={`inline-flex items-center gap-1 text-sm font-bold ${styles.accent} transition hover:gap-2`}
                                >
                                  View guide <FiArrowRight />
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiSearch className="text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No guides found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find a guide matching your search. Try another
                keyword or change your filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Show all guides
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contribution call to action */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-12 text-center text-white shadow-xl sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <FiBookOpen className="text-2xl" />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
            Have a useful skill to share?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-amber-50">
            Your knowledge could help someone save money, solve a problem or
            learn something new. We welcome practical ideas from across Ghana.
          </p>
          <button
            onClick={() => setShowSubmitInfo(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-amber-700 transition hover:bg-amber-50"
          >
            Suggest a DIY Guide <FiArrowRight />
          </button>
        </div>
      </section>

      {/* Notification */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            role="status"
            className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide details modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGuide(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-modal-title"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="my-8 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className={`border-b p-6 ${selectedGuideColors.light} ${selectedGuideColors.border}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedGuideColors.accent}`}>
                      {selectedGuideCategory?.title}
                    </span>
                    <h2 id="guide-modal-title" className="mt-2 text-2xl font-extrabold text-slate-900">
                      {selectedGuide.title}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-600">
                      {selectedGuide.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    aria-label="Close guide"
                    className="rounded-full bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-100"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-slate-600">
                    <FiClock /> {selectedGuide.duration}
                  </span>
                  <span className={`rounded-full px-3 py-2 font-semibold ${difficultyStyles[selectedGuide.difficulty]}`}>
                    {selectedGuide.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-7 p-6">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <FiTool className="text-amber-600" /> What you will need
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {selectedGuide.materials.map((material) => (
                      <li key={material} className="flex items-start gap-2 text-sm text-slate-600">
                        <FiCheckCircle className="mt-0.5 shrink-0 text-green-600" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <FiBookOpen className="text-amber-600" /> Getting started
                  </h3>
                  <ol className="mt-4 space-y-4">
                    {selectedGuide.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-6 text-slate-600">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="flex items-center gap-2 font-bold text-amber-900">
                    <FiAlertCircle /> Safety reminder
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-amber-900/80">
                    {selectedGuide.safety}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => toggleSave(selectedGuide.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
                  >
                    <FiBookmark />
                    {savedGuides.includes(selectedGuide.id) ? "Saved" : "Save guide"}
                  </button>
                  <button
                    onClick={() => shareGuide(selectedGuide)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${selectedGuideColors.button}`}
                  >
                    <FiShare2 /> Share guide
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggest a guide information modal */}
      <AnimatePresence>
        {showSubmitInfo && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSubmitInfo(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="suggest-guide-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <FiPlusCircle className="text-2xl" />
                  </div>
                  <h2 id="suggest-guide-title" className="mt-4 text-xl font-extrabold text-slate-900">
                    Share your DIY knowledge
                  </h2>
                </div>
                <button
                  onClick={() => setShowSubmitInfo(false)}
                  aria-label="Close suggestion information"
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                >
                  <FiX />
                </button>
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We want to feature useful, original and practical ideas from
                people across Ghana. A guide suggestion should explain the
                problem it solves, the materials needed and the steps involved.
              </p>

              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900">
                  Guide submissions are not connected yet.
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-900/80">
                  This section is ready for a submission form. It will need a
                  database connection before suggestions can be received and
                  reviewed by the Ghana Consumer team.
                </p>
              </div>

              <button
                onClick={() => setShowSubmitInfo(false)}
                className="mt-6 w-full rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default DIY;
