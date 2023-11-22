const cameraSelect = document.getElementById("camera-select");

document.addEventListener('DOMContentLoaded', function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        alert('QR Code lido: ' + content);
        // Aqui você pode fazer o que quiser com o conteúdo do QR code
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            // Preenche as opções da caixa de seleção com as câmeras disponíveis
            cameras.forEach(function (camera, index) {
                const option = document.createElement('option');
                option.value = index;
                option.text = camera.name || `Câmera ${index + 1}`;
                cameraSelect.add(option);
            });

            // Adiciona um evento de mudança à caixa de seleção
            cameraSelect.addEventListener('change', function () {
                const selectedCameraIndex = cameraSelect.value;
                const selectedCamera = cameras[selectedCameraIndex];
                scanner.start(selectedCamera);
            });

            // Inicia o scanner usando a primeira câmera por padrão
            scanner.start(cameras[0]);
        } else {
            console.error('Nenhuma câmera encontrada.');
        }
    }).catch(function (e) {
        console.error(e);
    });
});
