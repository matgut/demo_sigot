export interface WorkOrder {
  id: number;
  establishment: string;
  status: 'EN EJECUCIÓN' | 'ASIGNADA' | 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA';
  creationDate: string;
  etr: string; // Estimated Time Resolution
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
}

export interface WorkOrderFilter {
  establishment?: string;
  status?: string;
  dateRange?: [string, string];
  searchText?: string;
}