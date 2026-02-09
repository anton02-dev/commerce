'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { Car, ChevronLeft, ChevronRight, CookingPot, Dumbbell, Flower2, Home, Menu, Shirt } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'Casa & Decorațiuni', icon: Home, subcategories: ['Mobilier', 'Articole de Bucătărie', 'Iluminat', 'Textile'] },
  { name: 'Electrocasnice', icon: CookingPot, subcategories: ['Frigidere', 'Mașini de Spălat', 'Cuptoare', 'Aparate Mici'] },
  { name: 'Grădină & Animale', icon: Flower2, subcategories: ['Unelte de Grădinărit', 'Mobilier de Exterior', 'Hrană Animale', 'Accesorii Animale'] },
  { name: 'Sport', icon: Dumbbell, subcategories: ['Echipament Fitness', 'Sporturi în Aer Liber', 'Îmbrăcăminte Sport', 'Suplimente'] },
  { name: 'Auto', icon: Car, subcategories: ['Piese Auto', 'Anvelope', 'Accesorii', 'Întreținere Auto'] },
  { name: 'Modă', icon: Shirt, subcategories: ['Îmbrăcăminte Bărbați', 'Îmbrăcăminte Femei', 'Încălțăminte', 'Bijuterii'] },
];

interface CategoryMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CategoryMenu = ({ isOpen, setIsOpen }: CategoryMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const menuVariants = {
    closed: { width: '100%', transition: { duration: 0.3 } },
    open: { width: '100%', transition: { duration: 0.3 } },
  };

  const megaMenuVariants = {
    closed: { opacity: 0, x: -20, display: 'none' as const, transition: { duration: 0.2 } },
    open: { opacity: 1, x: 0, display: 'block' as const, transition: { duration: 0.3, delay: 0.1 } },
  };

  const getSubMenuContent = () => {
    const category = categories.find(c => c.name === activeCategory);
    if (!category) return null;

    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Subcategorii {category.name}</h3>
        <div className="grid grid-cols-2 gap-4">
          {category.subcategories.map((sub, i) => (
            <a key={i} href={`/search/${sub}`} className="text-gray-600 hover:text-red-600 transition-colors">
              {sub}
            </a>
          ))}
        </div>
     
      </div>
    );
  };

 return (
    <div
      className="relative h-full z-1"
      onMouseLeave={() => { setIsOpen(false); setActiveCategory(null); }}
    >
      <motion.div
        className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col z-1 relative"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{ width: '280px' }}
        onMouseEnter={() => setIsOpen(true)}
      >
        <div className="flex items-center p-4 text-lg font-bold text-white bg-red-600">
          <Menu className="w-5 h-5 mr-3" />
          Categorii
        </div>
        <nav className="flex-grow overflow-y-auto">
          {categories.map((category) => (
            <p
              key={category.name}
              className={`flex items-center p-4 transition-colors ${activeCategory === category.name ? 'bg-red-50 text-red-600 border-l-4 border-red-600' : 'text-gray-700 hover:bg-gray-50'}`}
              onMouseEnter={() => setActiveCategory(category.name)}
            >
              <category.icon className="w-5 h-5 mr-3" />
              {category.name}
            </p>
          ))}
        </nav>
      </motion.div>

      {/* Suprapunere Mega Meniu */}
      <AnimatePresence>
        {isOpen && activeCategory && (
          <motion.div
            key="mega-menu"
            className="absolute top-0 left-[280px] h-full w-[600px] bg-white rounded-r-xl shadow-2xl z-20 border-l border-gray-100"
            variants={megaMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseEnter={() => setIsOpen(true)}
          >
            {getSubMenuContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Componentă HeroSection Modificată ---
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      alt: 'Grătar de cărămidă în aer liber cu structură din grinzi de lemn'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
      alt: 'Spațiu de locuit modern în aer liber'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
      alt: 'Aranjament frumos în curtea din spate'
    }
  ];

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8
    })
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    
    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.5 }
    },
    hover: {
      scale: 1.1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const dotVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.4
      }
    }),
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mt-10 px-4 py-4 md:px-8 lg:px-12 flex gap-4"
    >

      {/* Slider Carusel */}
      <motion.div
        className="flex-1 relative h-full overflow-hidden rounded-xl shadow-2xl"
        style={{
          transition: 'margin-left 0.3s'
        }}
      >
        {/* Diapozitive */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <motion.img
                  src={slides[currentSlide]?.image}
                  alt={slides[currentSlide]?.alt}
                  className="w-full h-full object-cover"
                  initial={{ filter: 'blur(10px)' }}
                  animate={{ filter: 'blur(0px)' }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient de suprapunere */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute inset-0 bg-black/30"
                />
                
                {/* Text Erou */}
                <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-shadow-lg">
                        Colecția <br /> Spațiu Exterior
                    </h1>
                    <p className="text-lg md:text-xl max-w-lg mb-6">
                        Explorează designuri uimitoare pentru oaza ta perfectă din curtea din spate.
                    </p>
                    <motion.a
                        href='/search'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-colors"
                    >
                        Cumpără Acum
                    </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Săgeți de Navigare (Vizibile doar pe desktop) */}
        <motion.button
          onClick={prevSlide}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full backdrop-blur-md bg-black/10 hover:bg-black/30 border border-white/20 shadow-lg z-10 transition-colors"
          aria-label="Diapozitivul anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full backdrop-blur-md bg-black/10 hover:bg-black/30 border border-white/20 shadow-lg z-10 transition-colors"
          aria-label="Diapozitivul următor"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Puncte de Navigare */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              custom={index}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => goToSlide(index)}
              className="relative"
              aria-label={`Mergi la diapozitivul ${index + 1}`}
            >
              <motion.div
                animate={{
                  width: index === currentSlide ? 32 : 12,
                  backgroundColor: index === currentSlide ? '#dc2626' : 'rgba(255, 255, 255, 0.5)'
                }}
                transition={{ duration: 0.3 }}
                className="h-3 rounded-full shadow-lg"
              />
              {index === currentSlide && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-red-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Contor Diapozitive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md bg-black/10 border border-white/20 text-white font-medium shadow-lg z-10"
        >
          <motion.span
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentSlide + 1} / {slides.length}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}