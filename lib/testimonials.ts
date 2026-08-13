export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function formatTestimonialName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return name;

  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Duncan was a huge help here. With his SEO and marketing knowledge, he's been a wealth of information in guiding how we go about being found online. GMB, local seo, and just more general marketing advise as well, he's been able to allow us to blot out the noise that you get overwhelmed with and just focus on the things that move the needle for a local business in the digital marketing realm. Super happy and a fan!",
    name: "Noah Barba",
    role: "Owner · Paint To Life",
  },
  {
    quote:
      "Duncan helped us with an exploratory affiliate marketing project. He was extremely knowledgeable and steered us in the right direction with realistic recommendations that work for our business.",
    name: "Nick Cracraft",
    role: "Marketing Specialist · Winter Park Resort",
  },
];
