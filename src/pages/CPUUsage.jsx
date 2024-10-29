import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function CPU_Usage_Section() {

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

