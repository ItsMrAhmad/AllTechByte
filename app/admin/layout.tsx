import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog Admin Portal | All Tech Byte',
  description: 'Manage and publish products directly to GitHub for All Tech Byte.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
