export class ContextUtil {

	static getTarget(config: any): any {
        let target: any;
        if (config.event) {
            // target = $(config.event.target);
            target = document.getElementsByClassName(config.event.target);
        } else if (config.target) {
            target = document.getElementsByClassName(config.target);
        }
        return target;
	}

    static getEventPosition(event: any): any {
        if (event) {
            // jquery event
            if (!isNaN(Number(event.pageX))) {
                return {x: event.pageX, y: event.pageY};
            }
            // javascript event
            else if (!isNaN(Number(event.clientX))) {
                return {x: event.clientX, y: event.clientY};
            }
        }
        return {x: 0, y: 0};
    }
    
    static isTickPosition(event: any): boolean {
        const ticks = document.getElementsByClassName('qtip-tip');
        if (!event) return false;
        if (ticks.length === 0) return false;
        let gap = 20 ;
        let tick: any = ticks[0].children[0];
        let tickOffset = tick.offset();
        let eventPosition = ContextUtil.getEventPosition(event);
        let tickPosition = {
            xMin: tick.of - gap,
            xMax: tickOffset.left + gap,
            yMin: tickOffset.top - gap,
            yMax: tickOffset.top + gap
        };
        if (tickPosition.xMin < eventPosition.x
            && tickPosition.xMax > eventPosition.x
            && tickPosition.yMin < eventPosition.y
            && tickPosition.yMax > eventPosition.y) {
            return true;
        }
        return false;
    }
}

