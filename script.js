document.addEventListener('DOMContentLoaded', function () {
    const cameraSelect = document.getElementById("camera-select");
    const previewVideo = document.getElementById('preview');
    const statusLight = createStatusLight(); // Cria a luz e a adiciona ao DOM

    let scanner = new Instascan.Scanner({ video: previewVideo });

    scanner.addListener('scan', function (content) {
        alert('QR Code lido: ' + content);

        if (content.startsWith("FC")) {
            alert('Acesso Liberado Aluno');
            setStatusLight('green');
        } else {
            alert('Acesso Negado');
            setStatusLight('red');
        }
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            cameras.forEach(function (camera, index) {
                const option = document.createElement('option');
                option.value = index;
                option.text = camera.name || `Câmera ${index + 1}`;
                cameraSelect.add(option);
            });

            cameraSelect.addEventListener('change', function () {
                const selectedCameraIndex = cameraSelect.value;
                const selectedCamera = cameras[selectedCameraIndex];
                scanner.start(selectedCamera);
            });

            scanner.start(cameras[0]);
        } else {
            console.error('Nenhuma câmera encontrada.');
        }
    }).catch(function (e) {
        console.error(e);
    });

    function createStatusLight() {
        const light = document.createElement('div');
        light.id = 'status-light';
        light.style.width = '20px';
        light.style.height = '20px';
        light.style.borderRadius = '50%';
        light.style.position = 'absolute';
        light.style.top = '10px';
        light.style.left = '10px';
        document.body.appendChild(light);
        return light;
    }

    function setStatusLight(color) {
        statusLight.style.backgroundColor = color;
    }
});
