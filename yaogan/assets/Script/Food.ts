import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Food extends cc.Component {

    update() {
        var isCollisopn: boolean = Main.utils.checkCollision(Main.playerModel.playerX, this.node.x, Main.playerModel.playerY, this.node.y, Main.playerModel.playerW, this.node.width);
        if (isCollisopn) {
            this.node.parent.removeChild(this.node);
        }
    }
}
