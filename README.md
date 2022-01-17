# Cloud Photoframe

This is a basic website showing photos either:

- from the `./photos` directory.
- from a google photos album url (e.g. `https://photos.app.goo.gl/foo`)

If using a directory, you can look at [rclone](https://rclone.org/) to mount a cloud provider as a filesytem, such as Dropbox.

You can set certain options by passing the following query parameters:

- `albumUrl`: Only used and mandatory when not using local files.
- `interval`: Interval to change to the next picture in milliseconds.
- `shuffle`: If present, shuffle the pictures instead of showing chronologically.

## Sources

- [Google Photos scraping code from Balena](https://github.com/balenablocks/photo-gallery/blob/master/server.js)
- <a href="https://stocksnap.io/photo/sky-stars-QKLA2F9TKK">Loading photo source</a> by <a href="https://stocksnap.io/author/eberhardgross">eberhard grossgasteiger</a> on <a href="https://stocksnap.io">StockSnap</a>
