FROM node:14-alpine AS development

WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:14-alpine AS production
WORKDIR /app
COPY --from=development /app ./
CMD ["npm", "run", "start:prod"]