import Consts from "./consts";
import FoodModel from "./FoodModel";
import PlayerModel from "./PlayerModel";
import Utils from "./utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property({ type: cc.Prefab })
    private Food: cc.Prefab = null;

    public static utils: Utils = new Utils();
    public static foodMode: FoodModel = new FoodModel();
    public static playerModel: PlayerModel = new PlayerModel();
    public static consts: Consts = new Consts();

    onEnable() {
        this.addFood();
        this.schedule(this.addFood, 5);
    }

    onDisable() {
        this.unschedule(this.addFood);
    }

    private addFood(): void {
        var x: number = Main.utils.getRandomNum(Main.consts.borderleft, Main.consts.borderRight);
        var y: number = Main.utils.getRandomNum(Main.consts.borderDown, Main.consts.borderUp);

        var food: cc.Node = cc.instantiate(this.Food);
        this.node.addChild(food);
        food.active = true;
        food.x = x;
        food.y = y;
        Main.foodMode.foodList.push(food);
    }
}
