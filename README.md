# es6format.js
String formatting that replicates the ES6 template operator but executes at runtime.

## INSTALLATION

```bash
	npm install es6format
```

## USAGE

```javascript
	const format = require( "es6format" );
	console.log(
		format( "Hello, ${0}!", "World" )
	);
	// output: Hello, World!

	format.bindTo( String, 'using' );
	console.log(
		"Hello, ${0}!".using( "World" )
	);
	// output: Hello, World!
```


## DOCUMENTATION

Usage is straightforward:

```javascript
	format( <template-string>, ...args )	
```

Arguments passed to the function are made available to the template via the following ways:


### index `${0}`
to reference arugments by order 

 
	   
```javascript
          format( "Hello, ${0}!", "World" );
```


### strings `${name}`
to reference any fields of arguments 


 
```javascript
          format( "Call me ${name}.", { name : "Ishmael" });
```

> NOTE: in cases where multiple arguments include the same field, the last argument takes precidence. Use fully defined object references to get access to the others. See below

```javascript
          format(
            "Don't call me ${name}.",
            { name : "Ishmael" },
            { name : "Bob"}
          );
```

### 'arg'+index `${arg1}`
to use arguments within expressions or to access argument fields. Particularly handy to disambiguate fields when multiple arguments have them (e.g. `${arg2.name}`)

 
```javascript
          format(
            "Using ${name} gives you ${arg1.name} not ${arg0.name}",
            { name : "Ishmael" },
            { name : "Bob"}
          );
```

to use the argument in a function 


```javascript
          format( "B is letter ${arg0.indexOf('B')} letter", "ABC" );
```

### expressions `${a + b}`


```javascript
          format( "the sum of ${a} and ${b} is ${a + b}", {a: 2, b: 5} );
```

### methods `${arg3.method()}`


```javascript
          format( "Please don't ${arg0.toLowerCase()}", "YELL" );
```


### args[index] `${args[3]}`
to reference arugments programatically (e.g. ${args[arg0]}) 


 
```javascript
          format( "I am ${args[arg0]}", 1, "right", "wrong" )
```


### <assignment> `${x=3}`
to set values for use later in the format string (e.g. ${x=a+3}) 


 
```javascript
          format(
            "${arg0}^2 is ${x=arg0*arg0}, and squared again is ${x*x}",
            3
          )
```

### Arbitrary code `${ ...some computation }` or `${ ...some computation, 'output' }`



```javascript
          format(
            "my favorite mice are ${ args.join(' mouse, ') }",
            "Mickey", "Minie", "Mighty"
          )
```


and

```javascript
         format(
            "the password is a ${ arg0.substring( arg0.indexOf( '{' ) + 1, arg0.indexOf( '}' ))}",
            "hidden{secret}within"
          )
```

and


```javascript
         format(
            "x.a is ${ x = { a : arg0 + arg1 }, 'set' } to ${x.a}",
            2, 3
          )
```

and even,


```javascript
         format(
          	"${args.reduce((o,i)=>{if (o<3) return o+i; return i})}",
          	1,2,3,4,5,6,7
         )
```


# WARNING
es6format makes use of Function(), so it should never be called on format strings that are not known to be safe.

