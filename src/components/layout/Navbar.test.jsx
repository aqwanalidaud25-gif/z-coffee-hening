import { describe, it, expect, vi } from 'vitest';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { AuthProvider } from '../../context/AuthContext';

const renderNavbar = (props = {}) => {
  return render(
    <AuthProvider>
      <Navbar onMenuClick={vi.fn()} onLogout={vi.fn()} {...props} />
    </AuthProvider>
  );
};

describe('Navbar Component', () => {
  it('renders navbar with logo', () => {
    renderNavbar();
    const logo = screen.getByAltText('Logo Z Coffee Hening');
    expect(logo).toBeInTheDocument();
  });

  it('renders menu button on mobile', () => {
    renderNavbar();
    expect(screen.getByRole('button', { name: /Buka menu/i })).toBeInTheDocument();
  });

  it('renders notification button', () => {
    renderNavbar();
    expect(screen.getByRole('button', { name: /Notifikasi/i })).toBeInTheDocument();
  });

  it('renders profile button', () => {
    renderNavbar();
    expect(screen.getByRole('button', { name: /Profil pengguna/i })).toBeInTheDocument();
  });

  it('displays user name from context', () => {
    renderNavbar();
    expect(screen.getByText(/Admin Kasir/i)).toBeInTheDocument();
  });

  it('calls onMenuClick when menu button is clicked', async () => {
    const handleMenuClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <AuthProvider>
        <Navbar onMenuClick={handleMenuClick} onLogout={vi.fn()} />
      </AuthProvider>
    );

    const menuBtn = screen.getByRole('button', { name: /Buka menu/i });
    await user.click(menuBtn);
    
    expect(handleMenuClick).toHaveBeenCalled();
  });

  it('opens notification panel when button is clicked', async () => {
    const user = userEvent.setup();
    renderNavbar();

    const notifBtn = screen.getByRole('button', { name: /Notifikasi/i });
    await user.click(notifBtn);

    expect(screen.getByText(/Notifikasi/i)).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText(/Cari transaksi/i);
    expect(searchInput).toBeInTheDocument();
  });
});
