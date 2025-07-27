'use client';

import { motion } from 'framer-motion';
import { BookOpen, Target, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TradePlan() {
  const strategies = [
    {
      title: 'Intraday Trading',
      description: 'Buy and sell stocks within the same trading day',
      risk: 'High',
      capital: '₹50,000+',
      time: 'Full Day',
      tips: [
        'Use stop-loss orders',
        'Monitor market momentum',
        'Avoid trading in first 30 minutes',
        'Close positions before market close'
      ]
    },
    {
      title: 'Swing Trading',
      description: 'Hold positions for 2-7 days based on technical analysis',
      risk: 'Medium',
      capital: '₹1,00,000+',
      time: '2-7 Days',
      tips: [
        'Focus on strong trend stocks',
        'Use multiple timeframe analysis',
        'Set realistic profit targets',
        'Maintain proper position sizing'
      ]
    },
    {
      title: 'Positional Trading',
      description: 'Long-term positions based on fundamental analysis',
      risk: 'Low',
      capital: '₹5,00,000+',
      time: 'Weeks to Months',
      tips: [
        'Research company fundamentals',
        'Diversify across sectors',
        'Ignore short-term volatility',
        'Review portfolio quarterly'
      ]
    }
  ];

  const riskManagement = [
    {
      title: 'Position Sizing',
      description: 'Never risk more than 1-2% of your capital on a single trade',
      icon: Shield
    },
    {
      title: 'Stop Loss',
      description: 'Always use stop-loss orders to limit potential losses',
      icon: AlertTriangle
    },
    {
      title: 'Diversification',
      description: 'Spread your investments across different stocks and sectors',
      icon: Target
    },
    {
      title: 'Risk-Reward Ratio',
      description: 'Aim for at least 1:2 risk-reward ratio in your trades',
      icon: TrendingUp
    }
  ];

  const tradingRules = [
    'Never trade with borrowed money',
    'Always have a trading plan before entering a position',
    'Keep emotions in check - stick to your strategy',
    'Don\'t try to catch every market move',
    'Learn from your losses and keep a trading journal',
    'Stay updated with market news and company announcements',
    'Use technical and fundamental analysis together',
    'Don\'t overtrade - quality over quantity'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trade Plan</h1>
              <p className="text-gray-600">Trading strategies and risk management guidelines</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Trading Strategies */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trading Strategies</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the right trading strategy based on your risk appetite, capital, and time availability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{strategy.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    strategy.risk === 'High' ? 'bg-red-100 text-red-800' :
                    strategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {strategy.risk} Risk
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{strategy.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capital Required:</span>
                    <span className="font-medium">{strategy.capital}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time Horizon:</span>
                    <span className="font-medium">{strategy.time}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Tips:</h4>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Management */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Risk Management</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Essential principles to protect your capital and ensure long-term trading success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskManagement.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Trading Rules */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Golden Trading Rules</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Follow these essential rules to become a successful trader
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">Important Disclaimer</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p className="mb-2">
                  Trading in financial markets involves substantial risk of loss and is not suitable for all investors. 
                  The strategies and information provided here are for educational purposes only.
                </p>
                <p>
                  Past performance does not guarantee future results. Always consult with a qualified financial advisor 
                  before making investment decisions and ensure you understand the risks involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 