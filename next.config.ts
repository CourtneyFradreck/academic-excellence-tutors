import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/pages/about-us.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/pages/academy.html",
        destination: "/subjects",
        permanent: true,
      },
      {
        source: "/pages/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/forms/registration.html",
        destination: "/enrol",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
