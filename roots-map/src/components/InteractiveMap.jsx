import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Filter, X, Calendar, Heart, Share2, ZoomIn, ZoomOut } from 'lucide-react';

const InteractiveMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const initAttemptRef = useRef(0);
  
  const [selectedStory, setSelectedStory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    generation: 'all',
    country: 'all',
    category: 'all'
  });

  const mockStories = [
    {
      id: 1,
      title: "ჩემი ბებიის სახლი სვანეთში",
      description: "აქ გავიზარდე და ვისწავლე ქართული ტრადიციები. ყოველ ზაფხულს ვბრუნდებოდი ამ სახლში.",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
      author: "ნინო გელაშვილი",
      location: "მესტია, სვანეთი",
      lat: 43.0442,
      lng: 42.7289,
      country: "საქართველო",
      generation: "1990s",
      category: "ოჯახი",
      date: "1985-2000",
      likes: 124
    },
    {
      id: 2,
      title: "დიასპორის ცხოვრება ლონდონში",
      description: "30 წელია ვცხოვრობ ლონდონში, მაგრამ ჩემი გული თბილისშია. ყოველდღე ვამზადებ ქართულ კერძებს.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
      author: "გიორგი მამულაშვილი",
      location: "ლონდონი",
      lat: 51.5074,
      lng: -0.1278,
      country: "დიდი ბრიტანეთი",
      generation: "1980s",
      category: "დიასპორა",
      date: "1993-დღემდე",
      likes: 89
    },
    {
      id: 3,
      title: "ბათუმის ძველი ქალაქი",
      description: "ჩემი ბაბუა აქ ჰქონდა პატარა დუქანი. მახსოვს ზღვის სუნი და ციტრუსის ხეები.",
      image: "https://images.unsplash.com/photo-1590050225473-60b89f82d5ab?w=400&h=300&fit=crop",
      author: "ანა ხუციშვილი",
      location: "ბათუმი, აჭარა",
      lat: 41.6168,
      lng: 41.6367,
      country: "საქართველო",
      generation: "2000s",
      category: "ისტორია",
      date: "1960-1990",
      likes: 156
    },
    {
      id: 4,
      title: "მცხეთა - ჩემი სულიერი სახლი",
      description: "სვეტიცხოველი ყოველთვის იყო ჩემი ოჯახის საკურთხეველი. აქ დავბრუნდი ემიგრაციის შემდეგ.",
      image: "https://images.unsplash.com/photo-1590229991827-63872fa23f24?w=400&h=300&fit=crop",
      author: "დავით ყიფიანი",
      location: "მცხეთა",
      lat: 41.8431,
      lng: 44.7209,
      country: "საქართველო",
      generation: "1970s",
      category: "რელიგია",
      date: "1950-2024",
      likes: 203
    },
    {
      id: 5,
      title: "ქართული ენის შენარჩუნება დუბლინში",
      description: "ჩემს შვილებს ვასწავლი ქართულს. ყოველ კვირას ვკითხულობთ ქართულ ზღაპრებს.",
      image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=400&h=300&fit=crop",
      author: "ეკა მეგრელიშვილი",
      location: "დუბლინი",
      lat: 53.3498,
      lng: -6.2603,
      country: "ირლანდია",
      generation: "2010s",
      category: "ენა",
      date: "2015-დღემდე",
      likes: 92
    },
    {
      id: 6,
      title: "ქუთაისის ბაზარი",
      description: "ყველაზე დილით ბაბუასთან ვდიოდი ბაზარში. აქ ვსწავლობდი ქართულ ენას და ტრადიციებს.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      author: "ლაშა კვარაცხელია",
      location: "ქუთაისი, იმერეთი",
      lat: 42.2679,
      lng: 42.6988,
      country: "საქართველო",
      generation: "2000s",
      category: "ტრადიციები",
      date: "2005-2020",
      likes: 78
    }
  ];

  const filterOptions = {
    generation: [
      { value: 'all', label: 'ყველა თაობა' },
      { value: '1970s', label: '1970-იანი' },
      { value: '1980s', label: '1980-იანი' },
      { value: '1990s', label: '1990-იანი' },
      { value: '2000s', label: '2000-იანი' },
      { value: '2010s', label: '2010-იანი' }
    ],
    country: [
      { value: 'all', label: 'ყველა ქვეყანა' },
      { value: 'საქართველო', label: '🇬🇪 საქართველო' },
      { value: 'დიდი ბრიტანეთი', label: '🇬🇧 დიდი ბრიტანეთი' },
      { value: 'ირლანდია', label: '🇮🇪 ირლანდია' }
    ],
    category: [
      { value: 'all', label: 'ყველა კატეგორია' },
      { value: 'ოჯახი', label: '👨‍👩‍👧‍👦 ოჯახი' },
      { value: 'დიასპორა', label: '🌍 დიასპორა' },
      { value: 'ისტორია', label: '📚 ისტორია' },
      { value: 'რელიგია', label: '⛪ რელიგია' },
      { value: 'ენა', label: '🗣️ ენა' },
      { value: 'ტრადიციები', label: '🎭 ტრადიციები' }
    ]
  };

  const filteredStories = mockStories.filter(story => {
    const matchesGeneration = activeFilters.generation === 'all' || story.generation === activeFilters.generation;
    const matchesCountry = activeFilters.country === 'all' || story.country === activeFilters.country;
    const matchesCategory = activeFilters.category === 'all' || story.category === activeFilters.category;
    const matchesSearch = searchQuery === '' || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGeneration && matchesCountry && matchesCategory && matchesSearch;
  });

  // Initialize map with retry logic
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      
      const L = window.L;
      if (!L) {
        if (initAttemptRef.current < 20) {
          initAttemptRef.current++;
          setTimeout(initMap, 500);
        }
        return;
      }

      try {
        const map = L.map(mapRef.current, {
          zoomControl: false,
          scrollWheelZoom: true,
          dragging: true,
          touchZoom: true
        }).setView([42.3154, 43.3569], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19
        }).addTo(map);

        mapInstanceRef.current = map;
        setMapReady(true);

        setTimeout(() => {
          map.invalidateSize();
        }, 200);
      } catch (error) {
        console.error('Map init error:', error);
      }
    };

    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    const L = window.L;
    if (!L) return;

    const map = mapInstanceRef.current;

    markersRef.current.forEach(marker => {
      try {
        marker.remove();
      } catch (e) {
        console.log('Marker removal error');
      }
    });
    markersRef.current = [];

    const customIcon = (color) => L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, ${color}, ${color}dd);
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="transform: rotate(45deg); font-size: 18px;">📍</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    filteredStories.forEach(story => {
      try {
        const color = story.country === 'საქართველო' ? '#8B0000' : '#DAA520';
        const marker = L.marker([story.lat, story.lng], {
          icon: customIcon(color)
        })
          .addTo(map)
          .on('click', () => {
            setSelectedStory(story);
            map.flyTo([story.lat, story.lng], 10, {
              duration: 1.5
            });
          });

        markersRef.current.push(marker);
      } catch (e) {
        console.log('Marker creation error:', e);
      }
    });

    if (filteredStories.length > 0) {
      try {
        const bounds = L.latLngBounds(filteredStories.map(s => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      } catch (e) {
        console.log('Bounds error');
      }
    }
  }, [filteredStories, mapReady]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      generation: 'all',
      country: 'all',
      category: 'all'
    });
    setSearchQuery('');
  };

  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const activeFilterCount = Object.values(activeFilters).filter(v => v !== 'all').length;

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin=""></script>

      <div className="h-screen flex flex-col bg-slate-50">
        <header className="bg-white shadow-md z-20 relative">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  ე
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">ფესვების რუკა</h1>
                  <p className="text-xs text-slate-600">{filteredStories.length} ისტორია</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                + დაამატე შენი ისტორია
              </button>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ძიება ლოკაციის, სათაურის ან აღწერის მიხედვით..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                  showFilters ? 'bg-red-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-red-500'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>ფილტრები</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">თაობა</label>
                    <select
                      value={activeFilters.generation}
                      onChange={(e) => handleFilterChange('generation', e.target.value)}
                      className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none"
                    >
                      {filterOptions.generation.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ქვეყანა</label>
                    <select
                      value={activeFilters.country}
                      onChange={(e) => handleFilterChange('country', e.target.value)}
                      className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none"
                    >
                      {filterOptions.country.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">კატეგორია</label>
                    <select
                      value={activeFilters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none"
                    >
                      {filterOptions.category.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                >
                  ფილტრების გასუფთავება
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 relative">
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-700 font-semibold">რუკა იტვირთება...</p>
                <p className="text-slate-500 text-sm mt-2">თუ რუკა არ ჩანს, განაახლეთ გვერდი</p>
              </div>
            </div>
          )}

          <div ref={mapRef} className="w-full h-full bg-slate-200" />

          {mapReady && (
            <>
              <div className="absolute right-6 top-6 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                <button
                  onClick={zoomIn}
                  className="block p-3 hover:bg-slate-50 transition-colors border-b border-slate-200"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5 text-slate-700" />
                </button>
                <button
                  onClick={zoomOut}
                  className="block p-3 hover:bg-slate-50 transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              {selectedStory && (
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-slideUp">
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors z-10"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-700" />
                  </button>

                  <img
                    src={selectedStory.image}
                    alt={selectedStory.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 pr-8">{selectedStory.title}</h3>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedStory.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedStory.date}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 leading-relaxed">{selectedStory.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedStory.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{selectedStory.author}</div>
                          <div className="text-xs text-slate-600">{selectedStory.country}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-semibold">{selectedStory.likes}</span>
                        </button>
                        <button className="text-slate-600 hover:text-slate-700 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        {selectedStory.category}
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                        {selectedStory.generation}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {filteredStories.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md pointer-events-auto">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">ისტორიები ვერ მოიძებნა</h3>
                    <p className="text-slate-600 mb-4">შეცვალეთ საძიებო კრიტერიუმები ან ფილტრები</p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      ფილტრების გასუფთავება
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          .leaflet-container {
            font-family: inherit;
            height: 100%;
            width: 100%;
            background: #e2e8f0;
          }
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default InteractiveMap;