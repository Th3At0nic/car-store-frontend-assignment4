const testimonials = [
  {
    id: 1,
    name: "Mir Hussain",
    role: "Software Developer",
    avatar:
      "https://res.cloudinary.com/di6pes4mx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741619882/2025010006Rahat.jpg",
    text: "I had a great experience buying my car. The process was simple, and the customer service was excellent!",
  },
  {
    id: 2,
    name: "Rahat Habibi",
    role: "Designer",
    avatar:
      "https://res.cloudinary.com/di6pes4mx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741619882/2025010006Rahat.jpg",
    text: "The car I bought is amazing! The team helped me find the perfect match for my needs. Highly recommend!",
  },
  {
    id: 3,
    name: "Sany Pany",
    role: "Entrepreneur",
    avatar:
      "https://res.cloudinary.com/di6pes4mx/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741619882/2025010006Rahat.jpg",
    text: "Fantastic service, smooth transaction, and a great car. Will definitely return when I'm ready for my next purchase!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonial-header">
        <h2>What Our Customers Say</h2>
        <p>
          Read how we’ve helped our customers with their car buying experience!
        </p>
      </div>

      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="testimonial-cards">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-info">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-name">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
