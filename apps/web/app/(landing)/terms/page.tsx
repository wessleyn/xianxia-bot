export const metadata = {
    title: 'Terms of Service | Xianxia Bot',
    description: 'Terms of Service for the Xianxia Bot application',
};

const termsContent = [
    {
        title: "1. Acceptance of Terms",
        content: "By accessing or using the Xianxia Bot service (\"Service\"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access or use the Service."
    },
    {
        title: "2. Description of Service",
        content: "Xianxia Bot provides tools for accessing and reading xianxia novels from various sources. The Service may include browser extensions, web applications, and mobile apps."
    },
    {
        title: "3. User Accounts",
        content: "Some features of the Service may require you to register for an account. You are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under your account."
    },
    {
        title: "4. User Content",
        content: "Our Service allows you to post, link, store, share, and otherwise make available certain information, text, or other material. You are responsible for the content that you post to the Service."
    },
    {
        title: "5. Intellectual Property",
        content: "The Service and its original content, features, and functionality are and will remain the exclusive property of Xianxia Bot and its licensors. The Service is protected by copyright, trademark, and other laws."
    },
    {
        title: "6. Termination",
        content: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever."
    },
    {
        title: "7. Limitation of Liability",
        content: "In no event shall Xianxia Bot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
        title: "8. Changes to Terms",
        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect."
    },
    {
        title: "9. Contact Us",
        content: "If you have any questions about these Terms, please contact us at terms@xianxia-bot.com."
    }
];

const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Terms of Service</h1>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                    Last updated: June 3, 2025
                </p>

                {termsContent.map((section, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">{section.title}</h2>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsPage;