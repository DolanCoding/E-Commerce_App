export const Privacy = () => {
  return (
    <div className="flex-grow bg-gray-50 flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">Privacy Policy</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              ShopHub ("we" or "us" or "our") operates the shophub.com website (the "Service"). This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices
              you have associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Collection and Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We collect several different types of information for various purposes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Personal Data:</strong> Name, email address, phone number, address, payment information</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visits</li>
              <li><strong>Cookies:</strong> Small files stored on your device to enhance user experience</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">ShopHub uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information so we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your data is important to us but remember that no method of transmission over the Internet or
              method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your
              Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Links to Other Sites</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you
              will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you
              visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any
              third party sites or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
              Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 mt-4">
              Email: privacy@shophub.com<br />
              Address: 123 Commerce Street, NY 10001
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">Last updated: February 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};
