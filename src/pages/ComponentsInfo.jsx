import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

 export default function Components_Info_Section() {

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

