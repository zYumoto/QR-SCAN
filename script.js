document.addEventListener('DOMContentLoaded', function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        alert('QR Code lido: ' + content);
        // Aqui você pode fazer o que quiser com o conteúdo do QR code
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('Nenhuma câmera encontrada.');
        }
    }).catch(function (e) {
        console.error(e);
    });
});
