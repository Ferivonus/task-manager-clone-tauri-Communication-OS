import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

 export default function Disks_Info_Section() {

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