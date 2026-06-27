import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Admin — ProductStore',
  description: 'Panel de administración de productos',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
