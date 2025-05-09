import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Table, 
  Tag, 
  Button, 
  Space, 
  Input, 
  DatePicker, 
  Select, 
  Row, 
  Col, 
  Tooltip, 
  Popconfirm,
  Typography,
  Statistic,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  SendOutlined,
  CloseCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { WorkOrder, WorkOrderFilter } from '../types/WorkOrder';
import { workOrders, establishments, statuses } from '../data/mockData';
import { statusColors, statusTypes } from '../theme';
import './Dashboard.css';
import StatusTags from '../components/StatusTags';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WorkOrder[]>(workOrders);
  const [filter, setFilter] = useState<WorkOrderFilter>({});
  
  const handleViewWorkOrder = (id: number) => {
    navigate(`/orders/${id}`);
  };

  const handleFilterChange = (key: keyof WorkOrderFilter, value: any) => {
    setFilter({ ...filter, [key]: value });
  };

  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      let filteredData = [...workOrders];
      
      if (filter.establishment) {
        filteredData = filteredData.filter(order => 
          order.establishment === filter.establishment);
      }
      
      if (filter.status) {
        filteredData = filteredData.filter(order => 
          order.status === filter.status);
      }
      
      if (filter.searchText) {
        const searchLower = filter.searchText.toLowerCase();
        filteredData = filteredData.filter(order => 
          order.id.toString().includes(searchLower) || 
          order.establishment.toLowerCase().includes(searchLower) ||
          (order.assignedTo && order.assignedTo.toLowerCase().includes(searchLower))
        );
      }
      
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  const resetFilters = () => {
    setFilter({});
    setData(workOrders);
  };

  const columns: ColumnsType<WorkOrder> = [
    {
      title: 'Nro. Orden',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Establecimiento',
      dataIndex: 'establishment',
      key: 'establishment',
      sorter: (a, b) => a.establishment.localeCompare(b.establishment),
      filters: establishments.map(est => ({ text: est, value: est })),
      onFilter: (value, record) => record.establishment === value,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
       <StatusTags status={status} />
      ),
      filters: statuses.map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      sorter: (a, b) => dayjs(a.creationDate).unix() - dayjs(b.creationDate).unix(),
    },
    {
      title: 'ETR',
      dataIndex: 'etr',
      key: 'etr',
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
      sorter: (a, b) => {
        if (!a.etr) return 1;
        if (!b.etr) return -1;
        return dayjs(a.etr).unix() - dayjs(b.etr).unix();
      },
    },
    {
      title: 'Asignado a',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo) => assignedTo || '-',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'PENDIENTE' && (
            <Tooltip title="Despachar OT">
              <Button type="primary" icon={<SendOutlined />} size="small" />
            </Tooltip>
          )}
          
          {record.status === 'EN EJECUCIÓN' && (
            <Tooltip title="Confirmar Llegada">
              <Button type="default" icon={<CheckCircleOutlined />} size="small" />
            </Tooltip>
          )}
          
          {(record.status === 'ASIGNADA' || record.status === 'EN EJECUCIÓN') && (
            <Tooltip title="Ingresar ETR">
              <Button type="default" icon={<ClockCircleOutlined />} size="small" />
            </Tooltip>
          )}
          
          {record.status !== 'COMPLETADA' && record.status !== 'CANCELADA' && (
            <Tooltip title="Editar Informe">
              <Button type="default" icon={<EditOutlined />} size="small" />
            </Tooltip>
          )}
          
          {record.status !== 'COMPLETADA' && record.status !== 'CANCELADA' && (
            <Tooltip title="Cerrar Orden">
              <Popconfirm
                title="¿Está seguro de cerrar esta orden?"
                onConfirm={() => console.log('Cerrar orden', record.id)}
                okText="Sí"
                cancelText="No"
              >
                <Button type="default" danger icon={<CloseCircleOutlined />} size="small" />
              </Popconfirm>
            </Tooltip>
          )}
          
          <Tooltip title="Ver Detalle">
            <Button 
              type="default" 
              icon={<EyeOutlined />} 
              size="small" 
              onClick={() => handleViewWorkOrder(record.id)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Calculate statistics
  const pendingCount = workOrders.filter(wo => wo.status === 'PENDIENTE').length;
  const inProgressCount = workOrders.filter(wo => wo.status === 'EN EJECUCIÓN').length;
  const assignedCount = workOrders.filter(wo => wo.status === 'ASIGNADA').length;

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
            <Statistic 
              title="Órdenes Pendientes" 
              value={pendingCount} 
              valueStyle={{ color: statusColors['PENDIENTE'] }}
              prefix={<ClockCircleOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
            <Statistic 
              title="En Ejecución" 
              value={inProgressCount} 
              valueStyle={{ color: statusColors['EN EJECUCIÓN'] }}
              prefix={<SendOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
            <Statistic 
              title="Asignadas" 
              value={assignedCount} 
              valueStyle={{ color: statusColors['ASIGNADA'] }}
              prefix={<CheckCircleOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      <Card className="orders-card">
        <Row justify="space-between" align="middle" className="card-header">
          <Col>
            <Title level={4} style={{ margin: 0 }}>Órdenes de Trabajo</Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
            >
              Nueva Orden
            </Button>
          </Col>
        </Row>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <Row gutter={[16, 16]} className="filter-row">
          <Col xs={24} md={6}>
            <Input 
              placeholder="Buscar por Nro, Establecimiento..." 
              prefix={<SearchOutlined />} 
              value={filter.searchText}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Establecimiento"
              style={{ width: '100%' }}
              value={filter.establishment}
              onChange={(value) => handleFilterChange('establishment', value)}
              allowClear
            >
              {establishments.map(est => (
                <Option key={est} value={est}>{est}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Estado"
              style={{ width: '100%' }}
              value={filter.status}
              onChange={(value) => handleFilterChange('status', value)}
              allowClear
            >
              {statuses.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Space>
              <Button 
                type="primary" 
                icon={<FilterOutlined />} 
                onClick={applyFilters}
              >
                Filtrar
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={resetFilters}
              >
                Limpiar
              </Button>
            </Space>
          </Col>
        </Row>

        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} órdenes`,
          }}
          className="orders-table"
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;