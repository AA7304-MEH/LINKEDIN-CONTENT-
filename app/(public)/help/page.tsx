export default function HelpPage() {
    return (
        <div className="min-h-screen bg-[#0d0d12] text-white flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-gray-400 text-xl">Need a hand? Our help guides are on the way.</p>
            <a href="/" className="mt-8 text-blue-400 hover:underline">Back to Home</a>
        </div>
    );
}
