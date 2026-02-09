'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function FilterDropdown({ list, activeTitle, type = 'category' } : {list: any, activeTitle: string, type: string}) {
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <motion.div
        onClick={() => setOpenSelect(!openSelect)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="truncate">{activeTitle}</span>
        <motion.div
          animate={{ rotate: openSelect ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openSelect && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setOpenSelect(false)}
              className="max-h-64 overflow-y-auto p-2"
            >
              {list}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}