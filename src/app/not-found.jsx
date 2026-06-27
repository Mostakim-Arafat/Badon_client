import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#090d16]">
            <h1 className="text-6xl font-extrabold text-blue-500 tracking-tight mb-2">404</h1>
            <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
                The idea vault path you are looking for does not exist, has been archived, or moved to another destination.
            </p>
            <Link 
                href="/" 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-900/30 active:scale-95"
            >
                Return Home
            </Link>
        </div>
    );
};

export default NotFound;