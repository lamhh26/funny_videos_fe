### Overview

This is a web app for sharing YouTube videos using React and Redux running in Docker.

### Features

1. User registration and login.
2. Sharing YouTube videos.
3. Viewing a list of shared videos (no need to display up/down votes).
4. Real-time notifications for new video shares: When a user shares a new video, other logged-in users should receive a real-time notification about the newly shared video.

### Prerequisites:
- Docker

### Installation & Configuration:

Cloning the repository:

```
git clone git@github.com:lamhh26/funny_videos_fe.git

# Or

git clone https://github.com/lamhh26/funny_videos_fe.git
```

Configuring settings and building:

```
cp .env.example .env
docker compose build

# Build a image from Dockerfile
docker build -f Dockerfile.dev -t funny-videos-fe .
```

#### Running the development application
```
docker compose up -d
```
After that you can see the app at http://localhost:3001.

### Usage

User can register/login a account.

![login-signup](https://github.com/lamhh26/funny_videos_fe/assets/17271336/546730b7-f85d-410f-bbfb-acab960f2cdc)

Both logged in and non logged in users can view the list of shared videos. The video list is designed with infinite scrolling.

![infinite_scroll](https://github.com/lamhh26/funny_videos_fe/assets/17271336/de020691-3048-4db3-b358-6bcd65aaf0b1)

Only logged in users can share videos. After sharing, other logged in users will receive a notification

![noti](https://github.com/lamhh26/funny_videos_fe/assets/17271336/3d880d4a-0c66-48e6-829e-b47607e1c125)

### Troubleshooting

Because when executing `docker compose run` and `docker run` we specify fixed container names so the error like `The container name "[CONTAINER_NAME]" is already in use by container ` may occur. Then we need to stop and delete the previously existing container.

```
docker stop [CONTAINER_NAME]
docker rm [CONTAINER_NAME]
```
