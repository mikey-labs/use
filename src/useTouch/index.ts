/**
 * Direction
 */
export enum Direction {
    NONE = -1,
    CLICK = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
}

/**
 * TouchEventOption
 */
export type TouchEventOption = {
    startX: number;
    startY: number;
    beginTime: number;
    endTime: number;
    endX: number;
    endY: number;
};

/**
 * ITouch
 */
export abstract class ITouch {
    public abstract touchStart(event: TouchEvent): void;
    public abstract touchMove(event: TouchEvent): void;
    public abstract touchEnd(event: TouchEvent): void;
    public abstract getDirection(event: TouchEvent): Direction;
    public abstract getTouchResult(): TouchResult;
}

/**
 * TouchResult
 */
export type TouchResult = {
    direction: string;
    deltaX: number;
    deltaY: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    isVertical: boolean;
    isHorizontal: boolean;
};
/**
 * 手势事件方向控制
 */
class Touch implements ITouch {
    touchEventOption: TouchEventOption = this.getDefaultTouchEventOption();

    /**
     * 默认touch Event
     * @private
     */
    private getDefaultTouchEventOption(): TouchEventOption {
        return {
            startX: 0,
            startY: 0,
            beginTime: 0,
            endTime: 0,
            endX: 0,
            endY: 0,
        };
    }
    private resetTouchEventOption() {
        this.touchEventOption = this.getDefaultTouchEventOption();
    }
    /**
     * 计算角度
     * @param angX
     * @param angY
     * @return {number}
     */
    private getAngle(angX: number, angY: number): number {
        return (Math.atan2(angY, angX) * 180) / Math.PI;
    }
    /**
     * 计算方向
     * @return {Direction}
     */
    public getDirection(): Direction {
        const { startY, startX, endX, endY, beginTime, endTime } = this.touchEventOption;
        const angx = endX - startX;
        const angy = endY - startY;
        //如果滑动距离太短
        if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
            if (endTime - beginTime > 0 && endTime - beginTime < 300) {
                return Direction.CLICK;
            } else {
                return Direction.NONE;
            }
        }
        const angle = this.getAngle(angx, angy);
        //通过计算手势所在的象限判断在什么方向
        if (angle >= -135 && angle <= -45) {
            return Direction.UP;
        } else if (angle > 45 && angle < 135) {
            return Direction.DOWN;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            return Direction.LEFT;
        } else if (angle >= -45 && angle <= 45) {
            return Direction.RIGHT;
        } else {
            return Direction.NONE;
        }
    }

    /**
     * 阻止默认和冒泡事件
     * @param event
     * @param isStopPropagation 是否冒泡
     */
    public preventDefault(event: TouchEvent, isStopPropagation: boolean = false) {
        // @ts-ignore
        if (typeof event.cancelable !== "boolean" || event.cancelable) {
            event.preventDefault();
        }
        if (isStopPropagation) {
            event.stopPropagation();
        }
    }

    /**
     * 触摸中
     * @param event
     */
    touchMove(event: TouchEvent): void {
        const {
            touches: [{ clientX, clientY }],
        } = event;
        this.touchEventOption.endX = clientX;
        this.touchEventOption.endY = clientY;
        this.touchEventOption.endTime = Date.now();
    }

    /**
     * 获取手势结果
     */
    getTouchResult(): TouchResult {
        const { startX, endX, startY, endY } = this.touchEventOption;
        const deltaX = (endX < 0 ? 0 : endX) - startX;
        const deltaY = endY - startY;
        const offsetX = Math.abs(deltaX);
        const offsetY = Math.abs(deltaY);
        const direction = this.getDirection();
        return {
            direction: Direction[direction],
            deltaX,
            deltaY,
            offsetX,
            offsetY,
            startX,
            startY,
            isHorizontal: direction === Direction.LEFT || direction === Direction.RIGHT,
            isVertical: direction === Direction.UP || direction === Direction.DOWN,
        };
    }

    /**
     * 触摸开始
     * @param event
     */
    touchStart(event: TouchEvent): void {
        this.resetTouchEventOption();
        const {
            touches: [{ clientX, clientY }],
        } = event;
        this.touchEventOption.startX = clientX;
        this.touchEventOption.startY = clientY;
        this.touchEventOption.beginTime = Date.now();
    }

    /**
     * 触摸结束
     * @param event
     */
    touchEnd(event: TouchEvent): void {
        const {
            changedTouches: [{ clientX, clientY }],
        } = event;
        this.touchEventOption.endX = clientX;
        this.touchEventOption.endY = clientY;
        this.touchEventOption.endTime = Date.now();
    }
}
export function useTouch(): Touch {
    return new Touch();
}
