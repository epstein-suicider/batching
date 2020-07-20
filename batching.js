/* batches */
/*   chippy @ epstein-suicider */

module.exports =
{
	create: function(slave, delay)
	{		
		//private
		this.slave = slave;
		this.continue_batch = function(){};
		
		if (typeof delay === "undefined")
			this.delay = 0;
		else
			this.delay = delay;
		
		this.elements = [];
		
		testificate = function(obj, err = null)
		{
			obj.elements.shift();
			if (err)
			{
				console.log("batch error");
				try
				{
					throw new Error();
				}
				catch(e)
				{
					console.log(e.stack);
				}
			}
			else
			{
				let empty = obj.elements.length == 0;
				
				if (empty)
					console.log("done processing batch");
				else
				{
					console.log("element processed");
					
					if (obj.delay == 0)
						obj.continue_batch();
					else
					{
						setTimeout(function()
						{
							obj.continue_batch();
						}, obj.delay);
					}
				}
			}
		}
			
		this.process_next = function(key)
		{
			console.log("processing element...");
			
			let thisbk = this;
			this.slave(this.elements[key], function(err)
			{
				testificate(thisbk, err);
			});
		};
		
		this.continue_batch = function()
		{
			this.process_next(0);
		}
		
		//public
		this.summon = function(value)
		{
			let empty = this.elements.length == 0;
			this.elements.push(value);
			
			if (empty)
				this.continue_batch();
		};
		this.wake = this.summon;
	}
}