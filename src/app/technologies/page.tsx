import React from 'react';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { Rocket, Users, Wrench } from 'lucide-react';

export default function TechnologiesPage() {
  // Technology categories and their items
  const technologyCategories = [
    {
      title: "Mobility",
      technologies: [
        { name: "Android", logo: "/assets/images/brand-logos/android.png" },
        { name: "iOS", logo: "/assets/images/brand-logos/IOS.png" },
        { name: "React Native", logo: "/assets/images/brand-logos/reactnative.png" },
        { name: "Flutter", logo: "/assets/images/brand-logos/flutter.png" },
        { name: "Ionic", logo: "/assets/images/brand-logos/ionic.png" },
        { name: "Xamarin", logo: "/assets/images/brand-logos/xamarin.png" },
        { name: "PWA", logo: "/assets/images/brand-logos/pwa.png" },
        { name: "PhoneGap", logo: "/assets/images/brand-logos/phoneGap.png" },
        { name: "Electron.js", logo: "/assets/images/brand-logos/electronjs.png" },
        { name: "Native App", logo: "/assets/images/brand-logos/native-app.png" },
        { name: "Hybrid App", logo: "/assets/images/brand-logos/hybrid-app.png" }
      ]
    },
    {
      title: "JavaScript & Frontend",
      technologies: [
        { name: "JavaScript", logo: "/assets/images/brand-logos/javascript.png" },
        { name: "Angular", logo: "/assets/images/brand-logos/angularjs.png" },
        { name: "Vue.js", logo: "/assets/images/brand-logos/vuejs.png" },
        { name: "React.js", logo: "/assets/images/brand-logos/reactjs.png" },
        { name: "Bootstrap", logo: "/assets/images/brand-logos/bootstrap.png" },
        { name: "HTML5", logo: "/assets/images/brand-logos/html5.png" },
        { name: "CSS3", logo: "/assets/images/brand-logos/css3.png" },
        { name: "jQuery", logo: "/assets/images/brand-logos/jquery.png" }
      ]
    },
    {
      title: "Big Data & Analytics",
      technologies: [
        { name: "Hadoop", logo: "/assets/images/brand-logos/hadoop.png" },
        { name: "Power BI", logo: "/assets/images/brand-logos/powerbi.png" },
        { name: "Big Data", logo: "/assets/images/brand-logos/bigdata.png" },
        { name: "Tableau", logo: "/assets/images/brand-logos/tableau.png" },
        { name: "Apache Spark", logo: "/assets/images/brand-logos/apache-spark.png" },
        { name: "MongoDB", logo: "/assets/images/brand-logos/mongodb.png" }
      ]
    },
    {
      title: "Backend Development",
      technologies: [
        { name: "PHP", logo: "/assets/images/brand-logos/php.png" },
        { name: "Laravel", logo: "/assets/images/brand-logos/laravel.png" },
        { name: "Java", logo: "/assets/images/brand-logos/java.png" },
        { name: "Python", logo: "/assets/images/brand-logos/python.png" },
        { name: "Node.js", logo: "/assets/images/brand-logos/nodejs.png" },
        { name: "Objective C", logo: "/assets/images/brand-logos/objectivec.png" },
        { name: "C++", logo: "/assets/images/brand-logos/c++.png" },
        { name: "C#", logo: "/assets/images/brand-logos/chash.png" },
        { name: "Ruby", logo: "/assets/images/brand-logos/ruby.png" },
        { name: "Go", logo: "/assets/images/brand-logos/go.png" }
      ]
    },
    {
      title: "Cloud & DevOps",
      technologies: [
        { name: "AWS", logo: "/assets/images/brand-logos/aws.png" },
        { name: "Azure", logo: "/assets/images/brand-logos/azure.png" },
        { name: "Google Cloud", logo: "/assets/images/brand-logos/googlecloud.png" },
        { name: "Docker", logo: "/assets/images/brand-logos/docker.png" },
        { name: "Kubernetes", logo: "/assets/images/brand-logos/kubernetes.png" },
        { name: "Jenkins", logo: "/assets/images/brand-logos/jenkins.png" },
        { name: "Git", logo: "/assets/images/brand-logos/git.png" },
        { name: "GitHub", logo: "/assets/images/brand-logos/github.png" }
      ]
    },
    {
      title: "Blockchain, ML & AI",
      technologies: [
        { name: "Blockchain", logo: "/assets/images/brand-logos/blockchain.png" },
        { name: "Machine Learning", logo: "/assets/images/brand-logos/machinelearning.png" },
        { name: "TensorFlow", logo: "/assets/images/brand-logos/tensorflow.png" },
        { name: "PyTorch", logo: "/assets/images/brand-logos/pytorch.png" },
        { name: "OpenAI", logo: "/assets/images/brand-logos/openai.png" },
        { name: "Computer Vision", logo: "/assets/images/brand-logos/computer-vision.png" }
      ]
    },
    {
      title: "E-Commerce & CMS",
      technologies: [
        { name: "Drupal", logo: "/assets/images/brand-logos/drupal.png" },
        { name: "Magento", logo: "/assets/images/brand-logos/magento.png" },
        { name: "WordPress", logo: "/assets/images/brand-logos/wordpress.png" },
        { name: "Shopify", logo: "/assets/images/brand-logos/shopify.png" },
        { name: "WooCommerce", logo: "/assets/images/brand-logos/woocommerce.png" },
        { name: "Joomla", logo: "/assets/images/brand-logos/joomla.png" },
        { name: "CodeIgniter", logo: "/assets/images/brand-logos/coeigniter.png" }
      ]
    }
  ];

  return (
    <WebsiteLayout 
      title="Technologies - Overview Of Our Diverse Technology Competency"
      description="Adysun Ventures offers comprehensive technology solutions across Mobility, Frontend, Backend, Big Data, AI/ML, Blockchain, and E-Commerce platforms. Hire skilled developers for your software development needs."
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hire Software Developers / Programmers Of Adysun Ventures
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Adysun Ventures is a software development firm offering software developers / engineers / programmers to hire on hourly, part time or monthly basis. We focus on creating scalable, high performing, and secure software solutions for all the industry verticals.
          </p>
        </div>
      </section>

      {/* Technology Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Overview Of Our Diverse Technology Competency
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Adysun Ventures is dedicated to offer technology solutions for all industry verticals. We have a team of skilled programmers experienced in diverse technology set ranging from mobility, web development to Blockchain, AI, Ecommerce, CMS and more. Take a look at the core technologies our developers hold comprehensive expertise in.
            </p>
          </div>

          {/* Technology Categories Grid */}
          <div className="space-y-16">
            {technologyCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="group">
                      <div className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-orange-300 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center justify-center mb-3">
                          <img 
                            src={tech.logo} 
                            alt={tech.name}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="hidden text-2xl text-gray-400">
                            <Wrench className="w-6 h-6" />
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Developers Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Hire Developers from Adysun Ventures?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              We provide skilled developers who deliver quality solutions with proven expertise across multiple technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-600 rounded-lg">
              <div className="text-6xl text-orange-500 mb-4">
                <Rocket className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Development</h3>
              <p className="text-gray-300">
                We build fast and deliver quality solutions within your timeline, ensuring your project stays on track.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-600 rounded-lg">
              <div className="text-6xl text-orange-500 mb-4">
                <Users className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Implemented 4200+ Projects</h3>
              <p className="text-gray-300">
                We have successfully completed hundreds of projects and are ready to explore new ventures.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-600 rounded-lg">
                             <div className="text-6xl text-orange-500 mb-4">
                 <Users className="w-16 h-16" />
               </div>
              <h3 className="text-xl font-semibold mb-4">Free Project Management</h3>
              <p className="text-gray-300">
                We not only build fast but also free you from management issues. You get a PM from our side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Hire Skilled Developers?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get in touch with us to discuss your development needs and find the perfect developers for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Now
            </a>
            <a 
              href="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
