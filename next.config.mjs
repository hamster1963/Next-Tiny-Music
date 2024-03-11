import createMDX from "@next/mdx";
import { recmaPlugins } from "./src/mdx/recma.mjs";
import { rehypePlugins } from "./src/mdx/rehype.mjs";
import { remarkPlugins } from "./src/mdx/remark.mjs";
import withSearch from "./src/mdx/search.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.raw\.mdx$/,
      use: 'raw-loader',
    });
    return config;
  },
};

const withMDX = createMDX({
  extension: /^(?!.*\.raw\.mdx$).*\.mdx$/,
  options: {
    recmaPlugins,
    remarkPlugins,
    rehypePlugins,
  },
});

export default withSearch(withMDX(nextConfig));
