import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function System_Info_Section() {

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
