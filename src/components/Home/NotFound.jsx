import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative text-center max-w-2xl">
                {/* 404 Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <FaExclamationTriangle className="relative text-8xl sm:text-9xl text-orange-500" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    Company Not Found
                </h2>
            </div>
        </div>
    );
};

export default NotFound;
