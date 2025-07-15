const now = new Date();
const today = now.toISOString().split('T')[0];
const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

document.getElementById('dateInput').value = today;
document.getElementById('timeInput').value = currentTime;
// File upload handling
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('previewImage');
            preview.src = e.target.result;
            preview.style.display = 'block';
            
            // Update upload area
            const uploadArea = document.querySelector('.upload-area');
            uploadArea.style.padding = '24px';
            uploadArea.querySelector('.upload-icon').style.display = 'none';
            uploadArea.querySelector('.upload-text').textContent = 'Foto berhasil diupload';
            uploadArea.querySelector('.upload-subtext').textContent = 'Klik untuk mengganti foto';
        };
        reader.readAsDataURL(file);
    }
}
function handleDragOver(event) {
    event.preventDefault();
    document.querySelector('.upload-area').classList.add('dragover');
}
function handleDragLeave(event) {
    document.querySelector('.upload-area').classList.remove('dragover');
}
function handleDrop(event) {
    event.preventDefault();
    document.querySelector('.upload-area').classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('fileInput').files = files;
        handleFileSelect({ target: { files: files } });
    }
}
// Map marker handling
let markerPosition = null;
function setMarker(event) {
    const mapWidget = document.getElementById('mapWidget');
    const rect = mapWidget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Remove existing marker
    const existingMarker = mapWidget.querySelector('.map-marker');
    if (existingMarker) {
        existingMarker.remove();
    }
    
    // Create new marker
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
    mapWidget.appendChild(marker);
    
    // Convert to coordinates (mock calculation)
    const lat = -6.2 + (y / 300) * 0.1;
    const lng = 106.8 + (x / 300) * 0.1;
    
    markerPosition = { lat, lng };
    
    // Update location info
    document.getElementById('locationInfo').style.display = 'block';
    document.getElementById('coordinates').textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    document.getElementById('address').textContent = 'Jakarta, Indonesia (koordinat perkiraan)';
}
// Quantity controls
function updateQuantity(value) {
    const input = document.getElementById('quantityInput');
    input.value = Math.max(1, Math.min(50, parseInt(value) || 1));
}
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    const currentValue = parseInt(input.value) || 1;
    input.value = Math.min(50, currentValue + 1);
}
function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    const currentValue = parseInt(input.value) || 1;
    input.value = Math.max(1, currentValue - 1);
}
// Form submission
function submitReport() {
    const fileInput = document.getElementById('fileInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const quantityInput = document.getElementById('quantityInput');
    
    // Validation
    if (!fileInput.files.length) {
        alert('Silakan upload foto kucing terlebih dahulu');
        return;
    }
    
    if (!dateInput.value || !timeInput.value) {
        alert('Silakan isi tanggal dan waktu');
        return;
    }
    
    if (!markerPosition) {
        alert('Silakan pilih lokasi pada peta');
        return;
    }
    
    if (!quantityInput.value || quantityInput.value < 1) {
        alert('Silakan masukkan jumlah kucing yang valid');
        return;
    }
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Mengirim laporan...';
    
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = '📝 Kirim Laporan';
        
        // Reset form
        resetForm();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }, 2000);
}
function resetForm() {
    // Reset file input
    document.getElementById('fileInput').value = '';
    document.getElementById('previewImage').style.display = 'none';
    
    // Reset upload area
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.style.padding = '48px 24px';
    uploadArea.querySelector('.upload-icon').style.display = 'block';
    uploadArea.querySelector('.upload-text').textContent = 'Klik untuk upload atau drag & drop gambar';
    uploadArea.querySelector('.upload-subtext').textContent = 'JPG, PNG, atau GIF (maksimal 5MB)';
    
    // Reset date and time to current
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
    document.getElementById('dateInput').value = today;
    document.getElementById('timeInput').value = currentTime;
    
    // Reset map marker
    const existingMarker = document.querySelector('.map-marker');
    if (existingMarker) {
        existingMarker.remove();
    }
    markerPosition = null;
    document.getElementById('locationInfo').style.display = 'none';
    
    // Reset quantity
    document.getElementById('quantityInput').value = '1';
}
