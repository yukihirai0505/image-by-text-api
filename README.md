## Requirements

- node v8.10.0
- cloudinary -> https://cloudinary.com//documentation/node_integration

## Deploy

```
$ now secret add cloudinary-url "your-cloudinary-url"
$ now .
```

## Local Development

```
$ mv .env.sample .env
$ vi .env # edit environment variables
$ yarn start
```

try 

```
(async () => {
    const response = await fetch('http://localhost:3000/api/upload.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "hello",
        body:  "world"
      })
    })
    console.log(response.json())
})()
```