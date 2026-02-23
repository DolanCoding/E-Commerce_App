export const Terms = () => {
  return (
    <div className="flex-grow bg-gray-50 flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">Terms of Service</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using ShopHub, you accept and agree to be bound by the terms and provision of this agreement.
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on ShopHub
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on ShopHub</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              The materials on ShopHub are provided on an 'as is' basis. ShopHub makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall ShopHub or its suppliers be liable for any damages (including, without limitation, damages for
              loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials
              on ShopHub, even if ShopHub or a ShopHub authorized representative has been notified orally or in writing of the
              possibility of such damage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-700 leading-relaxed">
              The materials appearing on ShopHub could include technical, typographical, or photographic errors. ShopHub does
              not warrant that any of the materials on ShopHub are accurate, complete, or current. ShopHub may make changes to
              the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
            <p className="text-gray-700 leading-relaxed">
              ShopHub has not reviewed all of the sites linked to its website and is not responsible for the contents of any
              such linked site. The inclusion of any link does not imply endorsement by ShopHub of the site. Use of any such
              linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              ShopHub may revise these terms of service for its website at any time without notice. By using this website, you
              are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and
              you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
