export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
    tag?: string
  }>;
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
];
