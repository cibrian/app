
    function onPhotoURISuccess(imageURI) {
   
      var cbbCode = document.getElementById('cbbCode');

      cbbCode.style.display = 'block';

      cbbCode.src = imageURI;

      alert(imageURI);


    }

    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }