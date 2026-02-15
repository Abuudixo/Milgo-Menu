import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Star, Flame, Coffee } from 'lucide-react';

const TagIcon = ({ type }) => {
  switch (type) {
    case 'vegan': return <Leaf className="w-3.5 h-3.5 text-green-500" />;
    case 'popular': return <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />;
    case 'spicy': return <Flame className="w-3.5 h-3.5 text-orange-500" />;
    case 'chef': return <Coffee className="w-3.5 h-3.5 text-blue-400" />;
    default: return null;
  }
};

const CafeNoir = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]);

  const filteredSections = data.sections.filter(section => section.category === activeCategory);

  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col md:flex-row selection:bg-yellow-400 selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 fixed md:fixed top-0 left-0 right-0 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/10 p-4 md:p-8 flex flex-col md:flex-col justify-start md:justify-between items-stretch bg-black z-50 backdrop-blur-md md:backdrop-blur-none bg-black/80 md:bg-black">
        <div>
          <div className="mb-4 md:mb-12 flex items-center justify-center md:justify-between w-full">
            <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-yellow-400 text-black font-black italic text-xl md:text-3xl rounded-md tracking-tighter">
              {data.brand}
            </div>
          </div>

          <nav className="hidden md:block space-y-6">
            {data.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-3 flex-shrink-0 group transition-all w-full text-left"
              >
                <div className={`w-1 h-6 rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-yellow-400 scale-y-100' : 'bg-transparent scale-y-0'}`}></div>
                <span className={`font-black text-sm uppercase tracking-widest transition-colors duration-300 ${activeCategory === cat ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                  {cat}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Nav Scroll Container */}
        <div className="md:hidden w-full overflow-x-auto scrollbar-hide text-center">
          <nav className="flex items-center justify-center gap-6 min-w-full">
            {data.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 flex-shrink-0 group transition-all relative py-2"
              >
                <span className={`font-black text-xs uppercase tracking-widest transition-colors duration-300 ${activeCategory === cat ? 'text-white' : 'text-white/40'}`}>
                  {cat}
                </span>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-yellow-400 opacity-100' : 'bg-transparent opacity-0'}`}></div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-32 md:pt-12 p-8 md:p-12 lg:p-16 xl:p-24 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {filteredSections.map((section, sIdx) => (
              <section key={section.title} className="mb-24 md:mb-32 lg:mb-40 last:mb-0">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
                  <div className="flex-1">
                    <motion.h2
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-yellow-400 uppercase leading-none mb-4 tracking-tighter"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      {section.title}
                    </motion.h2>
                    {section.subtitle && (
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-white/40 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-white/20"></span>
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  <motion.div
                    className="w-full lg:w-72 xl:w-80 h-48 lg:h-56 rounded-2xl overflow-hidden shadow-2xl filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ring-1 ring-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <img src={section.image} alt={section.title} className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-10 md:gap-y-12 lg:gap-y-14">
                  {section.items.map((item, iIdx) => (
                    <motion.div
                      key={item.name}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: iIdx * 0.05, duration: 0.5 }}
                    >
                      <div className="flex justify-between items-start mb-2 lg:mb-3">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <h3 className="text-base sm:text-lg lg:text-lg xl:text-xl font-black uppercase tracking-tight group-hover:text-yellow-400 transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.tag && <TagIcon type={item.tag} />}
                        </div>
                        <span className="font-black text-yellow-400 text-base lg:text-lg tabular-nums">
                          {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-white/40 leading-relaxed max-w-sm lg:max-w-md group-hover:text-white/60 transition-colors duration-300">
                        {item.description}
                      </p>
                      <div className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-[2px] bg-yellow-400/0 group-hover:bg-yellow-400/100 transition-all duration-500 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div >
  );
};

export default CafeNoir;
