import React from "react";
import { Link } from "react-router-dom";

export default function MainNavigasyon() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/system-info">System Info</Link></li>
        <li><Link to="/disks-info">Disks Info</Link></li>
        <li><Link to="/network-info">Network Info</Link></li>
        <li><Link to="/components-info">Components Info</Link></li>
        <li><Link to="/cpu-usage">CPU Usage</Link></li>
        <li><Link to="/process-info">Process Info</Link></li>
      </ul>
    </nav>
  );
}

