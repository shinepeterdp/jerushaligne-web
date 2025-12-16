import { useEffect, useRef, useState } from "react";

const events = [
  {
    title: "Jerush & University of Leicester launch Digital Health Centre in India",
    tag: "Latest Update",
    image: "/images/events/event1.jpeg",
  },
  {
    title: "Jerush dental Conclave 2024",
    tag: "Latest Update",
    image: "/images/events/event1.jpeg",
  },
  {
    title: "Jerush Hospital completes 500 robotic cardiac procedures",
    tag: "Latest Update",
    image: "/images/events/event1.jpeg",
  },
  {
    title: "Jerush achieves 4.5-hour dental treatment window",
    tag: "Latest Update",
    image: "/images/events/event1.jpeg",
  },
];

export default function EventsCarousel() {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    const newIndex = (index + 1) % events.length;
    setIndex(newIndex);
    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * newIndex,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    const newIndex = index === 0 ? events.length - 1 : index - 1;
    setIndex(newIndex);
    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * newIndex,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            What’s New At Jerushaligne
          </h2>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-500 transition">
            Explore More →
          </button>
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth"
          >
            {events.map((event, i) => (
              <div
                key={i}
                className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-3"
              >
                <div className="relative h-[420px] rounded-2xl overflow-hidden group">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end">
                    <span className="text-xs text-white/80 mb-2">
                      {event.tag}
                    </span>
                    <h3 className="text-white text-lg font-semibold leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute right-4 -bottom-12 flex gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-500 flex items-center justify-center hover:bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-500 flex items-center justify-center hover:bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
