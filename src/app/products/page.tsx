"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Eye, Star, X, ArrowLeft, ShoppingCart, Plus, Minus, Check, Scissors, Bone, Sparkles } from "lucide-react";

// Product interface
interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  availability: "In Stock" | "Out of Stock";
  discount: number; // in percentage
  mrp: number; // in INR
  image: string;
  description: string;
}

// 20 Curated Genuine Dog and Cat Products
const mockProducts: Product[] = [
  // DOG PRODUCTS
  {
    id: "dog-1",
    brand: "Royal Canin",
    name: "Royal Canin Adult Dog Food",
    category: "Dog Food",
    rating: 4.8,
    reviews: 142,
    availability: "In Stock",
    discount: 10,
    mrp: 7800,
    image: "/products/royal_canin_adult.png",
    description: "Precisely balanced nutrition for adult dogs. Supports digestive health, skin condition, and coat gloss with high-quality proteins and dietary fibers."
  },
  {
    id: "dog-2",
    brand: "Pedigree",
    name: "Pedigree Adult Dog Food",
    category: "Dog Food",
    rating: 4.5,
    reviews: 215,
    availability: "In Stock",
    discount: 12,
    mrp: 3200,
    image: "/products/pedigree_chicken_adult.png",
    description: "Complete and balanced dog food for adult dogs. Enriched with protein, calcium, and dietary fiber for strong muscles, bones, and digestive health."
  },
  {
    id: "dog-3",
    brand: "Drools",
    name: "Drools Puppy Food",
    category: "Dog Food",
    rating: 4.4,
    reviews: 98,
    availability: "In Stock",
    discount: 15,
    mrp: 2400,
    image: "/products/drools_focus_puppy.png",
    description: "Super premium formula for growing puppies. Features real chicken as the primary ingredient to support cognitive development and joint health."
  },
  {
    id: "dog-4",
    brand: "Kennel Kitchen",
    name: "Chicken Training Treats",
    category: "Treats",
    rating: 4.7,
    reviews: 110,
    availability: "In Stock",
    discount: 8,
    mrp: 350,
    image: "/products/chicken_training_treats.png",
    description: "Bite-sized training treats made with fresh regional chicken. Packed with natural proteins and absolutely free from artificial colors or preservatives."
  },
  {
    id: "dog-5",
    brand: "Gnawlers",
    name: "Dog Chew Bones",
    category: "Health & Wellness",
    rating: 4.6,
    reviews: 85,
    availability: "In Stock",
    discount: 10,
    mrp: 450,
    image: "/products/dog_chew_bones.png",
    description: "Highly digestible chew bones designed to promote dental health. Helps reduce tartar buildup, freshens breath, and satisfies natural chewing urges."
  },
  {
    id: "dog-6",
    brand: "FurryTail",
    name: "Orthopedic Dog Bed",
    category: "Beds",
    rating: 4.9,
    reviews: 167,
    availability: "In Stock",
    discount: 20,
    mrp: 5499,
    image: "/products/orthopedic_dog_bed.png",
    description: "Therapeutic cooling gel memory foam bed designed to support canine joints. Contoured foam bolster provides a secure headrest."
  },
  {
    id: "dog-7",
    brand: "PetSafe",
    name: "Stainless Steel Dog Bowl",
    category: "Bowls",
    rating: 4.7,
    reviews: 94,
    availability: "In Stock",
    discount: 15,
    mrp: 890,
    image: "/products/stainless_steel_dog_bowl.png",
    description: "Durable, rust-resistant food-grade stainless steel bowl. Features a non-slip silicone base to prevent spills and protect hardwood floors."
  },
  {
    id: "dog-8",
    brand: "Himalaya",
    name: "Oatmeal Dog Shampoo",
    category: "Grooming",
    rating: 4.5,
    reviews: 128,
    availability: "In Stock",
    discount: 5,
    mrp: 450,
    image: "/products/oatmeal_dog_shampoo.png",
    description: "Soothing natural oatmeal and lavender formulation. Relieves itchy, dry skin, leaving the coat feeling soft, fresh, and deeply conditioned."
  },
  {
    id: "dog-9",
    brand: "Trixie",
    name: "Adjustable Dog Leash",
    category: "Leashes",
    rating: 4.6,
    reviews: 73,
    availability: "In Stock",
    discount: 18,
    mrp: 1199,
    image: "/products/adjustable_dog_leash.png",
    description: "Heavy-duty nylon dog leash adjustable to three different lengths. Padded handle ensures maximum control and wrist comfort during walks."
  },
  {
    id: "dog-10",
    brand: "Kong",
    name: "Plush Dog Toy",
    category: "Toys",
    rating: 4.8,
    reviews: 156,
    availability: "In Stock",
    discount: 12,
    mrp: 1499,
    image: "/products/plush_dog_toy.png",
    description: "Soft plush exterior with a durable reinforced core. Contains an internal squeaker to encourage interactive play and fetch sessions."
  },

  // CAT PRODUCTS
  {
    id: "cat-1",
    brand: "Whiskas",
    name: "Whiskas Ocean Fish Cat Food",
    category: "Cat Food",
    rating: 4.7,
    reviews: 188,
    availability: "In Stock",
    discount: 10,
    mrp: 2500,
    image: "/products/whiskas_ocean_fish.png",
    description: "Nutritious dry cat food with real ocean fish flavor. Packed with vitamins, proteins, and minerals to maintain optimal energy levels and coat health."
  },
  {
    id: "cat-2",
    brand: "Me-O",
    name: "Me-O Cat Food",
    category: "Cat Food",
    rating: 4.5,
    reviews: 104,
    availability: "In Stock",
    discount: 8,
    mrp: 1800,
    image: "/products/me_o_cat_food.png",
    description: "Highly digestible dry formula featuring taurine to support eyesight and cardiac health. Lower sodium content helps prevent kidney issues."
  },
  {
    id: "cat-3",
    brand: "Temptations",
    name: "Temptations Cat Treats",
    category: "Treats",
    rating: 4.9,
    reviews: 320,
    availability: "In Stock",
    discount: 5,
    mrp: 220,
    image: "/products/temptations_cat_treats.png",
    description: "Irresistible cat treats with a crunchy outer shell and a soft, creamy center. Under 2 calories per treat—perfect for guilt-free rewarding."
  },
  {
    id: "cat-4",
    brand: "Intersand",
    name: "Bentonite Cat Litter",
    category: "Accessories",
    rating: 4.6,
    reviews: 89,
    availability: "In Stock",
    discount: 15,
    mrp: 1250,
    image: "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=1200&auto=format&fit=crop",
    description: "Ultra-premium bentonite clay cat litter. Forms instant hard clumps for easy scooping, trapping moisture and unpleasant odors immediately."
  },
  {
    id: "cat-5",
    brand: "Trixie",
    name: "Cat Scratching Post",
    category: "Toys",
    rating: 4.8,
    reviews: 145,
    availability: "In Stock",
    discount: 22,
    mrp: 3499,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=1200&auto=format&fit=crop",
    description: "Natural sisal scratching post with a plush platform. Protects home furniture by giving cats an appropriate surface to scratch and stretch."
  },
  {
    id: "cat-6",
    brand: "FurryTail",
    name: "Soft Cat Bed",
    category: "Beds",
    rating: 4.7,
    reviews: 112,
    availability: "In Stock",
    discount: 25,
    mrp: 2999,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&auto=format&fit=crop",
    description: "Ultra-soft plush cat bed. The self-warming fabric mimics a mother's fur, providing a calming and comfortable nesting space."
  },
  {
    id: "cat-7",
    brand: "PetSafe",
    name: "Stainless Steel Cat Bowl",
    category: "Bowls",
    rating: 4.5,
    reviews: 67,
    availability: "In Stock",
    discount: 10,
    mrp: 650,
    image: "https://images.unsplash.com/photo-1608454509000-193efc4fc2a2?w=1200&auto=format&fit=crop",
    description: "Whisker-friendly shallow ceramic feeding dish. Reduces whisker fatigue during feeding and features a stable, non-slip base."
  },
  {
    id: "cat-8",
    brand: "Furminator",
    name: "Cat Grooming Brush",
    category: "Grooming",
    rating: 4.8,
    reviews: 204,
    availability: "In Stock",
    discount: 15,
    mrp: 1899,
    image: "https://images.unsplash.com/photo-1597626118021-c522b4a529ee?w=1200&auto=format&fit=crop",
    description: "Stainless steel deshedding edge designed to reach deep undercoat without damaging top coat. Reduces loose hair shedding by up to 90%."
  },
  {
    id: "cat-9",
    brand: "Kong",
    name: "Feather Cat Toy",
    category: "Toys",
    rating: 4.6,
    reviews: 119,
    availability: "In Stock",
    discount: 12,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&auto=format&fit=crop",
    description: "Wobbling base toy featuring a spinning feather wand. Awakens the cat's natural hunting instinct, encouraging hours of healthy active play."
  },
  {
    id: "cat-10",
    brand: "Himalaya",
    name: "Cat Shampoo",
    category: "Grooming",
    rating: 4.4,
    reviews: 54,
    availability: "In Stock",
    discount: 5,
    mrp: 390,
    image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1200&auto=format&fit=crop",
    description: "Gentle soap-free cat shampoo. Specially pH balanced for sensitive feline skin, leaving the coat smelling clean and looking lustrous."
  }
];

