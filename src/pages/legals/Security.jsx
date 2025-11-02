import React from 'react';

const Security = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0" style={{background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",}}/>
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-white">
                <h1 className="text-5xl justify-self-center mt-20 overflow-hidden font-bold mb-6">Security Policy</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                    <p className="mb-2">
                        We don't collect any personal data from our users. All interactions with our services are anonymous, 
                        and we do not store any user-specific information. So, your privacy is inherently protected.
                    </p>
                    <p>
                        Regular security audits and vulnerability assessments are conducted to ensure our systems remain secure against emerging threats.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                    <p className="mb-2">
                        While we strive to maintain a secure environment, users also play a crucial role in safeguarding their own 
                        information. We recommend the following best practices:
                    </p>
                    <p>
                        - Use strong, unique passwords for any accounts associated with our services.<br/>
                        - Be cautious of phishing attempts and avoid clicking on suspicious links.<br/>
                        - Regularly update your software and devices to protect against vulnerabilities.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
                    <p className="mb-2">
                        In the event of a security breach, we have established protocols to respond swiftly and effectively. 
                        This includes notifying affected users, investigating the incident, and implementing measures to prevent 
                        future occurrences. (For other services, since we do not collect personal data in this site, so the risk is minimized.)
                    </p>
                    <p>
                        We encourage users to report any suspicious activity or security concerns to our support team immediately.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Security;