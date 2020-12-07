import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import UseEffectRender from './useEffectRender';

describe('useEffet rendering', () => {
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
