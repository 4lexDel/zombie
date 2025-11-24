import p5 from "p5";
import Item from "./item/Item";

export default class Inventory {
    public static MAX_ITEMS: number = 4;

    private inventoryPadding: number = 20;

    private cellSize: number = 50;
    private cellPadding: number = 5;

    private items: [Item?, Item?, Item?, Item?];
    
    constructor() {
        this.items = [undefined, undefined, undefined, undefined];
    }

    public resize(width: number, _: number): void {
        this.cellSize = Math.min(50, width / (Inventory.MAX_ITEMS + 1));
        this.cellPadding = this.cellSize * 0.1;

        this.inventoryPadding = this.cellSize * 0.2;
    }

    addItem(item: Item): boolean {
        for (let i = 0; i < Inventory.MAX_ITEMS; i++) {
            if (!this.items[i]) {
                this.items[i] = item;
                item.setIsPicked(true);
                return true;
            }
        }
        return false;
    }

    public draw(p: p5): void {
        const inventoryWidth = Inventory.MAX_ITEMS * this.cellSize;
        const inventoryHeight = this.cellSize;

        let ox = (p.width - inventoryWidth) / 2;
        let oy = p.height - inventoryHeight - 2 * this.inventoryPadding;

        p.fill(200, 200, 200, 220);
        p.noStroke();
        p.rect(ox - this.inventoryPadding, oy - this.inventoryPadding, inventoryWidth + 2 * this.inventoryPadding, inventoryHeight + 2 * this.inventoryPadding, 10);

        this.items.forEach((item, index) => {
            p.stroke(0);
            p.strokeWeight(2);
            p.noFill();
            p.rect(
                ox + index * this.cellSize, 
                oy,
                this.cellSize,
                this.cellSize, 
                3
            );
            
            if (item) {                
                item.drawIcon(p,
                    ox + this.cellPadding + index * this.cellSize,
                    oy + this.cellPadding,
                    this.cellSize - 2 * this.cellPadding,
                    this.cellSize - 2 * this.cellPadding
                );
            }
        });
    }
}