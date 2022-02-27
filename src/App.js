import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
    const [drawSize, setDrawSize] = useState(5);
    const [points, setPoints] = useState();
    const colorEle = useRef(null);
    const canvasEle = useRef(null);
    //Mouse Down gets current postion of mouse cursor x and y
    const moused = (e) => {
        //Mobile drawing (Touch) else Desktop drawing
        //Mobile and Desktop use different offsets
        if (e.touches) {
            var rect = canvasEle.current.getBoundingClientRect();
            const x =
                ((e.touches[0]["clientX"] - rect.left) / (rect.right - rect.left)) *
                canvasEle.current.width;
            const y =
                ((e.touches[0]["clientY"] - rect.top) / (rect.bottom - rect.top)) *
                canvasEle.current.height;
            setPoints({ x: x, y: y });
        } else {
            const x = e["nativeEvent"]["offsetX"];
            const y = e["nativeEvent"]["offsetY"];
            setPoints({ x: x, y: y });
        }
    };
    //Mouse moving get current position
    const handleGetCurrentMousePosition = (e) => {
        //Mobile else Desktop, Draw After getting mouse position
        if (e.touches) {
            var rect = canvasEle.current.getBoundingClientRect();
            const x =
                ((e.touches[0]["clientX"] - rect.left) / (rect.right - rect.left)) *
                canvasEle.current.width;
            const y =
                ((e.touches[0]["clientY"] - rect.top) / (rect.bottom - rect.top)) *
                canvasEle.current.height;
            drawOnCanvas(x, y);
        } else {
            if (e.buttons === 1) {
                const x = e["nativeEvent"]["offsetX"];
                const y = e["nativeEvent"]["offsetY"];
                drawOnCanvas(x, y);
            }
        }
    };
    const drawOnCanvas = (x, y) => {
        //Drawing Settings
        let ctx = canvasEle.current.getContext("2d");
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.strokeStyle = colorEle.current.value;
        ctx.lineWidth = drawSize;

        //Start Drawing
        ctx.beginPath();
        ctx.moveTo(points.x, points.y);
        setPoints({ x: x, y: y });
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    //Removes previous points on mouse up
    const handleMouseUp = () => {
        setPoints([]);
    };
    //Increase marker size by 1
    const handleAddSize = () => {
        setDrawSize(drawSize + 1);
    };
    //Decrease marker size by 1
    const handleSubSize = () => {
        setDrawSize(drawSize - 1);
    };
    //Clears board
    const handleClear = () => {
        var canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    return (
        <div className="drawing-container">
            <canvas
                onMouseDown={moused}
                onMouseMove={handleGetCurrentMousePosition}
                onTouchStart={moused}
                onTouchMove={handleGetCurrentMousePosition}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseUp}
                width="650"
                height="600"
                id="canvas"
                className="drawing-canvas"
                ref={canvasEle}
            ></canvas>
            <div className="tools-container">
                <button onClick={handleSubSize} className="size-button">
                    <i className="fas fa-minus"></i>
                </button>
                <span>{drawSize}</span>
                <button onClick={handleAddSize} className="size-button">
                    <i className="fas fa-plus"></i>
                </button>
                <input type="color" id="color" ref={colorEle}></input>
                <button onClick={handleClear} className="size-button position-right">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};
export default App;
