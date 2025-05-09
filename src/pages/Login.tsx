import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Divider, 
  Alert,
  Space
} from 'antd';
import { UserOutlined, LockOutlined, DatabaseOutlined } from '@ant-design/icons';
import './Login.css';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    // Si ya está autenticado, redirigir al inicio
    if (localStorage.getItem('isAuthenticated')) {
      navigate('/');
    }
  }, [navigate]);


  const onFinish = async (values: any) => {
    setLoading(true);
    setError('');
    
    try {
      if (values.username === 'admin' && values.password === 'admin') {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');
        // Force a small delay to ensure state is set
        await new Promise(resolve => setTimeout(resolve, 100));
        // Navigate to orders page
        navigate('/orders', { replace: true });
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <DatabaseOutlined className="login-logo" />
          <Title level={2}>SIGOT</Title>
          <Text type="secondary">Sistema de Gestión de Órdenes de Trabajo</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="login-alert"
          />
        )}

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Usuario" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;