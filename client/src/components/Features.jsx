export default function Features() {
  const features = [
    {
      title: "Easy Event Booking",
      desc: "Browse and book events instantly with secure ticket generation.",
    },
    {
      title: "Organizer Dashboard",
      desc: "Create, edit, and track your events in real-time.",
    },
    {
      title: "Admin Control",
      desc: "Approve events, manage users, and monitor the platform.",
    },
  ];

  return (
    <section className="py-20 bg-white px-6">
      <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
        Why Choose Eventify?
      </h3>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-indigo-600 mb-4">
              {f.title}
            </h4>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
