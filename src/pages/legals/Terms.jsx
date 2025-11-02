import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0" style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",}}/>
            <div className="relative z-10 max-w-4xl mx-auto p-6 mt-24 text-gray-200">
                <h1 className="text-5xl justify-self-center font-bold overflow-hidden mb-6">Terms and Conditions</h1>
                <p className="mb-4">
                    Welcome to our website. By accessing or using our site, you agree to comply with and be bound by the following terms 
                    and conditions. Please read them carefully.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By using our website, you agree to these terms and conditions. If you do not agree, please do not use our site.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Website</h2>
                <p className="mb-4">
                    You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others 
                    or restrict their use and enjoyment of the site. You must not use the site to transmit any harmful or illegal content.
                    You are responsible for maintaining the confidentiality of any account information and for all activities that occur 
                    under your account. Because of theres no data collection, there is no account creation on this website. So, you don't 
                    have to worry about it.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
                <p className="mb-4">
                    All content on this website, including text, graphics, logos, and images, is the property of the website owner and is 
                    protected by intellectual property laws. You may not use any content without our prior written permission. But you are
                    free to use the tools and calculators provided on this website for personal use.
                </p>
                <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                <p className="mb-4">
                    We are not liable for any damages arising from the use or inability to use this website, including but not limited to 
                    direct, indirect, incidental, punitive, and consequential damages. It may errors in some calculations or data provided by 
                    the tools on this website make sure to double-check the results before relying on them for important decisions.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Changes to Terms</h2>
                <p className="mb-4">
                    We reserve the right to modify these terms and conditions at any time. Your continued use of the website after any 
                    changes indicates your acceptance of the new terms. YOu are advised to review this page periodically for any updates.
                </p>
                <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                <p className="mb-4">
                    These terms and conditions are governed by and construed in accordance with the laws of Bangladesh, and you agree 
                    to submit to the exclusive jurisdiction of the courts in that location.
                </p>
                <p className="mb-4 mt-8">
                    If you have any questions about these terms and conditions, please contact us at <a href="mailto:alrifatsabbir@gmail.com" className="text-blue-400 underline ml-1">
                        alrifatsabbir@gmail.com 
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default Terms;