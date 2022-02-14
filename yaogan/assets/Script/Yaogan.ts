import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Yaogan extends cc.Component {

    @property({ type: cc.Node })
    bg: cc.Node = null;
    @property({ type: cc.Node })
    joystick: cc.Node = null;
    @property({ type: cc.Node })
    player: cc.Node = null;
    @property({ type: cc.Node })
    parent: cc.Node = null;

    private max_R: number = 80;   // 摇杆最大半径
    private speed: number = 2;      // 玩家移动速度
    private rotation: number = 0;
    private vector: cc.Vec2 = cc.v2(0, 0);  //移动向量
    private isRotation: boolean = true;       // 角色是否根据摇杆方向移动
    private isForbidden: boolean = false;     //是否禁用摇杆

    onLoad() {

    }

    onEnable() {
        Main.playerModel.playerW = this.player.width;
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.playerMove, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.finish, this);
        this.bg.on(cc.Node.EventType.TOUCH_CANCEL, this.finish, this);
    }

    onDisable() {
        this.bg.off(cc.Node.EventType.TOUCH_MOVE, this.move, this);
        this.bg.off(cc.Node.EventType.TOUCH_MOVE, this.playerMove, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.finish, this);
        this.bg.on(cc.Node.EventType.TOUCH_CANCEL, this.finish, this);
    }

    update(): void {
        let x = this.player.x + this.vector.x;
        let y = this.player.y + this.vector.y;

        Main.playerModel.playerX = x;
        Main.playerModel.playerY = y;
        this.player.setPosition(x, y);

        if (this.vector.x && this.vector.y) {
            if (this.vector.y < 0) {
                this.rotation = (-this.vector.angle(cc.v2(1, 0))) / Math.PI * 180;
            } else {
                this.rotation = (this.vector.angle(cc.v2(1, 0))) / Math.PI * 180;
            }
        }
    }

    /**当手指在背景上移动时触发move事件 */
    private move(event: cc.Event.EventTouch): void {
        if (this.isForbidden) {
            return;
        }

        let pos: cc.Vec2 = new cc.Vec2(event.getLocationX(), event.getLocationY());  // 触摸点的坐标
        let pos0: cc.Vec2 = this.parent.convertToNodeSpaceAR(pos);  // 将触摸点的世界坐标转为节点坐标

        // pos.mag()  这个触点的长度
        if (pos0.mag() < this.max_R) {
            this.joystick.x = pos0.x;
            this.joystick.y = pos0.y;
        } else {
            let pos = pos0.normalizeSelf();    // 将触点归一化
            let x = pos.x * this.max_R;
            let y = pos.y * this.max_R;

            this.joystick.x = x;
            this.joystick.y = y;
        }
    }

    private playerMove(): void {
        if (this.isForbidden) {
            return;
        }

        let dir = this.joystick.position.normalizeSelf();
        this.vector.x = dir.x * this.speed;  // 给移动向量赋值
        this.vector.y = dir.y * this.speed;

        if (this.isRotation) {
            this.player.angle = this.rotation - 90;
        }
    }

    private finish(): void {
        this.joystick.position = cc.v3(0, 0);
        this.vector = cc.v2(0, 0);
    }
}
