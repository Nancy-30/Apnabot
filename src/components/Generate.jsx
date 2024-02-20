import React, { useState, useRef, useEffect } from 'react';
import Background from "../assets/background.svg";
import { useScroll } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';

export default function Generate() {
    const controls = useAnimation();
    const targetRef = useRef();
    const { scrollYProgress } = useScroll({ target: targetRef });
    const [randomText, setRandomText] = useState(Array.from({ length: 4 }, () => ""));

    const ques = [
        {
            "Ques": "Q. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsum sunt ?",
            "btn": "Ask"
        },
        {
            "Ques": "Q. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsum sunt ?",
            "btn": "Ask"
        },
        {
            "Ques": "Q. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsum sunt ?",
            "btn": "Ask"
        },
        {
            "Ques": "Q. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsum sunt ?",
            "btn": "Ask"
        },
        {
            "Ques": "Q. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsum sunt ?",
            "btn": "Ask"
        },
    ];

    useEffect(() => {
        const animateDivs = async () => {
            await controls.start('visible');
        };
        animateDivs();
    }, [controls]);

    const generateRandomText = () => {
        const techWords = [
            'algorithm', 'API', 'authentication', 'backend', 'cloud computing',
            'cybersecurity', 'data structure', 'encryption', 'frontend', 'machine learning',
            'networking', 'programming', 'server', 'software development', 'version control'
        ];
        let randomSentence = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * techWords.length);
            randomSentence += techWords[randomIndex] + ' ';
        }
        return randomSentence.trim();
    };

    const handleAskButtonClick = (index) => {
        const randomSentence = generateRandomText();
        const newTextArray = [...randomText];
        newTextArray[index] = randomSentence;
        setRandomText(newTextArray);
    };

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div ref={targetRef} id="generator" className='h-auto bg-white selection-text relative mb-28'>
            <div className='z-0 absolute '>
                <img src={Background} alt="bg1" className=' w-[100rem] ' />
            </div>

            <div className='z-10 relative top-8'>
                <div className='flex flex-col justify-center items-center gap-3 p-4'>
                    <h1 className='text-2xl md:text-4xl lg:text-6xl text-[#15532E]'>Ask your queries!!</h1>
                    <div className='w-[400px] h-[3px] bg-black'></div>
                </div>

                <div>
                    {ques.map((question, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={variants}
                            initial="hidden"
                            animate={controls}
                            transition={{ delay: index * 0.2 }}
                            className={`${index % 2 == 1 ? "bg-[#15532E] hover:ring-green-300" : "bg-green-300 hover:ring-[#15532E]"} rounded px-10 p-6 m-3 overflow-hidden group  relative hover:bg-gradient-to-r hover:from-[#15532r] hover:to-[#15532w] text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}>
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">
                                <div className='flex w-[98%] justify-between text-lg  text-white'>
                                    <p className='w-[85%]'>{question.Ques}</p>
                                    <button onClick={() => handleAskButtonClick(index)} className=''>{question.btn}</button>
                                </div>
                                {randomText[index] && <p className='w-[85%]'>{randomText[index]}</p>}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
