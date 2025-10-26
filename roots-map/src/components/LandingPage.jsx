import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, BookOpen, Users, ChevronRight, Globe, Heart } from 'lucide-react';

/**
 * @typedef {Object} Feature
 * @property {React.ReactElement} icon
 * @property {string} title
 * @property {string} description
 * @property {string} color
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} name
 * @property {string} location
 * @property {string} text
 * @property {string} avatar
 */

/**
 * @typedef {Object} Stats
 * @property {number} users
 * @property {number} stories
 * @property {number} countries
 */

/**
 * @typedef {Object} HowItWorksStep
 * @property {string} step
 * @property {React.ReactElement} icon
 * @property {string} title
 * @property {string} desc
 */

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ users: 0, stories: 0, countries: 0 });

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated stats counter
  useEffect(() => {
    /**
     * @returns {() => void} Cleanup function
     */
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = { users: 1247, stories: 3891, countries: 23 };
      const current = { users: 0, stories: 0, countries: 0 };
      
      const increment = {
        users: targets.users / steps,
        stories: targets.stories / steps,
        countries: targets.countries / steps
      };

      let step = 0;
      const timer = setInterval(() => {
        if (step < steps) {
          current.users += increment.users;
          current.stories += increment.stories;
          current.countries += increment.countries;
          setStats({
            users: Math.floor(current.users),
            stories: Math.floor(current.stories),
            countries: Math.floor(current.countries)
          });
          step++;
        } else {
          clearInterval(timer);
          setStats(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  /** @type {Feature[]} */
  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "ფესვების რუკა",
      description: "შექმენი შენი ოჯახის ინტერაქტიული რუკა და დაუკავშირდი საქართველოს ყველა კუთხეს",
      color: "from-red-500 to-red-700"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "კულტურული ბიბლიოთეკა",
      description: "ისწავლე ქართული ენა, ისტორია და ტრადიციები ინტერაქტიული მასალების საშუალებით",
      color: "from-amber-500 to-amber-700"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "საზოგადოება",
      description: "დაუკავშირდი დიასპორაში მცხოვრებ ქართველებს და გაუზიარე შენი ისტორია",
      color: "from-teal-500 to-teal-700"
    }
  ];

  /** @type {Testimonial[]} */
  const testimonials = [
    {
      name: "ანა ჯავახიშვილი",
      location: "ლონდონი, დიდი ბრიტანეთი",
      text: "ეს პლატფორმა დამეხმარა ჩემს შვილებს გაეცნობიერებინათ საიდან მოდიან. ახლა ისინი ამაყად საუბრობენ საქართველოზე.",
      avatar: "🇬🇪"
    },
    {
      name: "გიორგი მამულაშვილი",
      location: "დუბლინი, ირლანდია",
      text: "აღმოვაჩინე ჩემი ბაბუის სოფელი რუკაზე და ვნახე სხვა ადამიანების ისტორიები იმავე ადგილიდან. გასაოცარია!",
      avatar: "🏔️"
    }
  ];

  /** @type {HowItWorksStep[]} */
  const howItWorksSteps = [
    { step: "1", icon: <Users />, title: "რეგისტრაცია", desc: "შექმენი პროფილი და დაიწყე შენი კულტურული მოგზაურობა" },
    { step: "2", icon: <MapPin />, title: "რუკის შექმნა", desc: "დაამატე ლოკაციები, ფოტოები და ოჯახის ისტორიები" },
    { step: "3", icon: <Heart />, title: "დაკავშირება", desc: "გაუზიარე სხვებს და იპოვე შენი კულტურული საზოგადოება" }
  ];

  /**
   * @param {string} href
   */
  const handleNavClick = (href) => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ე
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">ეროვნული ფესვების რუკა</h1>
                <p className="text-xs text-slate-600">Georgian Roots Map</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 hover:text-red-700 transition">ფუნქციები</a>
              <a href="#about" className="text-slate-700 hover:text-red-700 transition">შესახებ</a>
              <a href="#library" className="text-slate-700 hover:text-red-700 transition">ბიბლიოთეკა</a>
              <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                შესვლა
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
              <a href="#features" onClick={() => handleNavClick('#features')} className="block text-slate-700 hover:text-red-700 transition">ფუნქციები</a>
              <a href="#about" onClick={() => handleNavClick('#about')} className="block text-slate-700 hover:text-red-700 transition">შესახებ</a>
              <a href="#library" onClick={() => handleNavClick('#library')} className="block text-slate-700 hover:text-red-700 transition">ბიბლიოთეკა</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg">
                შესვლა
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold animate-bounce">
              🎉 ახალი: კულტურული ბიბლიოთეკა ხელმისაწვდომია!
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              დაუკავშირდი შენს
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"> ფესვებს</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              შექმენი შენი კულტურული რუკა, გაუზიარე ოჯახის ისტორია და დაუკავშირდი ქართულ იდენტობას მსოფლიოს ნებისმიერ კუთხიდან
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2">
                <span>დაიწყე მოგზაურობა</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-800 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>რუკის ნახვა</span>
              </button>
            </div>

            {/* Stats */}
            <div id="stats-section" className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-700 mb-2">{stats.users.toLocaleString()}</div>
                <div className="text-sm md:text-base text-slate-600">მონაწილე</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">{stats.stories.toLocaleString()}</div>
                <div className="text-sm md:text-base text-slate-600">ისტორია</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">{stats.countries}</div>
                <div className="text-sm md:text-base text-slate-600">ქვეყანა</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">რას გთავაზობთ</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              პლატფორმა, რომელიც აერთიანებს დიასპორას და ინარჩუნებს ქართულ იდენტობას
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                <button className="text-red-700 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all">
                  <span>გაიგე მეტი</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">როგორ მუშაობს</h2>
            <p className="text-xl text-slate-600">მარტივი 3 ნაბიჯი</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-amber-600 to-teal-600 hidden md:block"></div>
              
              {howItWorksSteps.map((item, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10 relative">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">რას ამბობენ მომხმარებლები</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="text-6xl mb-4">{testimonial.avatar}</div>
                <p className="text-slate-700 text-lg mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">მზად ხარ დაიწყო?</h2>
          <p className="text-xl mb-8 opacity-90">შეუერთდი ათასობით ქართველს მსოფლიოს ყველა კუთხიდან</p>
          <button className="px-10 py-4 bg-white text-red-700 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            გახსენი შენი ფესვების რუკა
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ეროვნული ფესვების რუკა</h3>
              <p className="text-slate-400 text-sm">ქართული იდენტობის შენარჩუნება დიასპორაში</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ნავიგაცია</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">მთავარი</a></li>
                <li><a href="#" className="hover:text-white transition">რუკა</a></li>
                <li><a href="#" className="hover:text-white transition">ბიბლიოთეკა</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">საზოგადოება</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">ჩვენს შესახებ</a></li>
                <li><a href="#" className="hover:text-white transition">კონტაქტი</a></li>
                <li><a href="#" className="hover:text-white transition">დახმარება</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">მიგვყევი</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition" aria-label="Facebook">FB</a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition" aria-label="Instagram">IG</a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition" aria-label="YouTube">YT</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 ეროვნული ფესვების რუკა. ყველა უფლება დაცულია.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;