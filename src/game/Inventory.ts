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

    private indexSelected: number = 0; // From 0 to 4 

    private inventoryKeys = ['&', 'é', '"', '\'', '('];
    
    constructor() {
        this.slots = [undefined, undefined, undefined, undefined, undefined];
    }

    public resize(width: number, _: number): void {
        this.cellSize = Math.min(70, width / (Inventory.MAX_ITEMS + 2));
        this.cellPadding = this.cellSize * 0.1;

        this.inventoryPadding = this.cellSize * 0.2;
    }

    public getSlots(): [Slot?, Slot?, Slot?, Slot?, Slot?] {
        return this.slots;
    }

    public getIndexSelected(): number {
        return this.indexSelected;
    }

    public getItemSelected(): Item | undefined {
        return this.slots[this.indexSelected]?.item;
    }

    public addItem(newItem: Item, quantity: number = 1): boolean {
        // Already collected ?
        if (newItem.getIsPicked()) return false;

        // Stackable version
        if (newItem.getItemOptions().isStackable) {            
            const sameItem = this.slots.find((slot: Slot | undefined) => slot && slot.item.getName() === newItem.getName());
            if (sameItem) {
                sameItem.quantity += quantity;
                newItem.setIsPicked(true);
                return true;
            }
        }

        // Normal
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) {
                this.slots[i] = { item: newItem, quantity: quantity };
                newItem.setIsPicked(true);
                return true;
            }
        }

        return false;
    }

    public removeItemByIndex(index: number): void {
        const slot = this.slots[index];

        if (slot && slot.quantity >= 1) {
            slot.quantity -= 1;

            if (slot.quantity < 1) this.slots[index] = undefined;
        }
    }

    public removeItemFromCurrentSlot(): void {
        this.removeItemByIndex(this.indexSelected);
    }

    public isFull(): boolean {
        return this.slots.every((slot) => !!slot);
    }

    public UpdateControls(p5: p5): void {
        if (!p5.keyIsPressed) {
            return;
        }

        this.inventoryKeys.forEach((keyBinded, index) => {
            if (p5.keyIsDown(keyBinded)) {
                this.indexSelected = index;
            }
        });
    }

    public dropCurrentItem(): Item | null {
        const slotUsed = this.slots[this.indexSelected];

        if (slotUsed && slotUsed.quantity >= 1) {
            const itemDropped = slotUsed.item.clone();
            itemDropped.setIsPicked(false);
            itemDropped.resetCreationTime();

            this.removeItemByIndex(this.indexSelected);

            return itemDropped;
        }

        return null;
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

            p.stroke(index === this.indexSelected ? COLORS.orange.value : COLORS.black.value);
            p.strokeWeight(index === this.indexSelected ? 6 : 3);
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