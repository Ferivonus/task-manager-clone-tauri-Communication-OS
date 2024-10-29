import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function Process_Info_Section() {

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