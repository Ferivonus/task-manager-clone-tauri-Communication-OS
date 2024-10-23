import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function Lain_Profile() {
  return (
    <img
      src="https://images3.alphacoders.com/581/581398.jpg"
      alt="Katherine Johnson"
      className="lain-profile-img"
// Black and white effect
    />
  );
}


function System_Info_Section() {

  const [systemInfo, setSystemInfo] =  useState([]);

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = async () => {
    const info = await invoke("get_system_info");
    setSystemInfo(info);
  };
  

  return (
<section className="info-section">
        <h2>System Info</h2>
        {systemInfo ? (
          <div className="info-card">
            <p><strong>Total Memory:</strong> {systemInfo.total_memory} bytes</p>
            <p><strong>Used Memory:</strong> {systemInfo.used_memory} bytes</p>
            <p><strong>System Name:</strong> {systemInfo.system_name}</p>
            <p><strong>Kernel Version:</strong> {systemInfo.kernel_version}</p>
            <p><strong>OS Version:</strong> {systemInfo.os_version}</p>
            <p><strong>Host Name:</strong> {systemInfo.host_name}</p>
            <p><strong>CPU Count:</strong> {systemInfo.cpu_count}</p>
          </div>
        ) : (
          <p>Loading system info...</p>
        )}
      </section>
  );
}

function Disks_Info_Section() {

  const [disksInfo, setDisksInfo] =  useState([]);

  useEffect(() => {
    fetchDisksInfo();
  }, []);

  const fetchDisksInfo = async () => {
    const disks = await invoke("get_disks_info");
    setDisksInfo(disks);
  };


  return (
<section className="info-section">
        <h2>Disks Info</h2>
        {disksInfo.length > 0 ? (
          <ul>
            {disksInfo.map((disk, index) => (
              <li key={index} className="info-card">
                <p><strong>{disk.name}:</strong> {disk.available_space} / {disk.total_space} bytes</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading disks info...</p>
        )}
      </section>

  );
}

function Network_Info_Section() {

  const [networkInfo, setNetworkInfo] =  useState([]);

  useEffect(() => {
    fetchNetworkInfo();
  }, []);
  
  const fetchNetworkInfo = async () => {
    const networks = await invoke("get_network_info");
    setNetworkInfo(networks);
  };

  return (

 <section className="info-section">
        <h2>Network Info</h2>
        {networkInfo.length > 0 ? (
          <ul>
            {networkInfo.map((network, index) => (
              <li key={index} className="info-card">
                <p><strong>{network.name}:</strong> {network.total_received} bytes received / {network.total_transmitted} bytes transmitted</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading network info...</p>
        )}
      </section>
  );
}

function Components_Info_Section() {

  const [componentsInfo, setComponentsInfo] =  useState([]);

  useEffect(() => {
    fetchComponentsInfo();
  }, []);
  
  const fetchComponentsInfo = async () => {
    const components = await invoke("get_components_info");
    setComponentsInfo(components);
  };

  return (
    
<section className="info-section">
        <h2>Components Info</h2>
        {componentsInfo.length > 0 ? (
          <ul>
            {componentsInfo.map((component, index) => (
              <li key={index} className="info-card">
                <p><strong>{component.name}:</strong> {component.temperature}°C</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading components info...</p>
        )}
      </section>
  );
}

function CPU_Usage_Section() {

  const [cpuUsage, setCpuUsage] =  useState([]);

  useEffect(() => {
    fetchCpuUsage();
  }, []);
  
  const fetchCpuUsage = async () => {
    const usage = await invoke("get_cpu_usage");
    setCpuUsage(usage);
  };

  return (

<section className="info-section">
        <h2>CPU Usage</h2>
        {cpuUsage.length > 0 ? (
          <div className="cpu-usage">
            {cpuUsage.map((usage, index) => (
              <span key={index} className="cpu-bar">
                CPU {index + 1}: {usage.toFixed(2)}%
              </span>
            ))}
          </div>
        ) : (
          <p>Loading CPU usage...</p>
        )}
      </section>
  );
}

function Process_Info_Section() {

  const [processInfo, setProcessInfo] =  useState([]);

  useEffect(() => {
    fetchProcessInfo();
  }, []);
  
  const fetchProcessInfo = async () => {
    const processes = await invoke("get_process_info"); 
    setProcessInfo(processes); 
  };

  return (
<section className="info-section">
        <h2>Process Info</h2>
        {processInfo.length > 0 ? (
          <ul>
            {processInfo.map((process, index) => (
              <li key={index} className="info-card">
                <p><strong>PID:</strong> {process.pid}</p>
                <p><strong>Name:</strong> {process.name}</p>
                <p><strong>Written Bytes:</strong> {process.total_written_bytes} bytes</p>
                <p><strong>Read Bytes:</strong> {process.total_read_bytes} bytes</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading process info...</p>
        )}
      </section>

  );
}

function App() {

  return (

    <div className="container">
       <Lain_Profile />

      <h1>System Monitoring Dashboard</h1>

      {/* System Info Section */}
      <System_Info_Section />

      {/* Disks Info Section */}
      <Disks_Info_Section />

      {/* Network Info Section */}
      <Network_Info_Section />

      {/* Components Info Section */}
       <Components_Info_Section />

      {/* CPU Usage Section */}
      <CPU_Usage_Section />

      {/* Process Info Section */}
      <Process_Info_Section />
    </div>
  );
}

export default App;
