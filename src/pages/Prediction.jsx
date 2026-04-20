import React, { useState, useEffect } from "react";
import { FaRocket, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaBrain, FaCalculator, FaTrophy, FaClock, FaTachometerAlt, FaLightbulb } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Prediction() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputData, setInputData] = useState({
    attendance: '',
    internalMarks: '',
    assignmentScore: '',
    studyHours: '',
    subjectDifficulty: 'Medium'
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('logistic');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputData.attendance) newErrors.attendance = 'Attendance is required';
    else if (inputData.attendance < 0 || inputData.attendance > 100) newErrors.attendance = 'Attendance must be between 0-100';
    if (!inputData.internalMarks) newErrors.internalMarks = 'Internal marks are required';
    else if (inputData.internalMarks < 0 || inputData.internalMarks > 100) newErrors.internalMarks = 'Internal marks must be between 0-100';
    if (!inputData.assignmentScore) newErrors.assignmentScore = 'Assignment score is required';
    else if (inputData.assignmentScore < 0 || inputData.assignmentScore > 100) newErrors.assignmentScore = 'Assignment score must be between 0-100';
    if (!inputData.studyHours) newErrors.studyHours = 'Study hours are required';
    else if (inputData.studyHours < 0 || inputData.studyHours > 24) newErrors.studyHours = 'Study hours must be between 0-24';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const predictPerformance = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setShowResults(false);

    // Simulate API call
    setTimeout(() => {
      const baseScore = (
        (parseFloat(inputData.attendance) || 0) * 0.25 +
        (parseFloat(inputData.internalMarks) || 0) * 0.30 +
        (parseFloat(inputData.assignmentScore) || 0) * 0.25 +
        (parseFloat(inputData.studyHours) || 0) * 0.20
      );

      // Adjust based on subject difficulty
      let difficultyMultiplier = 1;
      switch (inputData.subjectDifficulty) {
        case 'Easy': difficultyMultiplier = 1.1; break;
        case 'Medium': difficultyMultiplier = 1.0; break;
        case 'Hard': difficultyMultiplier = 0.9; break;
        default: difficultyMultiplier = 1.0;
      }

      let adjustedScore = baseScore * difficultyMultiplier;

      // Algorithm-specific adjustments
      let algorithmAdjustment = 0;
      switch (selectedAlgorithm) {
        case 'logistic':
          algorithmAdjustment = Math.random() * 8 - 4; // -4 to +4
          break;
        case 'decision':
          algorithmAdjustment = adjustedScore > 70 ? 3 : -3;
          break;
        case 'random':
          algorithmAdjustment = Math.random() * 12 - 6; // -6 to +6
          break;
        case 'neural':
          algorithmAdjustment = Math.sin(adjustedScore / 10) * 5; // Neural network simulation
          break;
        default:
          algorithmAdjustment = 0;
      }

      const finalScore = Math.max(0, Math.min(100, adjustedScore + algorithmAdjustment));

      // Determine predictions
      let passFail, grade, riskLevel, performance, probability;

      if (finalScore >= 60) {
        passFail = 'PASS';
        probability = Math.min(95, finalScore + Math.random() * 10);
        if (finalScore >= 90) {
          grade = 'A+';
          riskLevel = 'Very Low';
          performance = 'Excellent';
        } else if (finalScore >= 80) {
          grade = 'A';
          riskLevel = 'Low';
          performance = 'Very Good';
        } else if (finalScore >= 70) {
          grade = 'B+';
          riskLevel = 'Low';
          performance = 'Good';
        } else {
          grade = 'B';
          riskLevel = 'Medium';
          performance = 'Average';
        }
      } else {
        passFail = 'FAIL';
        probability = Math.max(5, finalScore - Math.random() * 10);
        if (finalScore >= 50) {
          grade = 'C';
          riskLevel = 'High';
          performance = 'Poor';
        } else {
          grade = 'F';
          riskLevel = 'Very High';
          performance = 'Very Poor';
        }
      }

      const result = {
        passFail,
        grade,
        riskLevel,
        performance,
        probability: Math.round(probability),
        confidence: Math.round(85 + Math.random() * 10),
        finalScore: Math.round(finalScore),
        algorithm: selectedAlgorithm,
        recommendations: generateRecommendations(passFail, riskLevel, finalScore)
      };

      setPrediction(result);
      setIsLoading(false);
      setShowResults(true);
    }, 2500);
  };

  const generateRecommendations = (passFail, riskLevel, score) => {
    const recommendations = [];

    if (passFail === 'FAIL') {
      recommendations.push("Increase study hours and focus on weak subjects");
      recommendations.push("Seek additional tutoring support");
      recommendations.push("Improve attendance and assignment completion");
    } else if (riskLevel === 'High' || riskLevel === 'Very High') {
      recommendations.push("Focus on consistent performance across all subjects");
      recommendations.push("Utilize additional study resources");
      recommendations.push("Consider peer study groups");
    } else if (score >= 85) {
      recommendations.push("Maintain excellent study habits");
      recommendations.push("Consider advanced learning opportunities");
      recommendations.push("Help peers with challenging concepts");
    } else {
      recommendations.push("Continue current study routine with minor improvements");
      recommendations.push("Focus on understanding core concepts");
    }

    return recommendations;
  };

  // Chart data
  const performanceChartData = prediction ? {
    labels: ['Attendance', 'Internal Marks', 'Assignment Score', 'Study Hours'],
    datasets: [{
      label: 'Performance Factors',
      data: [
        parseFloat(inputData.attendance) || 0,
        parseFloat(inputData.internalMarks) || 0,
        parseFloat(inputData.assignmentScore) || 0,
        (parseFloat(inputData.studyHours) || 0) * 4.17 // Convert to percentage scale
      ],
      backgroundColor: darkMode ? [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 191, 36, 0.8)',
      ] : [
        'rgba(59, 130, 246, 0.6)',
        'rgba(147, 51, 234, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(251, 191, 36, 0.6)',
      ],
      borderColor: darkMode ? [
        'rgba(59, 130, 246, 1)',
        'rgba(147, 51, 234, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(251, 191, 36, 1)',
      ] : [
        'rgba(59, 130, 246, 1)',
        'rgba(147, 51, 234, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(251, 191, 36, 1)',
      ],
      borderWidth: 1,
    }],
  } : null;

  const probabilityChartData = prediction ? {
    labels: ['Pass Probability', 'Fail Probability'],
    datasets: [{
      data: [prediction.probability, 100 - prediction.probability],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 1,
    }],
  } : null;

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Very Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'Very High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+') return 'text-green-600';
    if (grade === 'A') return 'text-green-500';
    if (grade === 'B+') return 'text-blue-600';
    if (grade === 'B') return 'text-blue-500';
    if (grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 pt-16 overflow-x-auto ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-8">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">AI Performance Prediction</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Advanced machine learning algorithms for student performance prediction
              </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Input Form */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaBrain className="text-purple-500" />
                  Prediction Inputs
                </h2>

                <div className="space-y-6">
                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Attendance (%)
                    </label>
                    <input
                      type="number"
                      name="attendance"
                      value={inputData.attendance}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.attendance ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter attendance percentage"
                      min="0"
                      max="100"
                    />
                    {errors.attendance && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.attendance}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Internal Marks
                    </label>
                    <input
                      type="number"
                      name="internalMarks"
                      value={inputData.internalMarks}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.internalMarks ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter internal marks"
                      min="0"
                      max="100"
                    />
                    {errors.internalMarks && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.internalMarks}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Assignment Score
                    </label>
                    <input
                      type="number"
                      name="assignmentScore"
                      value={inputData.assignmentScore}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.assignmentScore ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter assignment score"
                      min="0"
                      max="100"
                    />
                    {errors.assignmentScore && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.assignmentScore}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Study Hours (per day)
                    </label>
                    <input
                      type="number"
                      name="studyHours"
                      value={inputData.studyHours}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.studyHours ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter daily study hours"
                      min="0"
                      max="24"
                    />
                    {errors.studyHours && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.studyHours}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Subject Difficulty
                    </label>
                    <select
                      name="subjectDifficulty"
                      value={inputData.subjectDifficulty}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ML Algorithm
                    </label>
                    <select
                      value={selectedAlgorithm}
                      onChange={(e) => setSelectedAlgorithm(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="logistic">Logistic Regression</option>
                      <option value="decision">Decision Tree</option>
                      <option value="random">Random Forest</option>
                      <option value="neural">Neural Network</option>
                    </select>
                  </div>

                  <button
                    onClick={predictPerformance}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing with AI...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaRocket />
                        Predict Performance
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Prediction Results */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaChartLine className="text-blue-500" />
                  AI Prediction Results
                </h2>

                {showResults && prediction ? (
                  <div className="space-y-6 animate-fade-in">

                    {/* Pass/Fail Prediction */}
                    <div className={`p-4 rounded-lg border-2 ${
                      prediction.passFail === 'PASS'
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <FaCheckCircle className={prediction.passFail === 'PASS' ? 'text-green-600' : 'text-red-600'} />
                          Pass/Fail Prediction
                        </h3>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          prediction.passFail === 'PASS'
                            ? (darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800')
                            : (darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800')
                        }`}>
                          {prediction.passFail}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-1000 ${
                                prediction.passFail === 'PASS' ? 'bg-green-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${prediction.probability}%` }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1">{prediction.probability}% Probability</p>
                        </div>
                      </div>
                    </div>

                    {/* Grade Prediction */}
                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FaTrophy className="text-blue-600" />
                        Grade Prediction
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className={`text-3xl font-bold ${getGradeColor(prediction.grade)}`}>
                          {prediction.grade}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {prediction.performance}
                        </span>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-orange-50 border-orange-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FaTachometerAlt className="text-orange-600" />
                        Risk Assessment
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                          {prediction.riskLevel} Risk
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Confidence: {prediction.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Algorithm Info */}
                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FaCalculator className="text-purple-600" />
                        Algorithm Details
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Algorithm:</span> {
                            selectedAlgorithm === 'logistic' ? 'Logistic Regression' :
                            selectedAlgorithm === 'decision' ? 'Decision Tree' :
                            selectedAlgorithm === 'random' ? 'Random Forest' : 'Neural Network'
                          }
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Final Score:</span> {prediction.finalScore}/100
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Subject Difficulty:</span> {inputData.subjectDifficulty}
                        </p>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-indigo-50 border-indigo-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FaLightbulb className="text-indigo-600" />
                        AI Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-indigo-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaCalculator className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Enter student data and click "Predict Performance" to see AI-powered results
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Charts Section */}
            {showResults && prediction && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-6 rounded-xl shadow-lg border`}>
                  <h3 className="text-xl font-bold mb-4 text-center">Performance Factors Analysis</h3>
                  <Bar
                    data={performanceChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          labels: { color: darkMode ? 'white' : 'black' }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: { color: darkMode ? 'white' : 'black' },
                          grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                        },
                        x: {
                          ticks: { color: darkMode ? 'white' : 'black' },
                          grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                        }
                      }
                    }}
                  />
                </div>

                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-6 rounded-xl shadow-lg border`}>
                  <h3 className="text-xl font-bold mb-4 text-center">Pass/Fail Probability</h3>
                  <div className="flex justify-center">
                    <div className="w-64 h-64">
                      <Doughnut
                        data={probabilityChartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              labels: { color: darkMode ? 'white' : 'black' }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                      {prediction.probability}% Pass Probability
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}