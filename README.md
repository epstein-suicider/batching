# batching
a simple javascript batching library<br/>
used for systematically processing elements returned from async/callback functions<br/>
made it for myself, didn't realise it existed<br/>
<br/>
*only tested on node.js, not sure if working on browsers*<br/>

## usage
create a batch with the function you want to run,<br/>
then summon the batch on an async/callback function for magic<br/>
example:
```js
const batches = require("./gamer/batches");

// create our batch class
let batch = new batches.create(function(object, continue_batch) // gets called with every element
{
  callback_on_object(function(error)
  {
    /*
      go to the next key.
      this library automatically will throw any errors
      that get sent into the continue function
      in case you forget to do error handling for whatever
      ungodly reason
    */
    continue_batch(err);
  }
}

/*
  calling an example function that
  would return an object in a callback
  that you then place into the batch
*/
return_object(function(object)
{
  batch.summon(object);
});
```

# mini-wiki
this is a pretty small library so i thought it'd be overkill<br/>
to add a wiki or anything of the like, so here's the functions and classes<br/>
<br/>
## functions
### create
simple function that creates and returns a batch object<br/>
1st arg is func that gets called on every element in the batch<br/>
2nd arg (**optional**) is a delay in milliseconds to wait before<br/>
processing the next element on the batch<br/>
1st arg is called with 2 arguments, the *current element* and a *callback*<br/>
that you **have to call** after finishing any work on the object, to move forward<br/>
in the element list<br/>
```js
let batch = batches.create(function(object, continue) { continue(); }, 1000); //always continues with delay of 1 second
```

## 'batch' class
this class is basically just used to summon the batch<br/>
### summon (alias: wake)
the only 'public' function meant to be used in the class.<br/>
takes 1 arg, being the *element to put in the batch*<br/>
only thing it does is put the element in the batch and start it,<br/>
summon just sounded like a way cooler name. wake works too<br/>
```js
batch.summon(<anything>); //adds anything to batch and starts it if it's stopped
```
