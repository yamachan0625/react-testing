import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import MockServer from './MockServer';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Mocking API', () => {
  it('[Fetch success] Should display fetched data correctly and button disable', async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    // 非推奨？
    // expect(await screen.findByRole('heading')).toHaveTextContent('Bred dummy');
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
    // 属性が付与されているかチェック
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('[Fetch failure] Should display error message, no render heading and button abled', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Fetching Failed !'
    );
    expect(screen.queryByRole('heading')).toBeNull();
    // 属性が付与されているかチェック
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
