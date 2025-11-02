import React from 'react';

const Licenses = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0" style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000",}}/>
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-white">
                <h1 className="text-5xl justify-self-center mt-20 overflow-hidden font-bold mb-6">Open Source Licenses</h1>
                <div className="bg-opacity-75 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Libraries and Licenses</h2>
                    <ul className="list-disc list-inside space-y-4">
                        <li>
                            <strong>React</strong> - MIT License<br/>
                            <a href="https://github.com/facebook/react/blob/main/LICENSE" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/facebook/react/blob/main/LICENSE</a>
                        </li>
                        <li>
                            <strong>Tailwind CSS</strong> - MIT License<br/>
                            <a href="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE</a>
                        </li>
                        <li>
                            <strong>Express.js</strong> - MIT License<br/>
                            <a href="https://github.com/expressjs/express/blob/master/LICENSE" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/expressjs/express/blob/master/LICENSE</a>
                        </li>
                        <li>
                            <strong>GSAP</strong> - Standard License<br/>
                            <a href="https://greensock.com/standard-license/" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://greensock.com/standard-license/</a>
                        </li>
                        <li>
                            <strong>Framer Motion</strong> - MIT License<br/>
                            <a href="https://github.com/framer/motion/blob/main/LICENSE.md" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/framer/motion/blob/main/LICENSE.md</a>
                        </li>
                        <li>
                            <strong>shadcn/ui</strong> - MIT License<br/>
                            <a href="https://github.com/shadcn/ui/blob/main/LICENSE.md" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/shadcn/ui/blob/main/LICENSE.md</a>
                        </li>
                        <li>
                            <strong>React Router</strong> - MIT License<br/>
                            <a href="https://github.com/remix-run/react-router/blob/main/LICENSE.md" className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer">https://github.com/remix-run/react-router/blob/main/LICENSE.md</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Licenses;