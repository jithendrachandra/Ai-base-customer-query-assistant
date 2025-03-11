import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-medium">What is your return policy?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Items can be returned within 30 days of purchase with a receipt for a full refund. Without a receipt, store credit at the current selling price is offered. All items must be unused and in original packaging.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">How much does shipping cost?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Standard shipping (5-7 business days) is free for orders over $50. Express shipping (2-3 business days) costs $9.99. Overnight shipping is available for $24.99.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-medium">Do you price match with competitors?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! ShopSmart matches competitors' prices within 14 days of purchase if the same item is found at a lower price. To request a price match, please contact customer service with details of the competitor's offer.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-medium">What are your current promotions?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Summer Sale: Up to 40% off selected outdoor furniture, garden accessories, and seasonal clothing.</li>
                  <li>Free shipping on all orders over $50.</li>
                  <li>Buy one, get one 50% off on select electronics.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl font-medium">How can I track my order?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                You can track your order by logging into your account and viewing the order status. You will also receive tracking information via email once your order has shipped.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-xl font-medium">How do I contact customer service?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                You can contact our customer service team through our AI chat assistant on the home page, by phone at 1-800-SHOPSMART, or by email at support@shopsmart.example.com.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
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