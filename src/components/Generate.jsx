import React, { useState, useRef } from 'react';
import Background from "../assets/background.svg";
import { useScroll, useTransform, motion } from 'framer-motion';


export default function Generate() {
    const targetRef = useRef();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end center"]
    })

    const [randomText, setRandomText] = useState(Array.from({ length: 4 }, () => ""));
    const xl = useTransform(scrollYProgress, [0.1, 0.25, 0.45, 0.9, 1], ["60%", "30%", "15%", "0%", "-140%"]);

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

    return (
        <div
            ref={targetRef}
            id="generator" className='h-auto bg-white selection-text relative mb-28'>

            <div className='z-0 absolute '>
                <img src={Background} alt="bg1" className=' w-[100rem] ' />
            </div>

            <div className='z-10 relative top-8'>
                <div className='flex flex-col justify-center items-center gap-3 p-4'>
                    <h1 className='text-2xl md:text-4xl lg:text-6xl text-[#15532E]'>Ask your queries!!</h1>
                    <div className='w-[400px] h-[3px] bg-black'></div>
                </div>

                <motion.div
                    style={{ x }}
                    className=''>
                    {ques.map((question, index) => (
                        <div key={index} className={`${index % 2 == 1 ? "bg-[#15532E] hover:ring-green-300" : "bg-green-300 hover:ring-[#15532E]"} rounded px-10 p-6 m-3 overflow-hidden group  relative hover:bg-gradient-to-r hover:from-[#15532r] hover:to-[#15532w] text-white hover:ring-2 hover:ring-offset-2  transition-all ease-out duration-300`}>
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">
                                <div className='flex w-[98%] justify-between text-lg  text-white'>
                                    <p className='w-[85%]'>{question.Ques}</p>

                                    <button href="#_" className="hidden md:block relative md:px-4 md:py-1 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group text-md lg:text-lg" onClick={() => handleAskButtonClick(index)}>
                                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-green-600 group-hover:w-full ease"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-green-600 group-hover:w-full ease"></span>
                                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
                                        <span className={`absolute inset-0 w-full h-full duration-300 delay-300 ${index % 2 == 0 ? "bg-green-300" : "bg-[#15532E]"}  opacity-0 group-hover:opacity-100`}></span>
                                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">{question.btn}</span>
                                    </button>

                                    <button onClick={() => handleAskButtonClick(index)} className='block md:hidden'>{question.btn}</button>
                                </div>
                                {randomText[index] && <p className='w-[85%]'>{randomText[index]}</p>}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
