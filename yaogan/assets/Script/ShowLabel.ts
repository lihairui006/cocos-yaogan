import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowLable extends cc.Component {

    private label: cc.Node = null;
    private allTime: number = 0;

    onLoad() {
        this.label = this.node.getChildByName("label");
        this.label.getComponent(cc.Label).string = Main.consts.countdown.toString();
    }

    update(dt: number) {
        if (Main.consts.countdown >= 0) {
            if (this.allTime >= 1) {
                this.allTime = 0;
                this.label.getComponent(cc.Label).string = (Main.consts.countdown--).toString();
            } else {
                this.allTime += dt;
            }
        } else {
            this.node.parent.removeChild(this.node);
        }
    }
}
