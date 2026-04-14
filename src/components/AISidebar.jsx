import React, { useState } from 'react';
import { FaWandMagicSparkles, FaLightbulb, FaCheckCircle, FaTimes, FaRobot, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const AISidebar = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [expandedSuggestion, setExpandedSuggestion] = useState(0);
  const [dismissedSuggestions, setDismissedSuggestions] = useState(new Set());

  const aiSuggestions = [
    {
      id: 1,
      title: "Improve Attendance",
      description: "Your current attendance is 75%. Target 85%+ for better grades",
      suggestion: "Attend 2-3 more classes in the coming week",
      icon: FaCheckCircle,
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      title: "Lab Score Boost",
      description: "Lab scores are your strength! Current score: 82/100",
      suggestion: "Focus on practical implementation assignments",
      icon: FaLightbulb,
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      title: "Assignment Strategy",
      description: "Complete assignments 2 days before deadline",
      suggestion: "This gives time for review and corrections",
      icon: FaWandMagicSparkles,
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      title: "Overall Performance",
      description: "You're on track for a B+ grade this semester",
      suggestion: "Focus on internal marks to push towards A-",
      icon: FaLightbulb,
      color: "from-orange-400 to-red-500"
    }
  ];

  const toggleSuggestion = (id) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };

  const dismissSuggestion = (id) => {
    const newDismissed = new Set(dismissedSuggestions);
    newDismissed.add(id);
    setDismissedSuggestions(newDismissed);
  };

  const visibleSuggestions = aiSuggestions.filter(s => !dismissedSuggestions.has(s.id));

  return (
    <div className={`fixed right-0 top-16 h-screen w-80 ${
      theme.isDark ? 'bg-gray-800 border-l border-gray-700' : 'bg-white border-l border-gray-200'
    } shadow-xl overflow-y-auto z-30 transition-all duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 p-4 ${
        theme.isDark ? 'bg-gray-900 border-b border-gray-700' : 'bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-200'
      } flex items-center space-x-2`}>
        <div className={`p-2 rounded-lg ${
          theme.isDark ? 'bg-green-900/30' : 'bg-green-200'
        }`}>
          <FaRobot className={`text-lg ${
            theme.isDark ? 'text-green-400' : 'text-green-600'
          }`} />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${
            theme.isDark ? 'text-white' : 'text-gray-900'
          }`}>AI Insights</h3>
          <p className={`text-xs ${
            theme.isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Personalized for you</p>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="p-4 space-y-3">
        {visibleSuggestions.length > 0 ? (
          visibleSuggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            const isExpanded = expandedSuggestion === suggestion.id;

            return (
              <div
                key={suggestion.id}
                className={`rounded-lg overflow-hidden border transition-all duration-300 ${
                  theme.isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    : 'bg-gradient-to-br ' + suggestion.color + ' bg-opacity-10 border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Suggestion Header */}
                <button
                  onClick={() => toggleSuggestion(suggestion.id)}
                  className={`w-full p-3 flex items-start justify-between transition-colors ${
                    theme.isDark ? 'hover:bg-gray-600' : 'hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1 text-left">
                    <div className={`mt-1 p-2 rounded-lg flex-shrink-0 bg-gradient-to-br ${suggestion.color}`}>
                      <Icon className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${
                        theme.isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {suggestion.title}
                      </h4>
                      <p className={`text-xs mt-1 ${
                        theme.isDark ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissSuggestion(suggestion.id);
                    }}
                    className={`p-1 rounded hover:${theme.isDark ? 'bg-gray-600' : 'bg-red-100'} transition-colors`}
                  >
                    <FaTimes className={`text-xs ${
                      theme.isDark ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </button>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-3 pb-3 border-t ${
                    theme.isDark ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <div className={`mt-3 p-2 rounded ${
                      theme.isDark ? 'bg-gray-600' : 'bg-white/60'
                    }`}>
                      <p className={`text-xs font-semibold ${
                        theme.isDark ? 'text-green-400' : 'text-green-700'
                      } flex items-center space-x-1 mb-2`}>
                        <FaWandMagicSparkles className="text-xs" />
                        <span>Suggestion</span>
                      </p>
                      <p className={`text-xs ${
                        theme.isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {suggestion.suggestion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className={`p-4 rounded-lg text-center ${
            theme.isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className={`text-xs ${
              theme.isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              All suggestions dismissed. Check back later!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`sticky bottom-0 p-4 border-t ${
        theme.isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <p className={`text-xs text-center ${
          theme.isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          💡 AI powered insights updated daily
        </p>
      </div>
    </div>
  );
};

export default AISidebar;
