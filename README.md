# Usedeall

Backend Developer Candidate Test Usedeall.

### Installation with docker-compose (Recommended)

```bash
git clone https://github.com/wildanicardi/backend-usedeall.git
cd backend-usedeall
docker-compose up -d
```


### Installation (Manually)

#### Requirements

* You need mongodb installed and running on your computer. or alternatively you can use docker

* copy the contents of the file `.env.example` and create a new file with the name `.env`,,

```bash
git clone https://github.com/wildanicardi/backend-usedeall.git
cd backend-usedeall
npm install
```

Mode Production

```javascript
npm run start
```

Mode Development

```javascript
npm run watch
```

## API Endpoints

### Login

- Path : ` /api/auth/login`
- Method : `POST`
- Response : ` 200`
- Field : `email, password `

### Register

- Path : ` /api/auth/register`
- Method : `POST`
- Field : `firstName,lastName,username, email, password `
- Response : ` 200`

### Detail Profile User Login

- Path : ` /api/auth/me`
- Method : `GET`
- Response : ` 200`
- Authentication : `Bearer Token`

### Update Profile User Login

- Path : ` /api/auth/profile`
- Method : `POST`
- Response : ` 200`
- Field : `firstName,lastName,username, email`
- Authentication : `Bearer Token`

## Documentation Link

[POSTMAN](https://documenter.getpostman.com/view/6225373/UzQuPRJp)
