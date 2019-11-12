const Bee = require("bee-queue");
const ConfirmationMail = require("../app/jobs/ConfirmationMail");
const redisConfig = require("../config/redis");

const jobs = [ConfirmationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on("failured", this.handleFailured).process(handle);
    });
  }

  handleFailured(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

module.exports = new Queue();
