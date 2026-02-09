'use client'
import { motion, Variants } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: "https://c.animaapp.com/mgz4nyqoKSQohI/img/image-9.png",
      title: "Reduceri de pana la 15%",
      description: "Orice metoda de plata",
    },
    {
      icon: "https://c.animaapp.com/mgz4nyqoKSQohI/img/image-8.png",
      title: "Durabilitate",
      description: "Calitate superioara",
    },
    {
      icon: "https://c.animaapp.com/mgz4nyqoKSQohI/img/image-10.png",
      title: "Transport",
      description: "Transport in toata tara",
    },
  ];
  
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  return(
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-40">
      <div className="container mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="transition-transform"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 h-full">
                <div className="p-4 sm:p-5 md:p-6 flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#fcefdf] rounded-full flex items-center justify-center shadow-sm">
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-cover"
                      alt={feature.title}
                      src={feature.icon}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-0.5 sm:gap-1 min-w-0">
                    <h3 className="font-bold text-black text-sm sm:text-base md:text-lg leading-tight">
                      {feature.title}
                    </h3>
                    <p className="font-medium text-gray-600 text-xs sm:text-sm md:text-base leading-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}