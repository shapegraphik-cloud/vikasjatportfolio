import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  date?: string;
}

const projects: Project[] = [
  {
    id: "piramal-nutrition-solutions",
    title: "Piramal Nutrition Solutions",
    description: "Comprehensive nutrition and healthcare solutions platform",
    category: "Healthcare & Wellness",
    date: "2024",
  },
];

export default function Work() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
          <p className="text-lg text-gray-600">
            Explore our latest projects and case studies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/work/${project.id}`}>
              <a className="group">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {project.image && (
                    <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{project.description}</CardDescription>
                    <div className="flex items-center text-blue-600 group-hover:gap-2 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
