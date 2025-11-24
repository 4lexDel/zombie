import p5 from "p5";
import { BaseModal } from "./BaseModal";
import type { HorizontalAlign, VerticalAlign } from "../../containers/BaseContainer";
import { RegisterDraw } from "../DrawDecorator";

export class PieceModal extends BaseModal {
    public onMirrorClicked?: (() => void);
    public onRotateClicked?: (() => void);
    public onUpgradeClicked?: (() => void);

    hoverOnMirrorButton: boolean = false;
    hoverOnRotateButton: boolean = false;
    hoverOnUpgradeButton: boolean = false;

    constructor(p: p5, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP") {
        super(p, horizontalAlign, verticalAlign);
    }

    protected initEvents() {
        super.initEvents();

        this.eventHandler.addEventMouseReleased(this.identifier, () => {
            if (!this.isVisible) return;
            
            let coords = this.getCoordsOrigin();

            if (
                this.p.mouseX >= coords.x + BaseModal.padding && this.p.mouseX <= coords.x + this.width / 3 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            ) {
                this.onMirrorClicked?.();
            } else if (
                this.p.mouseX >= coords.x + this.width / 3 && this.p.mouseX <= coords.x + this.width * 2 / 3 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            ) {
                this.onRotateClicked?.();
            } else if (
                this.p.mouseX >= coords.x + this.width * 2 / 3 && this.p.mouseX <= coords.x + this.width - BaseModal.padding &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            ) {
                this.onUpgradeClicked?.();
            } 
            
            this.close();
        }, 1);

        this.eventHandler.addEventMouseMoved(this.identifier, () => {
            let coords = this.getCoordsOrigin();

            this.hoverOnMirrorButton = (
                this.p.mouseX >= coords.x && this.p.mouseX <= coords.x + this.width / 3 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            );
            this.hoverOnRotateButton = (
                this.p.mouseX >= coords.x + this.width / 3 && this.p.mouseX <= coords.x + this.width * 2 / 3 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            );            
            this.hoverOnUpgradeButton = (
                this.p.mouseX >= coords.x + this.width * 2 / 3 && this.p.mouseX <= coords.x + this.width &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            );
        }, 1);
    }

    @RegisterDraw(0)
    public draw() {
        super.draw();
        if (this.isVisible) {
            this.drawMirror();
            this.drawRotate();
            this.drawUpgrade();
        }
    }

    private drawMirror() {
        const { x: cx, y: cy } = this.getCoordsOrigin();

        // Highlight
        this.p.noStroke();
        if (this.hoverOnMirrorButton) {
            this.p.fill(200);
            this.p.rect(cx + BaseModal.padding/2, cy + BaseModal.padding/2, this.width/3 - BaseModal.padding, this.height - BaseModal.padding, 5);
        }

        this.p.strokeWeight(this.p.width / 800);

        this.p.stroke(0);
        this.p.fill(25, 150, 25);
        this.p.triangle(
            cx + BaseModal.padding, cy + BaseModal.padding,
            cx + this.width / 6 - BaseModal.padding/2, cy + this.height / 2,
            cx + BaseModal.padding, cy + this.height - BaseModal.padding
        );
        this.p.triangle(
            cx + this.width / 3 - BaseModal.padding, cy + BaseModal.padding,
            cx + this.width / 6 + BaseModal.padding/2, cy + this.height / 2,
            cx + this.width / 3 - BaseModal.padding, cy + this.height - BaseModal.padding
        );

        this.p.line(
            cx + this.width / 6, cy + BaseModal.padding,
            cx + this.width / 6, cy + this.height - BaseModal.padding
        );
    }

    private drawRotate() {
        const { x: cx, y: cy } = this.getCoordsOrigin();

        // Highlight
        this.p.noStroke();
        if (this.hoverOnRotateButton) {
            this.p.fill(200);
            this.p.rect(cx + this.width/3 + BaseModal.padding/2, cy + BaseModal.padding/2, this.width/3 - BaseModal.padding, this.height - BaseModal.padding, 5);
        }

        this.p.strokeWeight(this.p.width / 800);

        // Arc
        this.p.stroke(10, 0, 0);
        this.p.noFill();
        this.p.arc(
            cx + 3 * this.width / 6, cy + this.height / 2,
            this.width / 3 - BaseModal.padding * 2,
            this.height - BaseModal.padding * 2,
            this.p.HALF_PI, this.p.HALF_PI + this.p.PI * 1.5
        );

        // Arrowhead
        let a = this.p.HALF_PI + this.p.PI * 1.5,
            rx = (this.width / 3 - BaseModal.padding * 2) / 2,
            ry = (this.height - BaseModal.padding * 2) / 2,
            cx0 = cx + 3 * this.width / 6,
            cy0 = cy + this.height / 2,
            ex = cx0 + rx * Math.cos(a),
            ey = cy0 + ry * Math.sin(a);

        let tx = -rx * Math.sin(a), ty = ry * Math.cos(a),
            m = Math.hypot(tx, ty); tx /= m; ty /= m;     // tangent unit
        let px = -ty, py = tx, s = 10;               // perpendicular + size

        this.p.fill(250, 50, 50);
        this.p.triangle(
            ex + tx * s, ey + ty * s,
            ex - tx * s * 0.5 + px * s * 0.5, ey - ty * s * 0.5 + py * s * 0.5,
            ex - tx * s * 0.5 - px * s * 0.5, ey - ty * s * 0.5 - py * s * 0.5
        );
    }

    private drawUpgrade() {
        const { x: cx, y: cy } = this.getCoordsOrigin();

        // Highlight
        this.p.noStroke();
        if (this.hoverOnUpgradeButton) {
            this.p.fill(200);
            this.p.rect(cx + this.width * 2 / 3 + BaseModal.padding/2, cy + BaseModal.padding/2, this.width/3 - BaseModal.padding, this.height - BaseModal.padding, 5);
        }
        this.p.strokeWeight(this.p.width / 800);

        // Star
        this.p.stroke(0);
        this.p.fill(255, 223, 0); // yellow teint
        let cx0 = cx + 5 * this.width / 6, cy0 = cy + this.height / 2;
        let rOuter = (this.height - BaseModal.padding * 2) / 2, rInner = rOuter / 2.5;
        this.p.beginShape();
        for (let i = 0; i < 10; i++) {
            let r = (i % 2 === 0) ? rOuter : rInner;
            let a = this.p.TWO_PI / 10 * i - this.p.HALF_PI;
            let x = cx0 + r * Math.cos(a);
            let y = cy0 + r * Math.sin(a);
            this.p.vertex(x, y);
        }
        this.p.endShape(this.p.CLOSE);
    }
}