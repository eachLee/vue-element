FROM harbor.centaline.com.cn/app/nginx:1.12.1-centa

LABEL maintainer="mady1@centaline.com.cn"

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/html/