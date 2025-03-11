import { Link } from "wouter";

export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About ShopSmart</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-700">
                At ShopSmart, we're dedicated to providing exceptional customer service and high-quality products at competitive prices. Our mission is to make shopping easy, enjoyable, and accessible for everyone.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
              <p className="text-gray-700">
                Founded in 2010, ShopSmart began as a small online retailer with a focus on electronics. Over the years, we've grown to offer a wide range of products across multiple categories, from home goods to fashion, all while maintaining our commitment to customer satisfaction.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Customer Commitment</h2>
              <p className="text-gray-700">
                We believe that excellent customer service is the foundation of our business. Our AI-powered customer service assistant is just one way we're innovating to better serve our customers and provide timely, helpful responses to all inquiries.
              </p>
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