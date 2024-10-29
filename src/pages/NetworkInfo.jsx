import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function Network_Info_Section() {

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