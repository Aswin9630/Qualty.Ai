import { Award, Shield, CheckCircle, FileCheck } from "lucide-react";

export function Certifications() {
  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management Systems",
      icon: Shield
    },
    {
      title: "ISO 22000:2018",
      description: "Inspection Body Accreditation",
      icon: Shield
    },
    {
      title: "ISO 27001:2022",
      description: "Information Security",
      icon: Shield
    },
  ];

  const standards = [
    "International Accreditation Forum (IAF)",
    "International Laboratory Accreditation Cooperation (ILAC)",
    "American National Standards Institute (ANSI)",
    "European Committee for Standardization (CEN)",
    "British Standards Institution (BSI)",
    "Bureau Veritas Certification"
  ];

  return (
    <section className="py-24 lg:py-32 bg-black/[0.02] border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <div className="text-sm text-black/40 mb-4 tracking-wide uppercase">
            Compliance & Standards
          </div>
          <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
            Certifications & Compliance
          </h2>
          <p className="text-lg text-black/60 leading-relaxed">
            Maintaining the highest standards of quality, security, and compliance
            in the inspection industry
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center border border-black/10 hover:border-black/20 transition-all"
              >
                <div className="w-14 h-14 rounded-xl border border-black/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg mb-2">{cert.title}</h3>
                {/* <p className="text-sm text-black/60">{cert.description}</p> */}
              </div>
            );
          })}
        </div>

        {/* <div className="bg-white rounded-2xl p-8 lg:p-12 border border-black/10">
          <h3 className="text-2xl tracking-tight mb-8 text-center">
            Recognized Accreditations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-black/[0.02] transition-all"
              >
                <CheckCircle size={20} strokeWidth={1.5} className="text-black/40 flex-shrink-0" />
                <span className="text-sm">{standard}</span>
              </div>
            ))}
          </div>
        </div> */}

        <div className="mt-12 bg-black text-white rounded-2xl p-8 lg:p-12 text-center">
          <Shield size={40} strokeWidth={1.5} className="mx-auto mb-6 text-white/60" />
          <h3 className="text-2xl tracking-tight mb-4">Our Commitment to Quality</h3>
          <p className="text-white/70 max-w-[700px] mx-auto leading-relaxed">
            Every inspector on our platform is verified against international
            standards. We conduct regular audits and maintain strict compliance
            protocols to ensure your inspections meet global quality benchmarks.
          </p>
        </div>
      </div>
    </section>
  );
}
