import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Dashboard from './Dashboard';
import { vi } from 'vitest';

describe('Dashboard Page', () => {
  it('renders dashboard title and summary cards', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard onLogout={vi.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Z-Coffe-Hening Dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pemasukan Harian/i)).toBeInTheDocument();
    expect(await screen.findByText(/Transaksi Bulanan/i)).toBeInTheDocument();
  });
});
