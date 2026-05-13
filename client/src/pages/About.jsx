import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Founded", value: "2022" },
    { label: "Customers", value: "50k+" },
    { label: "Products", value: "120+" },
    { label: "Countries", value: "15+" },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We meticulously select every component to ensure unparalleled performance and durability.",
      icon: Shield,
    },
    {
      title: "Fast Delivery",
      description:
        "Our global logistics network ensures your tech reaching you as fast as possible.",
      icon: Zap,
    },
    {
      title: "Eco-Conscious",
      description:
        "We prioritize sustainable materials and carbon-neutral shipping for a better planet.",
      icon: Globe,
    },
    {
      title: "Community Driven",
      description:
        "Built for creators, by creators. Your feedback drives our innovation cycle.",
      icon: Users,
    },
  ];

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-30 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6"
            >
              Redefining the <br />
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Lifestyle.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-gray-400"
            >
              Lumina was born from a simple idea: tech should be powerful,
              beautiful, and accessible. We spend thousands of hours refining
              every detail to bring you the best.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-gray-200 bg-gray-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Everything we do is guided by a commitment to excellence and a
                passion for technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-gray-200 bg-gray-200/80 p-6"
                  >
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
