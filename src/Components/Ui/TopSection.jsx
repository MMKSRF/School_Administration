

export default function TopSection({tope, bottom}) {
  return (
    <section className="pt-25 pb-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{tope}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              {bottom}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all">
                Watch Demo
              </button>
              <button className="border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
                See Pricing
              </button>
            </div>
          </div>
        </section>
  )
}
