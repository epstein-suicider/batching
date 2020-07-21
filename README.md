# batching
a simple javascript batching library<br/>
used for systematically processing elements retrieved from async/callback functions<br/>
made it for myself, didn't realise it existed<br/>
<br/>
*only tested on node.js, not sure if working on browsers*<br/>

## usage
create a batch with the function you want to run,<br/>
then summon the batch on an async/callback function for magic<br/>
example:
```js
const batches = require("./gamer/batches");

//create our batch
let batch = new batches.create(function(obj, continuer)
{
  callback_based_function(obj, function(err)
  {
    /*
      go to the next key.
      this library will automatically
      throw unhandled errors, in case
      you somehow forget to do error
      handling for an ungodly reason
      */
      continuer(err);
  });
})

/*
  calling an example function that
  would return an element in a callback
  that you then place into the batch
*/
return_thing(function(obj)
{
  batch.summon(obj);
  /*alternatives:*/
    //batch.wake(obj);
    //batch.push(obj);
    //batch.emplace(obj);
});
```

# mini-wiki
this is a pretty small library so i thought it'd be overkill<br/>
to add a wiki or anything of the like, so here's the functions and classes<br/>
<br/>
## functions
### create
args: processor: func(obj: any, continuer: function)<br/>
<br/>
simple function that creates and returns a batch<br/>
argument is a function that gets called for every<br/>
element in the batch, which has 2 args, being the<br/>
*current element*, and a *callback* that you always<br/>
**have to call** after finishing any work on the<br/>
element and to move forward in the batch's list<br/>
```js
let batch = batches.create(function(obj, continuer) { continuer(); }); //always continues
```

## 'batch' class
this class is basically just used to summon the batch<br/>
only has 1 function:<br/>
### summon (aliases: wake, push, emplace)
args: element: any, [callback: function]<br/>
<br/>
the only 'public' function meant to be used in the class.<br/>
takes an being the *element to put in the batch*, and optionally<br/>
a callback to call whenever the element gets processed. only<br/>
thing this does is put the element in the batch and start it,<br/>
summon just sounded like a way cooler name than "push_and_start"<br/>
i decided to add more aliases in case a different name is preferred<br/>
```js
batch.summon(anything); //adds anything to batch and starts it if it's stopped
//aliases:
batch.wake(anything);
batch.push(anything);
batch.emplace(anything);
```

# why does the documentation have
# types in argseven though you're
# coding in javascript?
lol, idk<br/>