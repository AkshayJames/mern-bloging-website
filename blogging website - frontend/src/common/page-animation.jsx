import {AnimatePresence, motion} from "framer-motion";


const AnimationWrapper = ({children,keyvalue, initial ={ opacity:0 }, animate={opacity:1},transition={duration:1},className}) => {

    return(
        <AnimatePresence>

           <motion.div
            key={keyvalue}
            initial={initial} 
            animate={animate}
            transition={transition}
            className={className}       
            >
            {children}

           </motion.div> 
        </AnimatePresence>
        
    )
}

export default AnimationWrapper;