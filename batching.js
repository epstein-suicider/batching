/* batches recode */
    /* epstein-suicider */
/* (chippy) */

module.exports =
{
    create: function(processor)
    {
        this.set_processor = function(newp)
        {
            this.processor = newp;
        }

        this.set_processor(processor);
        
        this.elements = [];
        this.process_next = function(key)
        {

            const this_backup = this;
            this.processor(this.elements[key][0], function(err)
            {
                ((obj, err)=>{
					if (obj.elements[key][1] != null) //if a callback function was pushed
						obj.elements[key][1](obj.elements[key][0]); //call it

                    obj.elements.shift();
                    if (err)
                    {
                        console.log("unhandled error in batch! printing stack:");
                        try { throw new Error() } catch(e) { console.log(e.stack); }
                    }
                    else
                    {
                        if (obj.elements.length != 0)
                            obj.continue_batch();
                    }
                })(this_backup, err);
            });
        }

        this.continue_batch = ()=>{this.process_next(0);}
        this.add = function(object, callback = null)
        {
            this.elements.push([object, callback]);
        }

        this.start = function()
        {
            if (this.elements.length == 1)
            this.continue_batch();
        }

        this.summon = function(object, callback = null)
        {
            this.add(object, callback);
            this.start();
        }
        this.wake = this.summon;
        this.push = this.summon;
        this.emplace = this.summon;
    }
}
