import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
}

const variants = {
    hidden: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
}

const Motion: React.FC<LayoutProps> = ({ children }) => {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'tween', duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default Motion;
