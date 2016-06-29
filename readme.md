### usage


URI to db connection options.

support mysql, mssql, postgresql, sqlite(not tested)

```
let parseUri=require("../dbUri2config");

let config=parseUri("mysql://root@localhost:3306/sakila?encrypt=true&param1=value1");
```