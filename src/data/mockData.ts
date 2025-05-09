import { WorkOrder } from '../types/WorkOrder';

export const workOrders: WorkOrder[] = [
  {
    id: 61,
    establishment: 'BUIN',
    status: 'EN EJECUCIÓN',
    creationDate: '2015-08-22 09:15:34.616608-03',
    etr: '2015-08-24 21:00:00-03',
    assignedTo: 'Juan Pérez'
  },
  {
    id: 63,
    establishment: 'RANCAGUA',
    status: 'EN EJECUCIÓN',
    creationDate: '2015-08-22 12:45:18.705548-03',
    etr: '2015-08-26 05:30:00-03',
    assignedTo: 'María López'
  },
  {
    id: 65,
    establishment: 'RANCAGUA',
    status: 'ASIGNADA',
    creationDate: '2015-08-22 12:51:23.436231-03',
    etr: '2015-08-25 14:30:00-03',
    assignedTo: 'Carlos Rodríguez'
  },
  {
    id: 67,
    establishment: 'RANCAGUA',
    status: 'EN EJECUCIÓN',
    creationDate: '2015-08-22 12:52:42.236669-03',
    etr: '2015-08-22 00:45:00-03',
    assignedTo: 'Ana Silva'
  },
  {
    id: 68,
    establishment: 'RANCAGUA',
    status: 'EN EJECUCIÓN',
    creationDate: '2015-08-22 12:54:11.174607-03',
    etr: '',
    assignedTo: 'Pablo Martínez'
  },
  {
    id: 69,
    establishment: 'RANCAGUA',
    status: 'ASIGNADA',
    creationDate: '2015-08-22 12:54:17.946734-03',
    etr: '',
    assignedTo: 'Laura González'
  },
  {
    id: 71,
    establishment: 'RANCAGUA',
    status: 'ASIGNADA',
    creationDate: '2015-08-22 12:56:53.521749-03',
    etr: '',
    assignedTo: 'Diego Hernández'
  },
  {
    id: 72,
    establishment: 'RANCAGUA',
    status: 'PENDIENTE',
    creationDate: '2015-08-22 12:57:33.811357-03',
    etr: '',
    assignedTo: ''
  }
];

export const establishments = [
  'BUIN',
  'RANCAGUA',
  'SANTIAGO',
  'VALPARAÍSO',
  'CONCEPCIÓN'
];

export const statuses = [
  'EN EJECUCIÓN',
  'ASIGNADA',
  'PENDIENTE',
  'COMPLETADA',
  'CANCELADA'
];