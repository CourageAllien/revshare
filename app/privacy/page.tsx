import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | RevShare",
  description: "Privacy Policy for RevShare - How we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: January 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              RevShare (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-white mb-3">Personal Information</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Schedule a call or consultation with us</li>
              <li>Fill out a contact form on our website</li>
              <li>Subscribe to our newsletter or download resources</li>
              <li>Engage with us as a partner or client</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-medium text-white mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-text-secondary leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>IP address and general location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Provide, operate, and maintain our services</li>
              <li>Communicate with you about our services, including scheduling calls</li>
              <li>Send you marketing and promotional communications (with your consent)</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Analyze usage patterns to improve our website and services</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong className="text-white">Service Providers:</strong> With third-party vendors who assist us in operating our website and services (e.g., email providers, CRM systems, analytics tools)</li>
              <li><strong className="text-white">Business Partners:</strong> With partners when you become a client, as necessary to provide our revenue-share services</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="text-text-secondary leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p className="text-text-secondary leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. For partners and clients, we retain information for the duration of our business relationship and for a reasonable period thereafter for legal and business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify or update inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              To exercise any of these rights, please contact us at the email address provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies and Tracking</h2>
            <p className="text-text-secondary leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Links</h2>
            <p className="text-text-secondary leading-relaxed">
              Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-text-secondary leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
            <p className="text-text-secondary leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this privacy policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-card border border-border rounded-xl">
              <p className="text-white font-medium">RevShare</p>
              <p className="text-text-secondary mt-2">Email: privacy@revshare.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
