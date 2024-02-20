import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Navbar from './Navbar';
import LandingImg from "../assets/landing.png";

export default function Landing() {
    const targetRef = useRef();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const handleUploadClick = () => {
        const uploadSection = document.getElementById('upload');
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            ref={targetRef} className='h-[695px]'>
            <Navbar />

            <motion.div
                style={{ scale, opacity }}
                className='p-2 md:p-10 lg:p-0 md:ml-10 lg:w-[40%] fixed top-[15%] lg:top-[28%] left-[5%] gap-8 flex flex-col items-center lg:items-start'>

                <div className='flex flex-col gap-7 justify-center items-center '>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'>Apna-Bot</h1>
                </div>

                <p className='tracking-wider text-lg font-semibold text-white text-center lg:text-left'>Apna-Bot is a versatile chatbot designed to assist users with a wide range of tasks, offering personalized recommendations, answering queries, and facilitating interactions in various domains, including customer service, education, and entertainment.</p>

                <button onClick={handleUploadClick} className='bg-white w-[300px] md:w-[360px] p-3 text-green-800 hover:shadow-sm hover:shadow-gray-300 rounded-lg z-40 mr-3 mt-6 font-medium text-lg text-center'>UPLOAD PDF</button>

                <img src={LandingImg} alt="" className='hidden lg:block relative right-[-40rem] top-[-25rem]' />
            </motion.div>
        </motion.section>
    );
}
