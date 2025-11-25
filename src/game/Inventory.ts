import p5 from "p5";
import Item from "./item/Item";
import { COLORS } from "../colors";

export type Slot = { item: Item, quantity: number }

export default class Inventory {
    public static MAX_ITEMS: number = 5;

    private inventoryPadding: number = 20;

    private cellSize: number = 70;
    private cellPadding: number = 5;
    private cellGap: number = 10;

    private slots: [Slot?, Slot?, Slot?, Slot?, Slot?];

    private cellSelected: number = 0; // From 0 to 4 

    private keysBinded = ['&', 'é', '"', '\'', '(']
    
    constructor() {
        this.slots = [undefined, undefined, undefined, undefined, undefined];
    }

    public resize(width: number, _: number): void {
        this.cellSize = Math.min(70, width / (Inventory.MAX_ITEMS + 2));
        this.cellPadding = this.cellSize * 0.1;

        this.inventoryPadding = this.cellSize * 0.2;
    }

    addItem(item: Item, quantity: number = 1): boolean {
        for (let i = 0; i < Inventory.MAX_ITEMS; i++) {
            if (!this.slots[i]) {
                this.slots[i] = { item, quantity};
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

        this.slots.forEach((slot, index) => {
            let sx = ox + index * (this.cellSize + this.cellGap); 

            p.stroke(index === this.cellSelected ? COLORS.orange.value : COLORS.black.value);
            p.strokeWeight(index === this.cellSelected ? 6 : 3);
            p.noFill();
            p.rect(
                sx, 
                oy,
                this.cellSize,
                this.cellSize, 
                3
            );
            
            if (slot) {                
                slot.item.drawIcon(p,
                    sx + this.cellPadding,
                    oy + this.cellPadding,
                    this.cellSize - 2 * this.cellPadding,
                    this.cellSize - 2 * this.cellPadding
                );

                if (slot.quantity > 1) {
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(20);
                    p.stroke(80);
                    p.strokeWeight(6);
                    p.fill(255);
                    p.text(slot.quantity, sx + this.cellSize/2, oy + this.cellSize/2);
                }
            }
        });
    }
}