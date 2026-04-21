import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const dashboardLinks = [
  {
    title: 'Create School',
    description: 'Register a new school and configure administrator access.',
    to: '/create-school',
    cta: 'Open Create School',
  },
  {
    title: 'Join School',
    description: 'Students and teachers can request membership in an existing school.',
    to: '/join-school',
    cta: 'Open Join School',
  },
  {
    title: 'Request School',
    description: 'Submit a new school request when your institution is not available yet.',
    to: '/request-school',
    cta: 'Open Request School',
  },
  {
    title: 'Forgot Password',
    description: 'Recover account access with verification and secure password reset.',
    to: '/forgot-password',
    cta: 'Open Recovery Flow',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Aqimari Dashboard</h1>
            <p className="text-lg text-gray-600">
              All onboarding and account workflows are now connected through this unified dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {dashboardLinks.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link
                  to={item.to}
                  className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
