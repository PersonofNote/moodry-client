import { Navigate } from 'react-router-dom';

const Analytics = ({user}) => {
  // TODO: Implement roles
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <h2>
      Analytics (Protected: authenticated user with permission
      'admin' required)
    </h2>
  );
};

export default Analytics