export default function HowItWorks() {
  const steps = [
    "Register or Login",
    "Browse Events",
    "Book Tickets",
    "Attend & Enjoy",
  ];

  return (
    <section className="bg-gray-50 py-20 px-6">
      <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
        How It Works
      </h3>

      <div className="flex flex-wrap justify-center gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white w-64 p-6 rounded-lg shadow text-center"
          >
            <div className="text-3xl font-bold text-emerald-500 mb-3">
              {idx + 1}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
