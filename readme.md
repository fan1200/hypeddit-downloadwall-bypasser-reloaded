# Hypeddit DownloadWallBypasser 2k24

## Description:
This user script, named Hypeddit DownloadWallBypasser 2k24, is designed to bypass download gates on Hypeddit tracks. It automates the process of navigating through fangates that require interactions with various social media platforms like SoundCloud and Spotify, allowing users to download tracks without fulfilling these requirements manually.

## Mandatory:
To use this script effectively, users must ensure the following:
- **Soundcloud and Spotify accounts**: Users must be logged into their SoundCloud and Spotify accounts before running the script to bypass the fangates successfully.

## Usage:
This script can be used on Hypeddit's website to bypass download gates encountered when attempting to download tracks. It targets specific URLs related to Hypeddit tracks and SoundCloud login pages, ensuring seamless navigation through the download process.

## Installation:
1. Install a userscript manager extension like Tampermonkey for your browser.
2. Create a new userscript.
3. Copy and paste the script code provided above into the userscript editor.
4. Save the script, ensuring that it is enabled.
5. Visit a Hypeddit track page and let the script automatically bypass the download gates.

**Note**: Always exercise caution when running userscripts from unknown sources.


## Configuration:
The script utilizes the `hypedditSettings` object to customize certain parameters. Users can configure these settings according to their preferences:
- `email`: Set your email address.
- `name`: Set your name.
- `comment`: Set the comment to be posted (e.g., "Nice one bruva!").
- `auto_close`: Set to `true` if you want the window to close automatically after a certain timeout.
- `auto_close_timeout_in_ms`: Set the timeout duration in milliseconds for the window to close automatically.

### Configuring `hypedditSettings`:
```javascript
window.hypedditSettings = {
    email: 'your_email@example.com',
    name: 'Your Name',
    comment: 'Your standard comment',
    auto_close: true,
    auto_close_timeout_in_ms: 5000
};