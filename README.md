# Dengue heatmap

## Content

- [Description](#description)
- [How to use](#gameplay)
- [Technologies](#Technologies)
- [MVP](#MVP)

### Description

![sample image of site](https://github.com/Thngkia/SEIF3-Project3-Frontend/blob/main/public/Dengue_heatmap.png)

Click [here](https://dengueheatmapfrontend.herokuapp.com/) for the app!

This is an app that is meant to show where the dengue hotspots are and to notify if you are near a hotspot.

### How to use

The map iteself can be scrolled around to view the hotspots around Singapore. The areas that are red signify a higher risk of dengue while yellow represent moderate risk. If you allow location, there will be a red checkpoint mark of your location.

If you would like to view a different area, there is a search field with an auto complete. When you type in the location, the map will zoom in on it.

There are share options on telegram, whatsapp and email to inform your friends and family of dengue risks. If you would like to get a notification when the risk in your locality is high, you can also sign up and register for a auto notification service.

### Technologies

JavaScript, MongoDB, Express, React, Node.js (MERN)

### MVP

Features:

1. Google Maps API service for map rendering and display of hotspots
2. NEA hotspots data
3. Express and MongoDB backend API for data cleaning and service to Frontend
4. React with node libraries for responsive rendering
5. Basic auth with express
6. Connecting to messaging services to provide notification
