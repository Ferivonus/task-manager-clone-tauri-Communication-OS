use serde::Serialize;
use sysinfo::{Components, Disks, Networks, System};
use tauri::Manager;

#[derive(Serialize, Debug)]
struct SystemInfo {
    total_memory: u64,
    used_memory: u64,
    total_swap: u64,
    used_swap: u64,
    system_name: String,
    kernel_version: String,
    os_version: String,
    host_name: String,
    cpu_count: usize,
}

#[derive(Serialize, Debug)]
struct NetworkInfo {
    name: String,
    total_received: u64,
    total_transmitted: u64,
}

#[derive(Serialize, Debug)]
struct ComponentInfo {
    name: String,
    temperature: f32,
}

#[derive(Serialize, Debug)]
struct DiskInfo {
    name: String,
    file_system: String,
    kind: String,
    is_removable: String,
    mount_point: String,
    total_space: u64,
    available_space: u64,
}

#[tauri::command]
fn get_system_info() -> SystemInfo {
    let mut sys = System::new_all();
    sys.refresh_all();

    SystemInfo {
        total_memory: sys.total_memory(),
        used_memory: sys.used_memory(),
        total_swap: sys.total_swap(),
        used_swap: sys.used_swap(),
        system_name: sysinfo::System::name().unwrap_or("Unknown".into()),
        kernel_version: sysinfo::System::kernel_version().unwrap_or("Unknown".into()),
        os_version: sysinfo::System::os_version().unwrap_or("Unknown".into()),
        host_name: sysinfo::System::host_name().unwrap_or("Unknown".into()),
        cpu_count: sys.cpus().len(),
    }
}

#[tauri::command]
fn get_network_info() -> Vec<NetworkInfo> {
    let networks = Networks::new_with_refreshed_list(); // Yeni ve güncellenmiş ağ listesi al

    // Ağ arayüzü bilgilerini topluyoruz
    networks
        .iter()
        .map(|(interface_name, data)| NetworkInfo {
            name: interface_name.clone(),
            total_received: data.total_received(), // Toplam indirilen veri miktarı
            total_transmitted: data.total_transmitted(), // Toplam yüklenen veri miktarı
        })
        .collect() // Sonuçları bir vektörde topluyoruz
}

#[tauri::command]
fn get_components_info() -> Vec<ComponentInfo> {
    // Components listesini al ve güncelle
    let components = Components::new_with_refreshed_list();

    if components.is_empty() {
        println!("No components found!");
        Vec::new() // Eğer bileşen yoksa boş bir vektör döndür
    } else {
        // Her bir bileşen için bilgileri al ve topla
        components
            .iter()
            .map(|component| ComponentInfo {
                name: component.label().to_string(),  // Bileşen adı
                temperature: component.temperature(), // Sıcaklık bilgisi
            })
            .collect() // Sonuçları bir vektörde topluyoruz
    }
}

#[tauri::command]
fn get_cpu_usage() -> Vec<f32> {
    let mut sys = System::new_with_specifics(
        sysinfo::RefreshKind::new().with_cpu(sysinfo::CpuRefreshKind::everything()),
    );
    // Wait a bit because CPU usage is based on diff.
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    // Refresh CPUs again to get actual value.
    sys.refresh_cpu_all();

    // CPU'ların kullanım yüzdelerini topluyoruz.
    sys.cpus().iter().map(|cpu| cpu.cpu_usage()).collect()
}

#[tauri::command]
fn get_disks_info() -> Vec<DiskInfo> {
    let disks = Disks::new_with_refreshed_list(); // Diskleri yenile

    disks
        .iter()
        .map(|disk| {
            let name = disk.name().to_string_lossy().into_owned();
            let file_system = disk.file_system().to_string_lossy().into_owned();
            let kind = format!("{:?}", disk.kind());
            let is_removable = if disk.is_removable() {
                "yes".to_string()
            } else {
                "no".to_string()
            };
            let mount_point = disk.mount_point().display().to_string();
            let total_space = disk.total_space();
            let available_space = disk.available_space();

            DiskInfo {
                name,
                file_system,
                kind,
                is_removable,
                mount_point,
                total_space,
                available_space,
            }
        })
        .collect()
}

#[derive(serde::Serialize)]
struct ProcessInfo {
    pid: u32,
    name: String,
    total_written_bytes: u64,
    total_read_bytes: u64,
}

#[tauri::command]
fn get_process_info() -> Vec<ProcessInfo> {
    let mut sys = System::new_all();
    sys.refresh_all(); // Refresh all system info including processes

    // Collect process info along with disk usage
    sys.processes()
        .iter()
        .map(|(pid, process)| {
            let disk_usage = process.disk_usage(); // Get disk usage info

            ProcessInfo {
                pid: pid.as_u32(),                                   // Convert Pid to u32
                name: process.name().to_string_lossy().into_owned(), // Process name
                total_written_bytes: disk_usage.total_written_bytes, // Total written bytes
                total_read_bytes: disk_usage.total_read_bytes,       // Total read bytes
            }
        })
        .collect() // Collect into a Vec<ProcessInfo>
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // Add your Tauri commands here, for example:
            get_disks_info,      // Example command we discussed
            get_network_info,    // Another command
            get_components_info, // And another
            get_cpu_usage,
            get_system_info,
            get_process_info,
        ])
        .setup(|app| {
            // Additional setup can be done here
            let main_window = app.get_webview_window("main").unwrap();
            main_window
                .set_title("System Monitoring Dashboard")
                .unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
