document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models')
  ]).then(startVideo);

  function startVideo() {
    // Acessando o elemento 'video' após o DOM ser carregado
    const video = document.getElementById('video');
    if (!video) {
      console.error('Elemento de vídeo não encontrado!');
      return;
    }

    // Obter dispositivos de mídia e filtrar pela câmera
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // Verificar se a câmera 1 está disponível
        if (videoDevices.length > 1) {
          const camera1 = videoDevices[1]; // A câmera 1 (geralmente a câmera traseira)
          const constraints = {
            video: { deviceId: camera1.deviceId }
          };

          // Iniciar o acesso à câmera 1
          navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
              video.srcObject = stream;
            })
            .catch(err => console.error('Erro ao acessar a câmera 1: ', err));
        } else {
          console.log('Câmera 1 não encontrada. Usando a câmera padrão.');
          // Caso não tenha a câmera 1, utiliza a câmera padrão
          navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => {
              video.srcObject = stream;
            })
            .catch(err => console.error('Erro ao acessar a câmera padrão: ', err));
        }
      })
      .catch(err => console.error('Erro ao listar dispositivos de mídia: ', err));

    // Quando o vídeo começar a reproduzir, cria o canvas e começa a detecção
    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      // Detecção e desenho a cada segundo
      setInterval(async () => {
        // Detectando os rostos e expressões faciais
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 160,  // Tamanho da entrada da imagem (menor valor = mais rápido, mas menos preciso)
          scoreThreshold: 0.5  // Limite de confiança para detectar um rosto (valor maior = mais preciso, mas mais lento)
        }))
          .withFaceLandmarks()
          .withFaceExpressions();        

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detections.length > 0 && detections[0].expressions) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "local_name": "joaquim",
            "created_at": "2021-07-09T20:48:09.859650Z",
            "irritado": detections[0].expressions.angry,
            "desgostoso": detections[0].expressions.disgusted,
            "medo": detections[0].expressions.fearful,
            "feliz": detections[0].expressions.happy,
            "neutro": detections[0].expressions.neutral,
            "triste": detections[0].expressions.sad,
            "surpreso": detections[0].expressions.surprised

          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch("http://127.0.0.1:8000/facial/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
      }, 1000);
    });
  }
});
