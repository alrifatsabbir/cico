import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0"style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",}}/>
            <div className="relative z-10 max-w-4xl mx-auto p-6 text-white">
                <h1 className="text-5xl mt-24 justify-self-center overflow-y-hidden font-bold mb-6">Privacy Policy</h1>
                <p className="mb-4">
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal 
                    information when you use our website. Please read this carefully to understand our policies and practices regarding your
                    information.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
                <p className="mb-4">
                    This website does not collect any personal information such as names, email addresses or other details. We may collect 
                    some of your information to calculate for temporary purposes only, but we do not store any of this information. Others than
                    this we do not collect any personal data from our users neither directly nor indirectly.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
                <p className="mb-4">
                    Since we do not collect any personal information, we do not use your information for any purposes. Any temporary data 
                    collected for calculation purposes is not stored or used beyond the immediate session. Neither we take any personal data from 
                    you nor we collect any cookies.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
                <p className="mb-4">
                    We take the security of your information seriously. Since we do not collect or store any personal data, there is no risk
                    of data breaches or unauthorized access to your personal information.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                    You are advised to review this policy periodically for any changes. Changes to this policy are effective when they are posted
                    on this page. Also, you can check our blogs for updates.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or concerns about this Privacy Policy, please contact us at
                    <a href="mailto:alrifatsabbir@gmail.com" className="text-blue-400 underline ml-1">
                        alrifatsabbir@gmail.com 
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Privacy;