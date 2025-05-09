import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que buscas no existe."
      extra={
        <Button type="primary" onClick={() => navigate('/orders')}>
          Volver al Dashboard
        </Button>
      }
    />
  );
};

export default NotFound;