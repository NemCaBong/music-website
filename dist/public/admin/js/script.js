// Preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End preview image.

// Preview audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");

  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const audio = URL.createObjectURL(file);
      const source = uploadAudioPlay.querySelector("source");
      source.src = audio;

      // khác với file image
      // file audio cần phải gọi đến hàm load để load file
      uploadAudioPlay.load();
    }
  });
}
// End preview audio
