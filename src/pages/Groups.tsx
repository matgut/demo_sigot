import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Row, 
  Col, 
  Typography,
  Divider,
  Tag,
  Tooltip,
  Modal,
  Form,
  Select,
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import './Groups.css';

const { Title } = Typography;
const { Option } = Select;

interface Group {
  id: number;
  networkHierarchy: string;
  address: string;
  description: string;
  reporter: string;
  reportDate: string;
  claimsCount?: number; // Optional field for claims count
}

interface Claim {
  id: string;
  clientId: string;
  postNumber: string;
  establishment: string;
  address: string;
  date: string;
}

const mockGroups: Group[] = [
  {
    id: 160,
    networkHierarchy: 'SUBESTACION(26518)',
    address: 'SIN CALLE 0',
    description: 'RECLAMO INGR...',
    reporter: 'MABEL RIOS PE...',
    reportDate: '2015-08-22 10:00:00'
  },
  {
    id: 152,
    networkHierarchy: 'SUBESTACION(10535)',
    address: 'AV LA VICTORI...',
    description: 'RECLAMO INGR...',
    reporter: 'ILUSTRE MUNC...',
    reportDate: '2015-08-22 10:15:00'
  },
  {
    id: 213,
    networkHierarchy: 'CLIENTE(G2059974)',
    address: 'AQUILES 0',
    description: 'RECLAMO INGR...',
    reporter: 'YOLANDA RUBI...',
    reportDate: '2015-08-22 10:30:00'
  }
];

const mockClaims: Claim[] = [
  {
    id: '2015-08-01215',
    clientId: 'G1526877',
    postNumber: '140060',
    establishment: 'RANCAGUA',
    address: 'CA NUEVA 0',
    date: '2015-08-01'
  },
  {
    id: '2015-08-01216',
    clientId: 'G1526878',
    postNumber: '140061',
    establishment: 'BUIN',
    address: 'AV PRINCIPAL 123',
    date: '2015-08-01'
  },
  {
    id: '2015-08-01217',
    clientId: 'G1526879',
    postNumber: '140062',
    establishment: 'SANTIAGO',
    address: 'ALAMEDA 1000',
    date: '2015-08-01'
  }
];

const Groups: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Group[]>(mockGroups);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [claimsModalVisible, setClaimsModalVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const columns: ColumnsType<Group> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Jerarquía de Red',
      dataIndex: 'networkHierarchy',
      key: 'networkHierarchy',
      sorter: (a, b) => a.networkHierarchy.localeCompare(b.networkHierarchy),
    },
    {
      title: 'Dirección Rec. Cabl',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Descripción Rec. Cl',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Informante Rec. Cl',
      dataIndex: 'reporter',
      key: 'reporter',
    },
    {
      title: 'Fecha Rec. Cabec',
      dataIndex: 'reportDate',
      key: 'reportDate',
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
      sorter: (a, b) => dayjs(a.reportDate).unix() - dayjs(b.reportDate).unix(),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
        <Tooltip title="Ver Reclamos">
          <Badge count={record.claimsCount} offset={[-5, 0]}>
            <Button 
              type="primary" 
              icon={<FileTextOutlined />} 
              size="small"
              onClick={() => {
                setSelectedGroupId(record.id);
                setClaimsModalVisible(true);
              }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title="Asociar OT">
          <Button type="primary" icon={<LinkOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Editar">
          <Button type="default" icon={<EditOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Eliminar">
          <Button type="default" danger icon={<DeleteOutlined />} size="small" />
        </Tooltip>
      </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setLoading(true);
    const searchLower = value.toLowerCase();
    const filtered = mockGroups.filter(group => 
      group.id.toString().includes(searchLower) ||
      group.networkHierarchy.toLowerCase().includes(searchLower) ||
      group.description.toLowerCase().includes(searchLower)
    );
    setTimeout(() => {
      setData(filtered);
      setLoading(false);
    }, 300);
  };

  const handleCreateGroup = (values: any) => {
    console.log('Create group:', values);
    setCreateModalVisible(false);
    form.resetFields();
  };

  const claimsColumns: ColumnsType<Claim> = [
    {
      title: 'Nro. Reclamo',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ID Cliente',
      dataIndex: 'clientId',
      key: 'clientId',
    },
    {
      title: 'Placa Poste',
      dataIndex: 'postNumber',
      key: 'postNumber',
    },
    {
      title: 'Establecimiento',
      dataIndex: 'establishment',
      key: 'establishment',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
  ];

  const selectedGroup = mockGroups.find(g => g.id === selectedGroupId);

  return (
    <div className="groups-container">
      <Card className="groups-card">
        <Row justify="space-between" align="middle" className="card-header">
          <Col>
            <Title level={4}>Agrupaciones</Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              Crear Agrupación
            </Button>
          </Col>
        </Row>
        
        <Divider style={{ margin: '16px 0' }} />
        
        <Row gutter={[16, 16]} className="filter-row">
          <Col xs={24} md={8}>
            <Input.Search
              placeholder="Buscar por ID, Jerarquía, Descripción..."
              onSearch={handleSearch}
              allowClear
              enterButton
            />
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
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} agrupaciones`,
          }}
          className="groups-table"
        />
      </Card>

      <Modal
        title="Crear Nueva Agrupación"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setCreateModalVisible(false);
            form.resetFields();
          }}>
            Cancelar
          </Button>,
          <Button 
            key="submit" 
            type="primary"
            onClick={() => form.submit()}
          >
            Crear
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateGroup}
        >
          <Form.Item
            name="networkHierarchy"
            label="Jerarquía de Red"
            rules={[{ required: true, message: 'Por favor ingrese la jerarquía de red' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Dirección"
            rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Reclamos de Agrupación ${selectedGroup?.networkHierarchy || ''}`}
        open={claimsModalVisible}
        onCancel={() => setClaimsModalVisible(false)}
        width={1000}
        footer={[
          <Button key="close" type="primary" onClick={() => setClaimsModalVisible(false)}>
            Cerrar
          </Button>
        ]}
      >
        <Table
          columns={claimsColumns}
          dataSource={mockClaims}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} reclamos`,
          }}
          className="claims-table"
        />
      </Modal>
    </div>
  );
};

export default Groups;