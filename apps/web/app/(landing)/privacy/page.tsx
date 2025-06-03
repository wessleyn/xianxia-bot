export const metadata = {
    title: 'Privacy Policy | Xianxia Bot',
    description: 'Privacy policy for the Xianxia Bot application',
};

const privacyContent = [
    {
        title: "Introduction",
        content: "We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our extension and tell you about your privacy rights."
    },
    {
        title: "The Data We Collect",
        content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
        list: [
            "<strong>Identity Data</strong> includes username, email address.",
            "<strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform.",
            "<strong>Usage Data</strong> includes information about how you use our website and extension."
        ]
    },
    {
        title: "How We Use Your Data",
        content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
        list: [
            "To provide and improve our services to you.",
            "To manage your relationship with us.",
            "To personalize your experience."
        ]
    },
    {
        title: "Data Security",
        content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees and third parties who have a business need to know."
    },
    {
        title: "Your Legal Rights",
        content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:",
        list: [
            "Request access to your personal data.",
            "Request correction of your personal data.",
            "Request erasure of your personal data.",
            "Object to processing of your personal data.",
            "Request restriction of processing your personal data.",
            "Request transfer of your personal data.",
            "Right to withdraw consent."
        ]
    },
    {
        title: "Contact Us",
        content: "If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@xianxia-bot.com."
    }
];

const PrivacyPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                    Last updated: June 3, 2025
                </p>

                {privacyContent.map((section, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">{section.title}</h2>
                        <p>{section.content}</p>

                        {section.list && (
                            <ul className="list-disc pl-5 my-4">
                                {section.list.map((item, itemIndex) => (
                                    <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPage;