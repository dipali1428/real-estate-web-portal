'use client';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Animated 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-800 relative">
                        4
                        <span className="text-indigo-600 animate-bounce inline-block">0</span>
                        4
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Oops! The page you're looking for seems to have wandered off into
                        the digital void. Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold 
                     border border-gray-300 hover:bg-gray-50 transition-colors 
                     duration-200 shadow-sm">
                        Go Back
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold 
                     hover:bg-indigo-700 transition-colors duration-200 
                     shadow-sm">
                        Go Home
                    </button>
                </div>

                {/* Additional Help */}
                {/* <div className="mt-8 text-sm text-gray-500">
                    <p>
                        If you believe this is an error, please{' '}
                        <a
                            href="/contact"
                            className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                            contact support
                        </a>
                    </p>
                </div> */}
            </div>
        </div>
    );
}