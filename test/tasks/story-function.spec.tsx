import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { runOneStatic } from '../../src/task-runner';
import { StaticResult, StaticTask } from '../../src/types';

const task: StaticTask = {
  taskId: 'task',
  type: 'static',
  description: 'task',
  name: 'task',
  run: async ({ getElement }): Promise<string> => {
    return ReactDOMServer.renderToString(getElement());
  },
};

it('should support story functions that return components (default)', async () => {
  function App() {
    const [count] = useState(0);
    return <div>{count}</div>;
  }

  const result: StaticResult = await runOneStatic({
    task,
    getNode: () => <App />,
    copies: 1,
  });

  expect(result.value).toBe('<div>0</div>');
});

it('should support story functions that have hooks', async () => {
  const result: StaticResult = await runOneStatic({
    task,
    getNode: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [count] = useState(0);
      return <div>{count}</div>;
    },
    copies: 1,
  });

  expect(result.value).toBe('<div>0</div>');
});

it('should support story functions are just components', async () => {
  function App() {
    const [count] = useState(0);
    return <div>{count}</div>;
  }

  const result: StaticResult = await runOneStatic({
    task,
    getNode: App,
    copies: 1,
  });

  expect(result.value).toBe('<div>0</div>');
});

it('should support a story function that returns null', async () => {
  const result: StaticResult = await runOneStatic({
    task,
    getNode: () => null,
    copies: 1,
  });

  expect(result.value).toBe('');
});
