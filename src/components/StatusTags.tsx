import React from 'react'

interface StatusTagProps{
    status: string;
}

const StatusTags: React.FC<StatusTagProps> = ({status}) => {
    const getStatusClass = () => {
        switch (status.toLowerCase()) {
          case 'en ejecución':
            return 'status-execution';
          case 'pendiente':
            return 'status-pending';
          case 'completado':
            return 'status-completed';
          case 'cancelado':
            return 'status-cancelled';
          default:
            return 'status-pending';
        }
      };

   return (
    <div className={`status-tag ${getStatusClass()}`}>
      {status}
    </div>
  );
};


export default StatusTags;