# HLS Embed

This project is a web application designed to simplify the process of embedding an HLS (HTTP Live Streaming) video player using an iframe. The player is built with Video.js and supports playback of `.m3u8` files.

## Features

- Playback of HLS videos (.m3u8) in an iframe.
- Support for autoplay, mute, loop, and volume adjustment.
- Automatic detection of the browser's native capability to play HLS.
- Smooth quality switching during playback.

## How to Use

1. Simply replace `URL_OF_HLS_FILE` with the URL of your HLS file.

   ```html
   <iframe src="https://francomartino.github.io/hls-embed/?url=URL_OF_HLS_FILE&autoplay=true" allowfullscreen></iframe>
   ```

2. Change the parameters
    - url: The URL of the HLS file (.m3u8) you want to play.
    - autoplay: If set to "true", the video will start playing automatically.
    - muted: If set to "true", the video will start muted.
    - loop: If set to "true", the video will loop.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.