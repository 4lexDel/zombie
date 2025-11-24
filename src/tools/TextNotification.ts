import p5 from "p5";
import { RegisterDraw } from "./DrawDecorator";

export class TextNotification {
    private p: p5;
    
    private message: string;
    private lines: string[] = [];

    private textSize!: number;
    private strokeWeight!: number;

    private defaultDisplayDuration = 2000;
    private isHidden = true;

    private defaultColor: p5.Color;
    private color: p5.Color;

    constructor(p: p5) {
        this.p = p;
        this.message = "Default Message";
        this.defaultColor = this.p.color(200, 150, 50);
        this.color = this.defaultColor;

        this.resize();
    }

    public setDisplayDuration(duration: number) {
        this.defaultDisplayDuration = duration;
    }

    public resize() {
        this.textSize = this.p.width / 20;
        this.strokeWeight = this.p.width / 200;
    }

    public show(message: string, color: p5.Color | null = null, displayDuration?: number): Promise<void> {
        this.message = message;

        this.color = color ? color : this.defaultColor;

        const maxWidth = this.p.width * 0.8;
        this.parseMessageIntoLines(maxWidth);

        this.isHidden = false;
        return new Promise((resolve) => {
            setTimeout(() => {
                this.isHidden = true;
                resolve();
            }, displayDuration ? displayDuration : this.defaultDisplayDuration);
        });
    }

    private parseMessageIntoLines(maxWidth: number) {
        // Split the message into words
        const words = this.message.split(' ');
        this.lines = [];
        let currentLine = '';
        for (let word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = this.p.textWidth(testLine);
            if (testWidth > maxWidth && currentLine) {
                this.lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) this.lines.push(currentLine);
    }

    @RegisterDraw(-9999)
    public draw() {
        if (this.isHidden) return;

        this.p.fill(50, 200);
        this.p.noStroke();
        // Calculate background rectangle to fit all lines
        const paddingY = this.textSize * 0.8;
        const totalHeight = this.lines.length * this.textSize;
        const rectY = 2 * this.p.height / 5 - totalHeight / 2 - paddingY / 2;
        const rectHeight = totalHeight + paddingY;
        this.p.rect(0, rectY, this.p.width, rectHeight);

        this.p.textSize(this.textSize);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.fill(this.color);
        this.p.stroke(20);
        this.p.strokeWeight(this.strokeWeight);

        // Draw each line, centered
        const startY = 2 * this.p.height / 5 - totalHeight / 2 + this.textSize / 2;
        for (let i = 0; i < this.lines.length; i++) {
            this.p.text(
                this.lines[i],
                this.p.width / 2,
                startY + i * this.textSize
            );
        }
    }
}