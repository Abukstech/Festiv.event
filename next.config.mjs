/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "img.clerk.com"],
  },

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};

export default nextConfig;
