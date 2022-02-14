
export default class Utils {
    /**计算随机数 */
    public getRandomNum(minNum: number, maxNum: number): number {
        var Range = maxNum - minNum;
        var rand = Math.random();
        return (minNum + Math.round(rand * Range));
    }

    /**检车两点是否碰撞 */
    public checkCollision(x1: number, x2: number, y1: number, y2: number, w1: number, w2: number): boolean {
        var distanceX: number = x1 - x2;
        var distanceY: number = y1 - y2;
        if (distanceX < 0) {
            distanceX = -distanceX;
        }

        if (distanceY < 0) {
            distanceY = -distanceY;
        }
        if (distanceX + 13 < w1 + w2 && distanceY + 13 < w1 + w2) {  // 加13是因为有空白边界
            return true;
        }
        return false;
    }

    /** 设置图片*/
    public setSpriteFrame(node: Node, url: string, defaultUrl: string = null): void {
        if (!node) {
            console.error("设置节点为空")
        }

        cc.resources.load(url, cc.SpriteFrame,
            function (err: Error, asset: cc.SpriteFrame) {
                if (err) {
                    cc.error(err)
                    if (defaultUrl && defaultUrl != "") {
                        this.setSpriteFrame(node, defaultUrl)
                    }
                } else {
                    if (cc.isValid(node, true)) {
                        this.addComponent(node, cc.SpriteFrame).SpriteFrame = asset;
                    } else {
                        console.error("节点已经被销毁");
                    }
                }
            })
    }

    public addComponent<T extends cc.Component>(node: cc.Node | cc.Component, componentClass: { prototype: T }): T {
        if (node) {
            let comp: any = node.getComponent(componentClass);
            if (!comp) {
                comp = node.addComponent(componentClass as any);
            }
            return comp
        }
        return null;
    }

}
