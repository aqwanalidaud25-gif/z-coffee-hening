import { describe, it, expect, vi, beforeEach } from 'vitest';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email and password input fields', () => {
    renderLogin();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /Masuk ke Dashboard/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email');
    const submitBtn = screen.getByRole('button', { name: /Masuk/i });

    await user.clear(emailInput);
    await user.type(emailInput, 'invalid-email');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Masukkan email yang valid/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for short password', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitBtn = screen.getByRole('button', { name: /Masuk/i });

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'short');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/minimal 6 karakter/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderLogin();

    const toggleBtn = screen.getByRole('button', { name: /Toggle password/i });
    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('shows demo credentials hint', () => {
    renderLogin();
    expect(screen.getByText(/admin@zcoffee.id/)).toBeInTheDocument();
    expect(screen.getByText(/caffee123!@#/)).toBeInTheDocument();
  });
});
