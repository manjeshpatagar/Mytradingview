'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  Users,
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  BarChart3,
  Shield,
  Zap,
  Award,
  Calendar,
  Newspaper,
  BookOpen,
  Activity
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time market data with AI-powered insights and predictive analytics."
    },
    {
      icon: Target,
      title: "Precision Trading",
      description: "High-accuracy trading signals with detailed entry and exit points."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive risk assessment and portfolio protection strategies."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant execution with ultra-low latency trading infrastructure."
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Join thousands of successful traders in our vibrant community."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Consistent performance with transparent track record."
    }
  ];

  const stats = [
    { label: "Active Traders", value: "50K+" },
    { label: "Success Rate", value: "85%" },
    { label: "Daily Signals", value: "200+" },
    { label: "Countries", value: "150+" }
  ];

  const testimonials = [
    {
      name: "Ravi Mehta",
      role: "Intraday Trader, Mumbai",
      content: "buy/sell levels are pure gold! I used to struggle to enter at the right time, but now my accuracy has improved drastically. Highly recommended for serious traders.",
      rating: 5
    },
    {
      name: "Neha Sharma",
      role: "Swing Trader, Delhi",
      content: "The intraday signals and news-based stock alerts helped me catch moves I would have otherwise missed. Very practical and well-explained strategy. Great work!",
      rating: 5
    },
    {
      name: "Amit Raj",
      role: "College Student, Patna",
      content: "As a beginner, I found the daily levels easy to follow. I made my first profitable trade using the buy-above and sell-below levels shared in the morning updates.",
      rating: 5
    },
    {
      name: "Priya Nair",
      role: "Part-time Trader, Bangalore",
      content: "The news-based trades are on point! I caught a 4% move on a result-based stock exactly as mentioned in the Trade Plan. No fluff—just actionable data.",
      rating: 5
    },
    {
      name: "Siddharth Rao",
      role: "Full-time Trader, Hyderabad",
      content: "Been following for 2 months now. The success ratio on intraday picks is solid, and the reasoning behind each trade boosts my confidence before entering.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      content: "This platform transformed my trading. The signals are incredibly accurate and the community support is amazing.",
      rating: 5
    }
  ];


  const navigationItems = [
    { name: 'Intraday Picks', href: '/intraday-picks', icon: Target },
    { name: 'Stock Events', href: '/results', icon: Calendar },
    { name: 'Stock News', href: '/stock-news', icon: Newspaper },
    { name: 'Market News', href: '/market-news', icon: Globe },
    { name: 'Trade Plan', href: '/trade-plan', icon: BookOpen },
    { name: 'Today Performance', href: '/intraday-results', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-bule-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">Trade Zone</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#testimonials" className="nav-link">Reviews</a>
              <Link href="/intraday-picks" className="btn-primary">
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Trade Smarter with India’s Most Precise
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent"> Stock Screener</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover high-potential stocks using daily levels, result-based picks, and real market news—trusted by thousands of active traders.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/intraday-picks" className="btn-primary text-lg px-8 py-4">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Quick Access Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-white">Trading Tools & Resources</h2>
            <p className="section-subtitle text-gray-300">
              Everything you need to make informed trading decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={item.href} className="feature-card block">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center text-blue-600 font-medium">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-white">Why Choose Trade Zone?</h2>
            <p className="section-subtitle text-gray-300">
              Advanced technology meets proven strategies to give you the edge in today's markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-white">What Our Traders Say</h2>
            <p className="section-subtitle text-gray-300">
              Join thousands of satisfied traders who have transformed their trading journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of successful traders and start making informed decisions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/intraday-picks" className="btn-primary text-lg px-8 py-4">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/trade-plan" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">Trade Zone</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Advanced trading platform powered by AI and real-time analytics.
                Join thousands of successful traders worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Trading Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/intraday-picks" className="text-gray-400 hover:text-white transition-colors">Intraday Picks</Link></li>
                <li><Link href="/results" className="text-gray-400 hover:text-white transition-colors">Stock Events</Link></li>
                <li><Link href="/stock-news" className="text-gray-400 hover:text-white transition-colors">Stock News</Link></li>
                <li><Link href="/market-news" className="text-gray-400 hover:text-white transition-colors">Market News</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/trade-plan" className="text-gray-400 hover:text-white transition-colors">Trade Plan</Link></li>
                <li><Link href="/intraday-results" className="text-gray-400 hover:text-white transition-colors">Performance</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TradeView Pro. All rights reserved. Trading involves risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
