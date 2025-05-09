import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Descriptions, 
  Tabs, 
  Button, 
  Space, 
  Tag, 
  Timeline, 
  Empty, 
  Spin, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  HistoryOutlined,
  FileTextOutlined,
  TeamOutlined,
  CommentOutlined,
  SendOutlined,
  UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { WorkOrder } from '../types/WorkOrder';
import { workOrders } from '../data/mockData';
import { statusColors } from '../theme';
import './WorkOrderDetail.css';
import StatusTags from '../components/StatusTags';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const WorkOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const order = workOrders.find(wo => wo.id === Number(id)) || null;
      setWorkOrder(order);
      setLoading(false);
      
      if (order) {
        editForm.setFieldsValue({
          establishment: order.establishment,
          status: order.status,
          assignedTo: order.assignedTo,
          etr: order.etr ? dayjs(order.etr) : null,
          description: order.description || '',
        });
      }
    }, 800);
  }, [id]);
  
  const handleEditSubmit = (values: any) => {
    console.log('Edit form submitted:', values);
    // In a real app, this would update the work order
    setEditModalVisible(false);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Cargando orden de trabajo...</p>
      </div>
    );
  }
  
  if (!workOrder) {
    return (
      <Empty 
        description="Orden de trabajo no encontrada" 
        className="not-found"
      >
        <Button type="primary" onClick={() => navigate('/orders')}>
          Volver a Órdenes
        </Button>
      </Empty>
    );
  }

  // Mock timeline events
  const timelineEvents = [
    {
      time: dayjs(workOrder.creationDate).format('DD/MM/YYYY HH:mm'),
      title: 'Orden creada',
      user: 'Sistema',
      color: 'blue',
    },
    {
      time: dayjs(workOrder.creationDate).add(1, 'hour').format('DD/MM/YYYY HH:mm'),
      title: 'Orden asignada',
      user: 'Juan Supervisor',
      color: 'orange',
    },
    {
      time: dayjs(workOrder.creationDate).add(2, 'hour').format('DD/MM/YYYY HH:mm'),
      title: 'Técnico en camino',
      user: workOrder.assignedTo,
      color: 'green',
    },
  ];
  
  return (
    <div className="work-order-detail">
      <div className="detail-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/orders')}
          className="back-button"
        >
          Volver
        </Button>
        <Title level={4}>Orden de Trabajo #{workOrder.id}</Title>
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditModalVisible(true)}
          >
            Editar
          </Button>
          {workOrder.status !== 'COMPLETADA' && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              style={{ backgroundColor: statusColors['COMPLETADA'] }}
            >
              Completar
            </Button>
          )}
          {workOrder.status !== 'CANCELADA' && workOrder.status !== 'COMPLETADA' && (
            <Button
              danger
              icon={<CloseCircleOutlined />}
            >
              Cancelar
            </Button>
          )}
        </Space>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="detail-card main-info">
            <Descriptions 
              title="Información General" 
              bordered 
              column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Nro. Orden">{workOrder.id}</Descriptions.Item>
              <Descriptions.Item label="Establecimiento">{workOrder.establishment}</Descriptions.Item>
              <Descriptions.Item label="Estado">
               <StatusTags status={workOrder.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Fecha Creación">
                {dayjs(workOrder.creationDate).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="ETR">
                {workOrder.etr ? dayjs(workOrder.etr).format('DD/MM/YYYY HH:mm') : 'No establecido'}
              </Descriptions.Item>
              <Descriptions.Item label="Asignado a">
                {workOrder.assignedTo || 'No asignado'}
              </Descriptions.Item>
              <Descriptions.Item label="Descripción" span={3}>
                {workOrder.description || 'Sin descripción'}
              </Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <Tabs defaultActiveKey="detalle" className="detail-tabs">
              <TabPane 
                tab={<span><FileTextOutlined />Detalle</span>} 
                key="detalle"
              >
                <div className="tab-content">
                  <Paragraph>
                    Esta orden de trabajo corresponde a una solicitud de mantenimiento
                    para el establecimiento {workOrder.establishment}. 
                  </Paragraph>
                  <Paragraph>
                    <Text strong>Detalles específicos:</Text>
                  </Paragraph>
                  <ul>
                    <li>Tipo de mantenimiento: Correctivo</li>
                    <li>Prioridad: Media</li>
                    <li>Área: Sala de Operaciones</li>
                    <li>Equipo: Bomba de Infusión</li>
                  </ul>
                </div>
              </TabPane>
              
              <TabPane 
                tab={<span><TeamOutlined />Agrupaciones</span>} 
                key="agrupaciones"
              >
                <div className="tab-content">
                  <Empty description="No hay agrupaciones disponibles" />
                </div>
              </TabPane>
              
              <TabPane 
                tab={<span><CommentOutlined />Reclamos</span>} 
                key="reclamos"
              >
                <div className="tab-content">
                  <Empty description="No hay reclamos asociados" />
                </div>
              </TabPane>
              
              <TabPane 
                tab={<span><UserOutlined />Informe Cuadrilla</span>} 
                key="informe"
              >
                <div className="tab-content">
                  <Form layout="vertical">
                    <Form.Item label="Observaciones">
                      <TextArea rows={4} placeholder="Ingrese observaciones..." />
                    </Form.Item>
                    <Form.Item label="Estado de la revisión">
                      <Select defaultValue="pendiente">
                        <Select.Option value="pendiente">Pendiente</Select.Option>
                        <Select.Option value="completado">Completado</Select.Option>
                        <Select.Option value="requiere-repuestos">Requiere repuestos</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" icon={<SendOutlined />}>
                        Enviar Informe
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={<span><HistoryOutlined /> Historial</span>} 
            className="detail-card history-card"
          >
            <Timeline mode="left">
              {timelineEvents.map((event, index) => (
                <Timeline.Item 
                  key={index} 
                  color={event.color}
                  label={event.time}
                >
                  <p className="event-title">{event.title}</p>
                  <p className="event-user">Por: {event.user}</p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
      
      <Modal
        title="Editar Orden de Trabajo"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => editForm.submit()}
          >
            Guardar Cambios
          </Button>,
        ]}
        width={700}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="establishment" 
                label="Establecimiento"
                rules={[{ required: true, message: 'Ingrese el establecimiento' }]}
              >
                <Select>
                  <Select.Option value="BUIN">BUIN</Select.Option>
                  <Select.Option value="RANCAGUA">RANCAGUA</Select.Option>
                  <Select.Option value="SANTIAGO">SANTIAGO</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="status" 
                label="Estado"
                rules={[{ required: true, message: 'Seleccione el estado' }]}
              >
                <Select>
                  <Select.Option value="PENDIENTE">PENDIENTE</Select.Option>
                  <Select.Option value="ASIGNADA">ASIGNADA</Select.Option>
                  <Select.Option value="EN EJECUCIÓN">EN EJECUCIÓN</Select.Option>
                  <Select.Option value="COMPLETADA">COMPLETADA</Select.Option>
                  <Select.Option value="CANCELADA">CANCELADA</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="assignedTo" 
                label="Asignado a"
              >
                <Input placeholder="Nombre del técnico" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="etr" 
                label="ETR (Tiempo estimado de resolución)"
              >
                <DatePicker 
                  showTime 
                  format="DD/MM/YYYY HH:mm" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item 
            name="description" 
            label="Descripción"
          >
            <TextArea rows={4} placeholder="Descripción detallada de la orden..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkOrderDetail;