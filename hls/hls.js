(function () {
  const getUrlParams = () => {
    return new URLSearchParams(window.location.search);
  };

  const supportsNativeHls = () => {
    const video = document.createElement("video");
    return video.canPlayType("application/vnd.apple.mpegurl") !== "";
  };

  const initPlayer = () => {
    const params = getUrlParams();
    const player = videojs("videoPlayer", {
      techOrder: ["html5"],
      html5: {
        hls: {
          overrideNative: !supportsNativeHls(),
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          useBandwidthFromLocalStorage: true,
        },
      },
      autoplay: params.get("autoplay") === "true",
      muted:
        params.get("muted") === "true" || params.get("autoplay") === "true",
      loop: params.get("loop") === "true",
      volume: parseFloat(params.get("volume")) || 1,
    });

    const sourceUrl = params.get("url");
    if (sourceUrl) {
      player.src({
        src: sourceUrl,
        type: sourceUrl.includes(".m3u8")
          ? "application/x-mpegURL"
          : "video/mp4",
      });
    }

    player.on("error", (error) => {
      console.error("Error del reproductor:", error);
      player.errorDisplay.show();
    });

    player.ready(() => {
      player.qualityLevels();
    });

    let wasPaused = false;
    player.on("pause", () => {
      wasPaused = true;
    });

    player.on("play", () => {
      if (wasPaused && player.liveTracker && player.liveTracker.seekableEnd()) {
        player.currentTime(player.liveTracker.seekableEnd());
      }
      wasPaused = false;
    });

    player.on("loadeddata", () => {
      const qualityLevels = player.qualityLevels();
      qualityLevels.on("change", () => {
        const selectedQuality = qualityLevels.selectedIndex();
        console.log(`Calidad seleccionada: ${selectedQuality}`);
      });
    });
  };

  if (document.readyState === "complete") {
    initPlayer();
  } else {
    document.addEventListener("DOMContentLoaded", initPlayer);
  }
})();
