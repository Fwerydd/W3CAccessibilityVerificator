<h1 align="center">Welcome to W3CAccessibilityVerificator 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="src/doc/swagger.json" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-brightgreen.svg" />
  </a>
</p>

> Allows users via an API to check against the Web Content Accessibility Guidelines published by the Web Accessibility Initiative of the World Wide Web Consortium

## Install

```sh
npm install
```

## Configuration

Before using the usage section, you have to:
- Go to the src/config folder
- Rename or move the .env_example file to .env
- Fill the .env with your environmental variables values

```sh
cd src/config
mv .env_example .env
```


## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Run coverage

```sh
npm run coverage
```

## Generate Swagger documentation

```sh
npm run generate_doc
```

## API

The API to this app is described below.

### Documentation

#### Request

```sh
GET /doc
  curl -i -H 'Accept: application/json' http://localhost:ENV.PORT/doc
```

##### Response

Documentation served by [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).

#### Verify text contrast

#### Request

```sh
GET /api/wcag/text
  http://localhost:ENV.PORT/api/wcag/text?wcag_version=2.0&background_color=%23fff&text_bold=false&text_color=%23f70707&text_size=18
```

##### Response
```sh
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: close
Content-Type: application/json
Content-Length: 2

{
  "wcagVersion": "2.0",
  "value": 21,
  "minimum": true,
  "enhanced": false,
  "isLargeText": false
}
```

#### Verify texts contrasts in a website

#### Request

```sh
GET /api/wcag/url
  http://localhost:ENV.PORT/api/wcag/url?wcag_version=2.0&website_url=http://www.google.fr&webdriver_url=http://localhost:4444/wd/hub
```

##### Response
```sh
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2011 12:36:30 GMT
Status: 200 OK
Connection: close
Content-Type: application/json
Content-Length: 2

[
  {
    "contrasts": [
      {
        "wcagVersion": "2.0",
        "value": 21,
        "minimum": true,
        "enhanced": true,
        "isLargeText": false
      }
    ],
    "textBackgroundColor": "#FFF",
    "textColor": "#000",
    "textSize": 12,
    "textBold": false
  }
]
```

## Author

👤 **Fwerydd**

* Github: [@Fwerydd](https://github.com/Fwerydd)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_