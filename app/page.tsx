export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="max-w-4xl px-8">

        <p className="text-blue-400 font-semibold mb-4">
          Hello, I'm
        </p>

        <h1 className="text-6xl font-bold mb-4">
          Mahesh Kumar Shankar
        </h1>

        <h2 className="text-3xl text-gray-300 mb-8">
          Principal Engineer • Technical Lead
        </h2>

        <p className="text-xl text-gray-400 leading-8 max-w-3xl">
          Building secure, scalable enterprise platforms using
          Java, Spring Boot, Microservices, Distributed Systems,
          Cloud Technologies, and AI-assisted software engineering.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
            View Projects
          </button>

          <button className="border border-gray-500 px-6 py-3 rounded-lg">
            Download Resume
          </button>

        </div>

      </div>
    </main>
  );
}