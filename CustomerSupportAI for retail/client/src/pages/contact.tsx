import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Customer Support</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-gray-700">1-800-SHOPSMART</p>
                  <p className="text-gray-500 text-sm mt-1">Monday - Friday: 8AM - 8PM ET</p>
                  <p className="text-gray-500 text-sm">Saturday - Sunday: 9AM - 6PM ET</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-700">support@shopsmart.example.com</p>
                  <p className="text-gray-500 text-sm mt-1">We aim to respond within 24 hours</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Corporate Office</h2>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-700">123 Retail Way</p>
                <p className="text-gray-700">Suite 500</p>
                <p className="text-gray-700">Shopping City, SC 12345</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Chat with Our AI Assistant</h2>
              <p className="text-gray-700 mb-4">
                For immediate assistance, try our AI-powered customer service assistant on our home page. It can help with questions about products, shipping, returns, and more.
              </p>
              <div className="flex justify-center">
                <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-colors">
                  Chat with Assistant
                </Link>
              </div>
            </section>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}