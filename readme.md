# Hypeddit DownloadWallBypasser 2k24

## Description:
This user script, named Hypeddit DownloadWallBypasser 2k24, is designed to bypass download gates on Hypeddit tracks. It automates the process of navigating through fangates that require interactions with various social media platforms like SoundCloud and Spotify, allowing users to download tracks without fulfilling these requirements manually.

## Mandatory:
To use this script effectively, users must ensure the following:
- **Soundcloud and Spotify accounts**: Users must be logged into their SoundCloud and Spotify accounts before running the script to bypass the fangates successfully.

## Usage:
This script can be used on Hypeddit's website to bypass download gates encountered when attempting to download tracks. It targets specific URLs related to Hypeddit tracks and SoundCloud login pages, ensuring seamless navigation through the download process.

## Installation:
1. Download the repository from https://github.dev/malakutska/hypeddit-downloadwall-bypasser-reloaded.
2. Unpack the contents.
3. Go to "Extensions" in Chrome settings.
4. Load the unpacked folder.
5. Visit a Hypeddit track page and let the script automatically bypass the download gates.

**Note**: Always exercise caution when running userscripts from unknown sources.

## FAQ

Q: Can't pass the email validation step
A: Please setup another email with a *valid* domain. That domain could be anything, it just needs to exists.

Q: I don't want to end up with accounts full of spam (Spotify, Soundcloud). Is there a workaround?
A: You could create "dummy"-accounts for the services. That way it doesn't matter that it reposts, comments, follows or even creates playlists.

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
```

## Disclaimer
This script relays  heavily on HTML-elements like divs, classes and ids. When the webbuilder changes the page it could break this script. So please be aware of that. Some elements of the script are borrowed. But mostly is created from ground up with vanilla JS. I kind of got inspired by a snippet that was created by Zuko which provided a [userscript](https://gist.github.com/tansautn/d6abfbfcff5d7eb44fdb83f5abc89383) that would autoclick the Soundcloud part.
