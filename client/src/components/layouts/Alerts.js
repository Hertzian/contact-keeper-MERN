import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
        // this looks in the state, if there are some, loop them and output the alerts
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        ))
    )
}
