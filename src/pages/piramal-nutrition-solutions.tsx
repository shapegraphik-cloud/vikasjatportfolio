import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function PiramalNutritionSolutions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/work">
            <a className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Work
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Piramal Nutrition Solutions
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive nutrition and healthcare solutions platform
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Piramal Nutrition Solutions is a comprehensive platform designed to deliver
            cutting-edge nutrition and healthcare solutions. The project focuses on creating
            an intuitive user experience while maintaining enterprise-grade security and
            scalability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our team worked closely with Piramal Nutrition to develop a modern, responsive
            platform that serves healthcare professionals and end-users, enabling better
            nutrition management and health outcomes.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Personalized nutrition recommendations",
              "Real-time health monitoring",
              "Professional dashboard",
              "Patient management system",
              "Integrated reporting tools",
              "Mobile-responsive design",
              "Secure data encryption",
              "Analytics and insights",
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: "Frontend",
                technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
              },
              {
                category: "Backend",
                technologies: ["Node.js", "Express", "PostgreSQL", "Redis"],
              },
              {
                category: "Infrastructure",
                technologies: ["Docker", "Kubernetes", "AWS", "CI/CD Pipeline"],
              },
            ].map((stack, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stack.technologies.map((tech, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Metrics/Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Performance", value: "<2s" },
              { label: "Coverage", value: "50+" },
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-gray-600 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Similar Solutions?</h2>
          <p className="mb-6 text-blue-100">
            Get in touch with us to discuss your healthcare technology needs.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Contact Us
          </Button>
        </section>
      </div>
    </div>
  );
}
