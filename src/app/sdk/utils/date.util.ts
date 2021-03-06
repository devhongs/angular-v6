export class DateUtil {

	static format(value: any, format: string = ''): any {
		// TODO : value type 별 체크 로직 추가
		if (value) return moment(value).format(format);
		return value;
	}

	/**
	 * returns "from timestamp" with 00:00:00 time
	 * @param {Number} period       previous interval count
	 * [@param] {Number | Date} now   current timestamp
	 * [@param] {String} type         interval type
	 * [@param] {String} type         format type
	 */
	static getFrom(date: number = Date.now(), period: number, type: string = 'day', format: string = 'YYYY-MM-DD'): number {
		return +moment(moment(date).add(-period, type).format(format)).format('x');
		// return +moment(moment(date.toString()).add(-period, type).format(format)).format('x');
	}

	/**
	 * returns timestamp for parameter
	 * [@param] {Object} date   Date
	 */
	static getTime(date: any = Date.now()): number {
		return +moment(date).format('x');
	}

	/**
	 * returns current timestamp
	 */
	static now(): number {
		return Date.now();
	}

	static fromNow(): string {
		return moment().fromNow();
	}

	/**
	 * returns cron expression to timestamp
	 */
	static cron2TimestampFirst(cron: string) {
		/* TODO not userd
		var schedules: any = this.cron2Timestamp(cron, 0);
		return schedules.length > 0 ? schedules[0] : null;
		*/
	}

	/**
	 * returns cron expression to timestamp
	 */
	static cron2Timestamp(cron: string, size: number) {
		/* TODO not userd
		later.date.localTime();
		size = size || 0;

		var rv = [];
		var parse = later.parse.cron(cron, true);
		var schedules = later.schedule(parse).next(size);

		if (typeof schedules == 'object') {
			rv.push(Number(moment(schedules).format('x')));
		} else if (typeof schedules == 'array') {
			})
		}

		return rv;
		*/
	}

}

