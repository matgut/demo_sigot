import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileTextOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'logout':
        localStorage.removeItem('isAuthenticated');
        navigate('/login', { replace: true });
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate(`/${key}`);
        break;
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Mi Perfil',
      onClick: () => handleMenuClick('profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar Sesión',
      onClick: () => handleMenuClick('logout'),
    },
  ];

  return (
    <Layout className="main-layout" style={{ backgroundColor: '#222222' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        width={240}
        breakpoint="lg"
        collapsedWidth={80}
      >
        <div className="logo">
          {collapsed ? 'SIGOT' : 'SIGOT'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split('/')[1] || '']}
          items={[
            {
              key: '',
              icon: <HomeOutlined />,
              label: 'Inicio',
              onClick: () => navigate('/'),
            },
            {
              key: 'orders',
              icon: <FileTextOutlined />,
              label: 'Órdenes de Trabajo',
              onClick: () => navigate('/orders'),
            },
            {
              key: 'groups',
              icon: <AppstoreOutlined />,
              label: 'Agrupaciones',
              onClick: () => navigate('/groups'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="site-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            className="trigger-button"
            size="large"
          />
          <div className="header-right">
            <Dropdown 
              menu={{ items: userMenuItems }} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Space className="user-dropdown">
                <Avatar icon={<UserOutlined />} />
                <span className="username">cgutierm</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className="site-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;