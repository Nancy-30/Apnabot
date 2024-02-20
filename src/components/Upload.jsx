import React, { useRef, useState } from 'react'
import { MdUploadFile } from "react-icons/md";
import { useScroll, useTransform, motion } from 'framer-motion';
import Loader from './Loader.jsx';
import Generate from './Generate.jsx';

export default function Upload() {
    const targetRef = useRef();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end center"]
    })

    const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1])
    const x = useTransform(scrollYProgress, [0.1, 0.25, 0.45, 0.9, 1], ["60%", "30%", "15%", "0%", "-140%"]);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showBtn, showGeneratedBtn] = useState(false);

    const handleChange = async (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['application/pdf'];
        const maxSize = 20 * 1024 * 1024; // 20MB

        if (selectedFile) {
            if (allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
                setIsLoading(true);
                setFile(selectedFile);
                setError(null);
                await handleUpload(selectedFile);
                setIsLoading(false);
            } else {
                setFile(null);
                setError('Please select a PDF file less than or equal to 20MB.');
            }
        } else {
            setFile(null);
            setError('Please select a file.');
        }
    };

    const handleUpload = async (selectedFile) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (selectedFile) {
            showGeneratedBtn(true);

        } else {
            alert('Please select a file.');
        }
    };

    return (
        <div
            ref={targetRef}
            id="upload"
            className='relative w-full' >
            <div className='flex justify-center items-center p-6 lg:p-14 overflow-x-hidden h-[450px] md:h-[500px] lg:h-[770px] '>
                <div className='bg-[#CEDCC8]  h-[780px] w-full absolute top-[-10px]'>
                </div>
                <div className='bg-white h-[650px] w-[94rem] absolute rounded-full top-[60px] border-2 border-[#15532E]'>
                </div>
                {!isLoading &&
                    <motion.form
                        style={{ x, scale }}
                        className='flex flex-col items-center bg-white h-[350px] w-[95%] lg:w-[85%] rounded-xl border-4 border-dotted border-[#15532E] justify-center z-[51]'>
                        <MdUploadFile className='text-5xl text-green-900 m-3' />
                        <div className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-[#15532E] border-2 border-[#15532E] rounded-full hover:text-white group hover:bg-gray-50">
                            <span className="absolute left-0 block w-full h-0 transition-all bg-[#15532E] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <label htmlFor="file-upload" className="h-full w-full relative cursor-pointer">
                                Upload a PDF
                                <input
                                    id="file-upload"
                                    type='file'
                                    className='hidden'
                                    name='uploadedFile'
                                    onChange={handleChange}
                                    accept=".pdf"
                                />
                            </label>
                        </div>

                        {error && <div className='text-red-500'>{error}</div>}
                    </motion.form>
                }
                {isLoading && <div className='text-blue-500'><Loader /></div>}
            </div>

            {
                showBtn && <Generate />
            }

        </div>
    );
}
