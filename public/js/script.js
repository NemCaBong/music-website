// APLAYER
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  // data được gửi vào att của thẻ html sẽ là
  // 1 chuỗi json
  let dataSong = aplayer.getAttribute("data-song");
  let dataSinger = aplayer.getAttribute("data-singer");
  // chuyển về dạng object trong JS
  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
    volume: 0.8,
  });

  const innerAvatar = document.querySelector(".song-detail .inner-avatar");

  ap.on("play", function () {
    innerAvatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    innerAvatar.style.animationPlayState = "paused";
  });
}

// END APLAYER
