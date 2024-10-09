import { COLOR } from "@styles/color";

const useImageWebview = () => {

    const getHtmlContent = imgSrc => `
<html>
    <head>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: ${COLOR.GRAY_10};
            position:relative;
        }

        #canvas {
            width: auto;
            max-width: 100%;
            height: auto;
            max-height: 100%;
        }

        #crosshair {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .outerblackborder {
            width: 90%;
            height: 90%;
            border-radius: 50%;
            border: 3px solid;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #betweenbg {
            width: 82%;
            height: 82%;
            border-radius: 50%;
            border: 9px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .outerwhiteborder {
            margin: auto;
            padding: auto;
            width: 92%;
            height: 92%;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #innerblackborder {
            width: 15%;
            height: 15%;
            border-radius: 50%;
            border: 2px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
        }
    </style>
    </head>

<body>
    <canvas id="canvas"></canvas>
    <div id="crosshair">
        <div class="outerblackborder">
            <div id="betweenbg">
                <div class="outerwhiteborder">
                    <div id="innerblackborder">
                        <div class="innerwhiteborder"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = "${imgSrc}";
        let previousDistance = 0;

        img.onload = function () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const maxWidth = window.innerWidth;
            const maxHeight = window.innerHeight;
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let isDragging = true;
            let startX, startY;



            function limitLeft(x) {
                const halfWidth = crosshair.offsetWidth / 2;
                const canvasRightLimit = canvas.width - halfWidth;
                const canvasLeftLimit = -halfWidth;

                if (maxWidth > canvas.width) {
                    const offset = (maxWidth - canvas.width) / 2;
                    const minX = canvasLeftLimit + offset;
                    const maxX = canvasRightLimit + offset;
                    return Math.max(minX, Math.min(x, maxX - 1));
                } else {
                    return Math.max(canvasLeftLimit, Math.min(x, canvasRightLimit - 1));
                }
            }
            
            function limitTop(y) {
                const halfHeight = crosshair.offsetHeight / 2;
                const canvasBottomLimit = canvas.height - halfHeight;
                const canvasTopLimit = -halfHeight;

                if (maxHeight > canvas.height) {
                    const offset = (maxHeight - canvas.height) / 2;
                    const minY = canvasTopLimit + offset;
                    const maxY = canvasBottomLimit + offset;
                    return Math.max(minY, Math.min(y, maxY - 1));
                } else {
                    return Math.max(canvasTopLimit, Math.min(y, canvasBottomLimit - 1));
                }
            }
            
            
            function startDragging(e) {
                isDragging = true;
                startX = e.touches[0].clientX - crosshair.offsetLeft;
                startY = e.touches[0].clientY - crosshair.offsetTop;
            }

            function drag(e) {
                if (isDragging) {
                    e.preventDefault();
                    const clientX = e.touches[0].clientX;
                    const clientY = e.touches[0].clientY;
                    const x = clientX - startX;
                    const y = clientY - startY;
                    crosshair.style.left = limitLeft(x) + 'px';
                    crosshair.style.top = limitTop(y) + 'px';
                    updateColor();
                }
            }

            function stopDragging() {
                isDragging = false;
            }

            function getDistance(touch1, touch2) {
                const dx = touch2.clientX - touch1.clientX;
                const dy = touch2.clientY - touch1.clientY;
                return Math.sqrt(dx * dx + dy * dy);
            }

            function handleCanvasTouchStart(e) {

                isDragging = true;
                if (e.touches.length === 2) {
                    isDragging = false;
                    previousDistance = getDistance(e.touches[0], e.touches[1]);
                }
                const touchX = e.touches[0].clientX - crosshair.offsetWidth / 2;
                const touchY = e.touches[0].clientY - crosshair.offsetHeight / 2 ;
                crosshair.style.left = limitLeft(touchX) + 'px';
                crosshair.style.top = limitTop(touchY) + 'px';
                updateColor();
            }

            function handleCanvasTouchMove(e) {
                if (e.touches.length === 2) {
                    const currentDistance = getDistance(e.touches[0], e.touches[1]);
                    const scaleFactor = currentDistance / previousDistance;
                    scale *= scaleFactor;
                    previousDistance = currentDistance;

                    canvas.style.transform = "scale(1)";
                } else if (isDragging) {
                    e.preventDefault();
                    const clientX = e.touches[0].clientX;
                    const clientY = e.touches[0].clientY;
                    const x = clientX - startX;
                    const y = clientY - startY;
                    crosshair.style.left = limitLeft(x) + 'px';
                    crosshair.style.top = limitTop(y) + 'px';
                    updateColor();
                }
            }

            function handleCanvasTouchEnd(e) {
                isDragging = false;
                previousDistance = 0;
            }

            // 터치 이벤트
            canvas.addEventListener('touchstart', handleCanvasTouchStart);
            canvas.addEventListener('touchmove', handleCanvasTouchMove);
            canvas.addEventListener('touchend', handleCanvasTouchEnd);

            crosshair.addEventListener('touchstart', startDragging);
            crosshair.addEventListener('touchmove', drag);
            crosshair.addEventListener('touchend', stopDragging);

            function updateColor() {
                const rect = crosshair.getBoundingClientRect();
                const x = (rect.left + rect.width / 2 + (canvas.width - maxWidth) / 2);
                const y = (rect.top + rect.height / 2 + (canvas.height - maxHeight) / 2);
                const pixel = ctx.getImageData(x, y, 1, 1).data;
                const color = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
                betweenbg.style.borderColor = color;
                window.ReactNativeWebView.postMessage(color);
            }
            updateColor()
        }
    </script>
</body>
</html>
`;
return { getHtmlContent }
}
export default useImageWebview;