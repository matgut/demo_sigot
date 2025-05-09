import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    borderRadius: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Table: {
      headerBg: '#fafafa',
      headerSplitColor: '#f0f0f0',
      rowHoverBg: '#fafafa',
      borderColor: '#f0f0f0',
    },
    Layout: {
      headerBg: '#fff',
      siderBg: '#001529',
    },
    Card: {
      colorBorderSecondary: '#f0f0f0',
    },
    Badge: {
      colorBgContainer: '#fff',
    },
  },
};

// Status color mapping
export const statusColors = {
  'EN EJECUCIÓN': '#1890ff', // Blue for in execution
  'ASIGNADA': '#faad14',    // Orange for assigned
  'PENDIENTE': '#595959',   // Dark grey for pending
  'COMPLETADA': '#52c41a',  // Green for completed
  'CANCELADA': '#f5222d',   // Red for cancelled
};

// Status tag type mapping for Ant Design
export const statusTypes: Record<string, 'default' | 'success' | 'processing' | 'error' | 'warning'> = {
  'EN EJECUCIÓN': 'processing',
  'ASIGNADA': 'warning',
  'PENDIENTE': 'default',
  'COMPLETADA': 'success',
  'CANCELADA': 'error',
};