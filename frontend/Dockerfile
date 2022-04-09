FROM node:14 as build
WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./

CMD npm run build


FROM nginx
COPY --from=build /front/build /usr/share/nginx/html
