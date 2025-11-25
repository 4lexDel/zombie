import p5 from "p5";
import Item from "./item/Item";
import { COLORS } from "../colors";

export default class Inventory {
    public static MAX_ITEMS: number = 5;

    private inventoryPadding: number = 20;

    private cellSize: number = 70;
    private cellPadding: number = 5;
    private cellGap: number = 10;

    private items: [Item?, Item?, Item?, Item?, Item?];

    private cellSelected: number = 0; // From 0 to 4 

    private keysBinded = ['&', 'é', '"', '\'', '(']
    
    constructor() {
        this.items = [undefined, undefined, undefined, undefined, undefined];
    }

    public resize(width: number, _: number): void {
        this.cellSize = Math.min(70, width / (Inventory.MAX_ITEMS + 1));
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

    public UpdateControls(p5: p5): void {
        if (!p5.keyIsPressed) {
            return;
        }

        this.keysBinded.forEach((keyBinded, index) => {
            if (p5.keyIsDown(keyBinded)) {
                this.cellSelected = index;
            }

        });
    }

    public draw(p: p5): void {
        this.UpdateControls(p);

        const inventoryWidth = Inventory.MAX_ITEMS * this.cellSize + (Inventory.MAX_ITEMS-1) * this.cellGap;
        const inventoryHeight = this.cellSize;

        let ox = (p.width - inventoryWidth) / 2;
        let oy = p.height - inventoryHeight - 2 * this.inventoryPadding;

        p.resetMatrix();
        p.fill(200, 200, 200, 220);
        p.noStroke();
        p.rect(ox - this.inventoryPadding, oy - this.inventoryPadding, inventoryWidth + 2 * this.inventoryPadding, inventoryHeight + 2 * this.inventoryPadding, 10);

        this.items.forEach((item, index) => {
            p.stroke(index === this.cellSelected ? COLORS.orange.value : COLORS.black.value);
            p.strokeWeight(index === this.cellSelected ? 6 : 3);
            p.noFill();
            p.rect(
                ox + index * (this.cellSize + this.cellGap), 
                oy,
                this.cellSize,
                this.cellSize, 
                3
            );
            
            if (item) {                
                item.drawIcon(p,
                    ox + this.cellPadding + index * (this.cellSize + this.cellGap),
                    oy + this.cellPadding,
                    this.cellSize - 2 * this.cellPadding,
                    this.cellSize - 2 * this.cellPadding
                );
            }
        });
    }
}