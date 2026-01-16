// src/pages/HowSafeIsYourData.jsx
import React from "react";

export default function HowSafeIsYourData() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="px-6 py-8 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold">How Safe is Your Data</h1>
          <p className="mt-2 text-sm text-gray-600">
            Our commitment is to keep your personal and transactional data secure, private, and available only to authorized parties.
          </p>
        </header>

        <div className="px-6 py-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-2">Encryption in transit and at rest</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              All network traffic to our services is protected using strong TLS (HTTPS) to prevent interception. Sensitive data stored by Qualty ai is encrypted at rest using industry-standard encryption algorithms. Keys are stored and rotated using a dedicated secrets management solution.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Access control and least privilege</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We enforce role-based access controls and the principle of least privilege across all systems. Access to production systems and data is limited to authorized personnel and audited regularly. Administrative actions and data access are logged for forensic review.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Secure development and deployment</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Security is integrated into our software development lifecycle. We perform code reviews, static analysis, dependency vulnerability scanning, and automated testing in CI/CD pipelines. Secrets are never hard-coded; they are managed through secret stores and environment controls.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Payment safety</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We partner with PCI-compliant payment processors for all card-based transactions. Qualty ai does not store raw card numbers. We store the minimum tokenized or reference data required to support refunds or order lookups.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Data minimization and retention</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We collect the minimum personal data necessary to provide services. Retention periods are defined by operational needs and legal requirements. If you need the exact retention schedule for a specific data type, contact our privacy team and we will provide a precise timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Monitoring, detection and incident response</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our systems are monitored for suspicious activity and anomalous behavior. We maintain an incident response plan and will notify affected users and regulators in accordance with applicable laws if a data breach occurs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Third-party vendors and controls</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              We carefully evaluate third-party vendors for security posture and contractual safeguards. Where vendors process personal data on our behalf, we execute Data Processing Agreements that define permitted uses, security controls, and breach notification obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Your privacy rights and controls</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Access: You may request a copy of personal data we hold about you.</li>
              <li>Correction: You may request correction of inaccurate personal data.</li>
              <li>Deletion: Where permitted by law, you can request deletion of your personal data.</li>
              <li>Portability: For supported data types we can provide a machine-readable export.</li>
              <li>Consent and marketing: Manage your communication preferences in Account settings.</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">To exercise any rights, use the contact details below or the account settings controls.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Transparency and audits</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Where applicable, we undergo independent security assessments and certifications. If you require further assurance, share your business requirements with our security team and we will coordinate an NDA and third-party audit discussion where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Micro FAQ</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>What personal data do you collect?</strong>
                <div className="mt-1">We collect account and transactional data required to deliver services (name, contact, order/payment history). We do not collect unnecessary sensitive personal data unless explicitly required and consented to.</div>
              </div>

              <div>
                <strong>Do you share my data?</strong>
                <div className="mt-1">We only share data with service providers necessary to operate the service (payments, hosting, analytics) and when required by law. All vendor access is contractually limited.</div>
              </div>

              <div>
                <strong>How can I delete my data?</strong>
                <div className="mt-1">Use Account settings to request deletion or email support@qualty.ai for assisted deletion. We will respond in accordance with applicable law.</div>
              </div>

              <div>
                <strong>Are you compliant with GDPR or other laws?</strong>
                <div className="mt-1">We design our privacy program to support user rights under major privacy laws. For jurisdiction-specific requests, contact our privacy team and we will provide guidance.</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              For privacy or security inquiries, data subject requests, or compliance questions:
            </p>

            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:support@qualty.ai" className="text-blue-600 hover:underline">support@qualty.ai</a></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
