/** @param {HTMLCanvasElement} canvas */
let _canvas = {};
let _context = {};

export default class CanvasRenderer {

    /** @param {VideoFrame} frame */
    static draw(frame) {
        const { displayHeight, displayWidth } = frame;

        _canvas.width = displayWidth;
        _canvas.height = displayHeight;
        _context.drawImage(
            frame,
            0, 
            0,
            displayWidth, 
            displayHeight
        )
        frame.close();
    }

    static getRenderer(canvas) {
        _canvas = canvas;
        _context = canvas.getContext('2d');

        const renderer = this;
        let pendingFrame = null;

        return (frame) => {
            const rendererAnimationFrame = () => {
                renderer.draw(pendingFrame);
                pendingFrame = null;
            }

            if (!pendingFrame) {
                requestAnimationFrame(rendererAnimationFrame);
            } else {
                pendingFrame.close();
            }

            pendingFrame = frame;
        }
    }
}