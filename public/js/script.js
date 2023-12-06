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

// LIKE BUTTON
const likeButton = document.querySelector("[button-like]");

if (likeButton) {
  likeButton.addEventListener("click", () => {
    const songID = likeButton.getAttribute("button-like");

    // sử dụng contains để check xem có class tên là active
    // trong button hay không
    const isActive = likeButton.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";

    const link = `/songs/like/${typeLike}/${songID}`;

    // options dành cho fetchAPI
    // để lựa chọn phg thức là PATCH cho bảo mật
    const options = {
      method: "PATCH",
    };
    // dùng API để thay đổi lượt like
    // để ko load lại trang
    fetch(link, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.code === 200) {
          const span = likeButton.querySelector("span");
          span.innerHTML = `${data.like} thích`;
          likeButton.classList.toggle("active");
        }
      });
  });
}
// END LIKE BUTTON

// Favorite BUTTON
const listFavoriteButton = document.querySelectorAll("[button-favorite]");
if (listFavoriteButton.length > 0) {
  listFavoriteButton.forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", () => {
      const idSong = favoriteButton.getAttribute("button-favorite");
      const isFavorite = favoriteButton.classList.contains("active");
      const typeFavorite = isFavorite ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${typeFavorite}/${idSong}`;
      const options = {
        method: "PATCH",
      };

      fetch(link, options)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.code === 200) {
            favoriteButton.classList.toggle("active");
          }
        });
    });
  });
}
// END Favorite BUTTON
