/* batches recode */
    /* epstein-suicider */
/* (chippy) */

module.exports =
{
    create: function(processor)
    {
        this.processor = processor;
        
        this.elements = [];
        this.process_next = function(key)
        {
            const this_backup = this;
            this.processor(this.elements[key], function(err)
            {
                ((obj, err)=>{
                    obj.elements.shift();
                    if (err)
                    {
                        console.log("unhandled error in batch! printing stack:");
                        try { throw new Error() } catch(e) { console.log(e.stack); }
                    }
                    else
                    {
                        obj.continue_batch();
                    }
                })(this_backup, err);
            });
        }

        this.continue_batch = ()=>{this.process_next(0);}
        this.summon = function(object, callback = null)
        {
            this.elements.push([object, callback]);
            if (this.elements.length == 0)
                this.continue_batch();
        }
        this.wake = this.summon;
        this.push = this.summon;
        this.emplace = this.summon;
    }
}