import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | RevShare",
  description: "Terms of Service for RevShare - The agreement governing the use of our services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="text-primary hover:text-primary-hover transition-colors text-sm mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-text-secondary">
            Last updated: January 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              By accessing or using RevShare&apos;s website and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you do not have permission to access our services.
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              These Terms apply to all visitors, users, and partners who access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
            <p className="text-text-secondary leading-relaxed">
              RevShare provides revenue-share-based sales and lead generation services for B2B consultants and service providers. Our services include, but are not limited to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>Cold email outreach campaigns</li>
              <li>Lead list building and research</li>
              <li>Meeting scheduling and calendar management</li>
              <li>Meeting preparation documentation</li>
              <li>Follow-up sequences and communications</li>
              <li>Proposal drafting assistance</li>
              <li>Deal tracking and CRM management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Partnership Terms</h2>
            <h3 className="text-xl font-medium text-white mb-3">Eligibility</h3>
            <p className="text-text-secondary leading-relaxed">
              To become a RevShare partner, you must:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>Offer B2B services with a minimum deal size of $10,000</li>
              <li>Have a proven offer with demonstrable case studies or results</li>
              <li>Have the capacity to handle 10-20 new sales conversations per month</li>
              <li>Be willing to enter into a revenue-sharing arrangement</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-3 mt-6">Revenue Share Model</h3>
            <p className="text-text-secondary leading-relaxed">
              Our compensation is based on a revenue-share model of 15-30% of lifetime client revenue for clients originated through our efforts. The specific percentage is determined during our partnership discussion and is based on factors including:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>Your average deal size</li>
              <li>Your industry and target market</li>
              <li>The complexity of your sales cycle</li>
              <li>Expected client lifetime value</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-3 mt-6">Attribution</h3>
            <p className="text-text-secondary leading-relaxed">
              A client is considered &quot;originated through our efforts&quot; if they first engaged with you through our outreach campaigns. We use tracking methods including dedicated sending domains, unique email threads, and CRM tagging to maintain clear attribution. Both parties agree to maintain honest and transparent records of lead sources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Partner Responsibilities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              As a RevShare partner, you agree to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Respond to scheduled meetings promptly and professionally</li>
              <li>Provide accurate information about your services and pricing</li>
              <li>Maintain honest communication about deal status and outcomes</li>
              <li>Pay agreed-upon revenue share within 30 days of receiving client payment</li>
              <li>Not engage in any fraudulent or deceptive practices</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Our Responsibilities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              RevShare agrees to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Execute outreach campaigns professionally and in compliance with applicable laws</li>
              <li>Provide meeting preparation and follow-up support as outlined in your partnership agreement</li>
              <li>Maintain accurate records of lead attribution</li>
              <li>Communicate regularly about campaign performance</li>
              <li>Protect your confidential business information</li>
              <li>Not represent ourselves as employees of your company without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Payment Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              Revenue share payments are due within 30 days of the partner receiving payment from a client originated through our services. Late payments may incur interest charges as specified in the partnership agreement. Partners are responsible for tracking and reporting closed deals honestly and accurately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality</h2>
            <p className="text-text-secondary leading-relaxed">
              Both parties agree to keep confidential any proprietary information shared during the partnership, including but not limited to: business strategies, client information, pricing structures, and internal processes. This obligation survives the termination of the partnership.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
            <p className="text-text-secondary leading-relaxed">
              RevShare retains ownership of all intellectual property developed in the course of providing services, including but not limited to outreach templates, processes, and methodologies. Partners retain ownership of their existing intellectual property and brand assets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
            <p className="text-text-secondary leading-relaxed">
              Either party may terminate the partnership with 30 days written notice. Upon termination:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>All active campaigns will be wound down</li>
              <li>Revenue share obligations for clients already originated continue for the lifetime of those client relationships</li>
              <li>Access to shared systems and tools will be revoked</li>
              <li>Confidentiality obligations remain in effect</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              RevShare reserves the right to terminate immediately for material breach of these Terms, including fraud, non-payment, or reputational damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              RevShare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>Your use or inability to use our services</li>
              <li>Any conduct or content of any third party</li>
              <li>Deals that do not close or clients that do not convert</li>
              <li>Any unauthorized access, use, or alteration of your content</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              Our total liability shall not exceed the total revenue share payments made to RevShare in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-text-secondary leading-relaxed">
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee any specific results, number of meetings, or revenue outcomes. Success depends on many factors including your offer, pricing, and ability to close deals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Indemnification</h2>
            <p className="text-text-secondary leading-relaxed">
              You agree to indemnify and hold harmless RevShare and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from your use of our services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law</h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Severability</h2>
            <p className="text-text-secondary leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">16. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-card border border-border rounded-xl">
              <p className="text-white font-medium">RevShare</p>
              <p className="text-text-secondary mt-2">Email: legal@revshare.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
