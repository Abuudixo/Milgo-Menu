import React from 'react';
import CafeNoir from './components/CafeNoir';
import { CAFE_NOIR_MENU } from './data';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    return (
        <div className="relative min-h-screen bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CafeNoir data={CAFE_NOIR_MENU} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default App;
