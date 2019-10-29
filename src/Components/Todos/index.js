import React from 'react';
import TodoItem from '../TodoItem';
import { compose } from 'recompose';

const withMaybe = conditionalRenderingFn => Component => props =>
  conditionalRenderingFn(props) ? null : <Component {...props} />;

const withEither = (
  conditionalRenderingFn,
  EitherComponent
) => Component => props =>
  conditionalRenderingFn(props) ? (
    <EitherComponent />
  ) : (
    <Component {...props} />
  );

const EmptyMessage = () => (
  <div>
    <p>You have no Todos.</p>
  </div>
);

const LoadingIndicator = () => (
  <div>
    <p>Loading todos ...</p>
  </div>
);

const isLoadingConditionFn = props => props.isLoadingTodos;
const nullConditionFn = props => !props.todos;
const isEmptyConditionFn = props => !props.todos.length;

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn),
  withEither(isEmptyConditionFn, EmptyMessage)
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);

function Todos(props) {
  return (
    <TodoListWithConditionalRendering
      todos={props.todos}
      isLoadingTodos={props.isLoadingTodos}
    />
  );
}

function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </div>
  );
}

export default Todos;