// Cleaned up Categories List
const categories = [
  "All",
  "Dog Food",
  "Cat Food",
  "Treats",
  "Grooming",
  "Beds",
  "Toys",
  "Health & Wellness",
  "Bowls",
  "Leashes",
  "Accessories"
];

// Custom Product Image Component with Fallback Logic
const ProductImage = ({ 
  src, 
  alt, 
  category, 
  priority 
}: { 
  src: string; 
  alt: string; 
  category: string; 
  priority: boolean; 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Fallback high-resolution images
  const fallbackImages: Record<string, string> = {
    "Dog Food": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1200&auto=format&fit=crop",
    "Cat Food": "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=1200&auto=format&fit=crop",
    "Treats": "https://images.unsplash.com/photo-1582791697427-2a784e95e0e6?w=1200&auto=format&fit=crop",
    "Grooming": "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1200&auto=format&fit=crop",
    "Beds": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&auto=format&fit=crop",
    "Toys": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&auto=format&fit=crop",
    "Health & Wellness": "https://images.unsplash.com/photo-1582791697427-2a784e95e0e6?w=1200&auto=format&fit=crop",
    "Bowls": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&auto=format&fit=crop",
    "Leashes": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&auto=format&fit=crop",
    "Accessories": "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=1200&auto=format&fit=crop"
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackImages[category] || fallbackImages["Dog Food"]);
    }
  };

  // object-contain for packaged goods to ensure the packaging isn't cropped or clipped
  const isPackaged = 
    category === "Dog Food" || 
    category === "Cat Food" || 
    category === "Treats" || 
    category === "Grooming" || 
    category === "Accessories" ||
    category === "Bowls" ||
    category === "Leashes";

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={1200}
      height={1200}
      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
        isPackaged ? "object-contain p-6" : "object-cover"
      }`}
      onError={handleImageError}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjwvc3ZnPg=="
    />
  );
};

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Filter products based on Category and Search Query
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        (selectedCategory === "Accessories" && product.category === "Accessories");

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Wishlist toggle handler
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.availability === "Out of Stock") return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const nextQty = item.quantity + amount;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Cart calculations
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => {
    const sellingPrice = Math.round(item.product.mrp * (1 - item.product.discount / 100));
    return sum + sellingPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF2] dark:bg-[#0B1120] transition-colors duration-500 relative pb-24">
      
      {/* Vibrant Yellow Header Banner with Floating Line Art Icons */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#FACC15] via-[#FACC15] to-[#EAB308] z-0 overflow-hidden" 
        aria-hidden="true"
      >
        {/* Floating Line Art Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.09] text-slate-950">
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [15, 25, 15] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-[8%]"
          >
            <Scissors className="h-16 w-16" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [-30, -20, -30] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 right-[10%]"
          >
            <Bone className="h-20 w-20" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.15, 1] }} 
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[45%]"
          >
            <Sparkles className="h-12 w-12" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [-15, -5, -15] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-16 left-[22%]"
          >
            <Heart className="h-14 w-14" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 12, 0], rotate: [45, 35, 45] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-16 right-[30%]"
          >
            <Bone className="h-14 w-14" />
          </motion.div>
        </div>
        
        {/* Smooth transition fade into body bg */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FFFDF2] dark:from-[#0B1120] to-transparent transition-colors duration-500" />
      </div>

      {/* Premium Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        
        {/* Back Link & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-3 text-slate-950 dark:text-white">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-900/80 hover:text-black dark:text-slate-300 dark:hover:text-yellow-400 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-955 dark:text-white tracking-tight leading-none">
              SST Pet Supplies Store
            </h1>
            <p className="text-slate-905 dark:text-slate-300 text-sm max-w-xl font-medium">
              Curated collection of premium veterinary-approved foods, treats, grooming essentials, and beds for your dogs and cats.
            </p>
          </div>

          {/* Search bar & Cart Trigger */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search premium pet products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 focus:border-black dark:focus:border-yellow-450 rounded-full pl-11 pr-5 py-3 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-yellow-450/10 transition-all duration-300 shadow-sm"
              />
              <Search className="h-4.5 w-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-black dark:hover:bg-yellow-400 hover:border-black dark:hover:border-yellow-450 hover:text-yellow-400 dark:hover:text-black transition-all duration-300 shadow-sm cursor-pointer shrink-0"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartTotalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-black text-yellow-400 text-[10px] font-black h-5.5 w-5.5 rounded-full flex items-center justify-center border border-white shadow-md"
                >
                  {cartTotalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pill Filters with Smooth Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border shrink-0 ${
                  isSelected
                    ? "bg-black border-black text-yellow-400 dark:bg-yellow-400 dark:border-yellow-400 dark:text-black shadow-md scale-105"
                    : "bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-white hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((prod, idx) => {
              const sellingPrice = Math.round(prod.mrp * (1 - prod.discount / 100));
              const isInWishlist = wishlist.includes(prod.id);
              const isOutOfStock = prod.availability === "Out of Stock";

              return (
                <motion.article
                  key={prod.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-white dark:bg-[#111827] border border-slate-100 dark:border-white/8 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/40 hover:border-yellow-400/50 dark:hover:border-yellow-400/60 flex flex-col justify-between transition-all duration-300 h-[520px]"
                >
                  {/* Top Overlays */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                    {/* Discount Badge */}
                    {prod.discount > 0 ? (
                      <span className="bg-black text-yellow-400 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                        {prod.discount}% OFF
                      </span>
                    ) : (
                      <span />
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`pointer-events-auto h-9.5 w-9.5 rounded-full flex items-center justify-center border transition-all ${
                        isInWishlist
                          ? "bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-500 shadow-sm"
                          : "bg-white/90 dark:bg-slate-900/90 border-slate-200/60 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      }`}
                    >
                      <motion.div
                        animate={isInWishlist ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart className={`h-4.5 w-4.5 ${isInWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                      </motion.div>
                    </button>
                  </div>

                  {/* Product Image Wrapper - Occupies ~70% of Card height (360px out of 520px) */}
                  <div className="h-[360px] w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 relative rounded-t-[24px] flex items-center justify-center">
                    <ProductImage
                      src={prod.image}
                      alt={prod.name}
                      category={prod.category}
                      priority={idx < 4}
                    />
                    
                    {/* Quick View Hover overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setActiveQuickView(prod)}
                        className="px-4.5 py-2.5 bg-white text-black font-semibold text-xs rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-50 transition-all scale-95 group-hover:scale-100 duration-300"
                      >
                        <Eye className="h-4.5 w-4.5" />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-[#111827] rounded-b-[24px]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                        <span>{prod.brand}</span>
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded-full font-medium">
                          {prod.category}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 h-8 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {prod.name}
                      </h3>
                      
                      {/* Rating details */}
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300">{prod.rating}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500">({prod.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Price and Add-To-Cart Buttons */}
                    <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/6 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">₹{sellingPrice}</span>
                        {prod.discount > 0 && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-550 line-through">₹{prod.mrp}</span>
                        )}
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => addToCart(prod)}
                          disabled={isOutOfStock}
                          className="w-full py-2 px-2.5 rounded-lg font-semibold text-[10px] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-white hover:text-black dark:hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            if (isOutOfStock) return;
                            addToCart(prod);
                            setIsCartOpen(true);
                          }}
                          disabled={isOutOfStock}
                          className="w-full py-2 px-2.5 rounded-lg font-bold text-[10px] text-yellow-400 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 hover:from-slate-800 hover:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 border border-slate-100 rounded-[24px] max-w-md mx-auto shadow-sm backdrop-blur-sm mt-8"
          >
            <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No premium products found</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try matching another keyword or filter by category.</p>
          </motion.div>
        )}
      </div>

      {/* QUICK VIEW MODAL (Glassmorphic) */}
      <AnimatePresence>
        {activeQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#111827] border border-slate-100 dark:border-white/8 rounded-[32px] overflow-hidden shadow-2xl max-w-2xl w-full relative z-10 p-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveQuickView(null)}
                className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
                {/* Image panel */}
                <div className="h-64 md:h-full w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/40 relative min-h-[250px] flex items-center justify-center">
                  <ProductImage
                    src={activeQuickView.image}
                    alt={activeQuickView.name}
                    category={activeQuickView.category}
                    priority={true}
                  />
                </div>

                {/* Details info */}
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-sans tracking-wider uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
                      {activeQuickView.brand}
                    </span>
                    <h2 className="font-extrabold text-xl text-slate-900 dark:text-white leading-snug">{activeQuickView.name}</h2>
                    
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-400">
                        <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{activeQuickView.rating}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">({activeQuickView.reviews} reviews)</span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{activeQuickView.description}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        ₹{Math.round(activeQuickView.mrp * (1 - activeQuickView.discount / 100))}
                      </span>
                      {activeQuickView.discount > 0 && (
                        <>
                          <span className="text-sm text-slate-400 line-through">₹{activeQuickView.mrp}</span>
                          <span className="text-xs text-emerald-600 font-bold">Save {activeQuickView.discount}%!</span>
                        </>
                      )}
                    </div>

                    {/* Modal actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          addToCart(activeQuickView);
                          setActiveQuickView(null);
                        }}
                        disabled={activeQuickView.availability === "Out of Stock"}
                        className="w-full py-3.5 rounded-2xl font-bold text-xs bg-slate-955 dark:bg-yellow-400 text-yellow-400 dark:text-black shadow hover:bg-slate-800 dark:hover:bg-yellow-350 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          if (activeQuickView.availability === "Out of Stock") return;
                          addToCart(activeQuickView);
                          setActiveQuickView(null);
                          setIsCartOpen(true);
                        }}
                        disabled={activeQuickView.availability === "Out of Stock"}
                        className="w-full py-3.5 rounded-2xl font-bold text-xs border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART DRAWER PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full max-w-md bg-white dark:bg-[#111827] h-full relative z-10 flex flex-col justify-between shadow-2xl border-l border-slate-100 dark:border-white/8"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 dark:border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-slate-900 dark:text-white" />
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">Shopping Bag</h2>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {cartTotalItems} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="h-8.5 w-8.5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <ShoppingCart className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Your cart is empty</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-550">Add premium supplies or treats from the store.</p>
                  </div>
                ) : (
                  cart.map((item) => {
                    const price = Math.round(item.product.mrp * (1 - item.product.discount / 100));
                    return (
                      <div key={item.product.id} className="flex gap-4 p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100/50 dark:border-white/6 items-center">
                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 shrink-0 relative flex items-center justify-center">
                          <ProductImage
                            src={item.product.image}
                            alt={item.product.name}
                            category={item.product.category}
                            priority={false}
                          />
                        </div>

                        {/* Title, price & controls */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{item.product.name}</h4>
                          <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{item.product.brand}</span>
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">₹{price * item.quantity}</span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 bg-white dark:bg-slate-850 border border-slate-200 dark:border-white/10 rounded-lg p-1.5 shadow-sm">
                              <button onClick={() => updateQuantity(item.product.id, -1)} className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, 1)} className="text-slate-400 hover:text-slate-900 p-0.5 cursor-pointer">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Checkout Block */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 dark:border-white/8 bg-white dark:bg-[#111827] space-y-4">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-slate-400 dark:text-slate-450">Cart Subtotal</span>
                    <span className="text-slate-900 dark:text-white text-base font-extrabold">₹{cartTotalPrice}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCart([]);
                      setIsCartOpen(false);
                      setOrderPlaced(true);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 hover:from-slate-800 hover:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 text-yellow-400 font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    Checkout Order
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ORDER PLACED CONFIRMATION */}
      <AnimatePresence>
        {orderPlaced && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white dark:bg-[#111827] border border-slate-100 dark:border-white/8 rounded-[32px] p-8 max-w-sm text-center relative z-10 space-y-5 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto shadow-xl shadow-emerald-100/50">
                <Check className="h-8 w-8 text-emerald-500 stroke-[3.5px]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">Order Confirmed!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Thank you! Your pet supplies order has been verified and registered. Our delivery team in Coimbatore will dispatch your goods shortly.
                </p>
              </div>

              <button
                onClick={() => setOrderPlaced(false)}
                className="w-full py-3.5 rounded-2xl bg-slate-950 dark:bg-slate-800 text-yellow-400 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow cursor-pointer active:scale-95"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
