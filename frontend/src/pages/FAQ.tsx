import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Orders over $50 qualify for free standard shipping.",
  },
  {
    id: 2,
    question: "What if I received a damaged product?",
    answer: "We stand behind all our products. If you receive a damaged item, please contact our support team within 30 days with photos and we'll arrange a replacement or refund immediately.",
  },
  {
    id: 3,
    question: "Can I return or exchange items?",
    answer: "Yes! We offer 30-day returns and exchanges on most items. Products must be unused and in original packaging. Simply initiate a return through your account or contact us.",
  },
  {
    id: 4,
    question: "Do you ship internationally?",
    answer: "Currently, we ship to most countries in North America and Europe. International shipping costs vary. Check the shipping page during checkout to see if we deliver to your location.",
  },
  {
    id: 5,
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. Use this number on our Track Order page to get real-time updates on your delivery status.",
  },
  {
    id: 6,
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard 256-bit SSL encryption to protect all transactions. Your credit card and personal information are never stored on our servers.",
  },
  {
    id: 7,
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 2 hours of purchase. After 2 hours, the order enters our fulfillment process. Contact support for cancellation requests.",
  },
  {
    id: 8,
    question: "Do you offer gift cards?",
    answer: "Yes! ShopHub gift cards are available in denominations from $25 to $500. They never expire and can be used on any product in our store.",
  },
];

export const FAQ = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-grow bg-gray-50 flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about ShopHub</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">{item.question}</h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};
