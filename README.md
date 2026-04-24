# Monitoring Sidebar

## Startup

```shell
npm i
npm run dev
```

## Description

This project allows tracking vehicles as well as their statuses.

By clicking a vehicle's title or its pin on the map, the pin will be centered on the map, and the corresponding record in the sidebar will be highlighted.
![Object selection](images/selection.png)

By applying filters, non-matching entries from the sidebar and pins on the map will be hidden, showing only relevant entries.

![Filters](images/filters.png)

## Architecture

- **Pinia** holds the mocked JSON data, tracks the currently selected object, and manages the filter/sort states.
- **OpenLayers** renders the map with an OpenStreetMap (OSM) layer. It handles displaying markers, applying visual state changes based on connection status, and smoothly animating the view to selected coordinates.
- **Vue I18n** manages English (`en`) and Ukrainian (`uk`) translations. This data is persistently stored between sessions using local storage.

## What I would improve with more time

- Replace the static JSON mock data with a WebSocket.
- Data Validation (after adding a backend)
- Implement marker clustering in OpenLayers to prevent overlapping.
- Virtual list for the sidebar if there are too many entries.
- Dark theme.
