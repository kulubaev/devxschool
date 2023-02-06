#### devxshool.take.home //06.02.23

---

###### description

simple api for saving text content and loading through websocket api.

utilizes some arbitrary `folder structure` inspired by `DDD` and `uncle bobs use cases`

`typescript` is used to facilitate code reuse and organization

---

###### source code

source code is organized via folders, they are pretty much self-explanatory

as `persisten media` ie. database a `local file` will be created at the root. this is intentional just to keep it simple

---

###### how to test

once initial communication estabilished the consequent messaging intent identifed based on message types

```
enum MessageTypes {

  ERRORED,
  UNSPECIFIED,
  LOAD_CONTENT,
  SAVE_CONTENT,
  NEW_CONTENT

}

```

in order to persist the editor content `client` needs to send the message int the form of JSON as following

```
{

  "type": "SAVE_CONTENT",
  "payload": {
     "content": "lorem ipsum"
   }

}


```

everytime content persisted, it will be `broadcasted` to everyone including the `originator client`, thus client

app might load the returned resultcontent. broadcaasted message will be in the following form.

`timestamp` just indicate when it was last updated

```

{
    "type": "NEW_CONTENT",
    "payload": {
        "content": "lorem ipsum",
        "timestamp": "1675680779850"
    }
}


```

once initial connection estabilished it wont automatically send the content the `client app` needs to request it with following message

```

{"type": "LOAD_CONTENT"}


```

---

###### running code

the followings are the three main commands , in order to run code, it needs to be first `compiled` since its in `typescript`

```

  $npm run build

  $npm start


```

optionaly we can run with debugger attached

```

 $npm run inspect



```
