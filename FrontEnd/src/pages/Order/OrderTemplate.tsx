// src/pages/Order/OrderTemplate.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const OrderTemplate: React.FC = () => {
    return (
        <div>
            <h1>Order Management</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="list">All Orders</Link>
                    </li>
                    <li>
                        <Link to="ready_to_ship">Ready to Ship</Link>
                    </li>
                    <li>
                        <Link to="new-shipment">New Shipment</Link>
                    </li>
                </ul>
            </nav>
            {/* Render the matched child route */}
            <Outlet />
        </div>
    );
};

export default OrderTemplate;
