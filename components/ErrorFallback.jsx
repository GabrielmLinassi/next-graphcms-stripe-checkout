export const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <div>Something went wrong ;(</div>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  );
};
