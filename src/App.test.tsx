import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from './context/AuthContext';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    
    expect(container).toBeTruthy();
  });
});
