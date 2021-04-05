// Queue class
class Queue {
	// Array is used to implement a Queue
	constructor() {
		this.items = [];
	}

	// enqueue function
	enqueue(element) {
		// adding element to the queue
		this.items.push(element);
	}

	// dequeue function
	dequeue() {
		// removing element from the queue
		// returns underflow when called
		// on empty queue
		if (this.isEmpty()) return null;
		return this.items.shift();
	}

	// front function
	front() {
		// returns the Front element of
		// the queue without removing it.
		if (this.isEmpty()) return null;
		return this.items[0];
	}

	// isEmpty function
	isEmpty() {
		// return true if the queue is empty.
		return this.items.length == 0;
	}

	// printQueue function
	printQueue() {
		var str = "";
		for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
		return str;
	}
}

// wrong way

// function faltu() {}
// module.export = { Queue };

// right way (also can be used using export before class name)
// export { Queue };
