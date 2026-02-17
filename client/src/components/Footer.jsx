export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Eventify. All rights reserved.
      </p>
    </footer>
  );
}
