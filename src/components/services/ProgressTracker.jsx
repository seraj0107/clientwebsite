// components/ProgressTracker.jsx

import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

const ProgressTracker = ({ validation }) => {
    if (!validation) return null;
    
    const { navbar, footer, section1, section2 } = validation;
    
    const sections = [
        { name: 'Navbar', data: navbar, key: 'navbar' },
        { name: 'Section 1 (Hero)', data: section1, key: 'section1' },
        { name: 'Section 2 (About)', data: section2, key: 'section2' },
        { name: 'Footer', data: footer, key: 'footer' }
    ];
    
    const overallCompletion = Math.round(
        (navbar.completionPercentage + 
         footer.completionPercentage + 
         section1.completionPercentage + 
         section2.completionPercentage) / 4
    );
    
    const allValid = navbar.isValid && footer.isValid && section1.isValid && section2.isValid;
    
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Configuration Progress
            </h2>
            
            {/* Overall Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Overall Completion
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                        {overallCompletion}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${overallCompletion}%` }}
                    />
                </div>
            </div>
            
            {/* Section-wise Progress */}
            <div className="space-y-4">
                {sections.map((section) => (
                    <div key={section.key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {section.data.isValid ? (
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                ) : section.data.errors.length > 0 ? (
                                    <FaTimesCircle className="text-red-500 text-xl" />
                                ) : (
                                    <FaExclamationCircle className="text-yellow-500 text-xl" />
                                )}
                                <span className="font-semibold text-gray-800">
                                    {section.name}
                                </span>
                            </div>
                            <span className={`text-sm font-bold ${
                                section.data.isValid 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                            }`}>
                                {section.data.completionPercentage}%
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    section.data.isValid 
                                        ? 'bg-green-500' 
                                        : 'bg-yellow-500'
                                }`}
                                style={{ width: `${section.data.completionPercentage}%` }}
                            />
                        </div>
                        
                        {/* Errors */}
                        {section.data.errors.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {section.data.errors.map((error, index) => (
                                    <p key={index} className="text-xs text-red-600 flex items-start gap-1">
                                        <span>•</span>
                                        <span>{error}</span>
                                    </p>
                                ))}
                            </div>
                        )}
                        
                        {/* Warnings */}
                        {section.data.warnings.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {section.data.warnings.map((warning, index) => (
                                    <p key={index} className="text-xs text-yellow-600 flex items-start gap-1">
                                        <span>⚠</span>
                                        <span>{warning}</span>
                                    </p>
                                ))}
                            </div>
                        )}
                        
                        {/* Success */}
                        {section.data.isValid && section.data.errors.length === 0 && (
                            <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                                <FaCheckCircle />
                                <span>All required fields completed</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Submit Button */}
            <div className="mt-6 pt-6 border-t">
                <button
                    disabled={!allValid}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                        allValid
                            ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {allValid ? '✓ Ready to Publish' : '⚠ Complete All Sections'}
                </button>
            </div>
        </div>
    );
};

export default ProgressTracker;